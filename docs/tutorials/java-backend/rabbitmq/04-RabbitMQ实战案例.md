---
title: RabbitMQ实战案例
---

# 04 - RabbitMQ实战案例

## 🎯 学习目标

- 掌握订单延时取消实现
- 学会秒杀系统削峰方案
- 了解日志收集系统设计
- 理解分布式事务解决方案

## 📦 案例一：订单延时取消

### 业务场景

用户下单后30分钟内未支付，自动取消订单并恢复库存。

###实现方案

**方式1：TTL + 死信队列**

```java
@Configuration
public class OrderDelayConfig {
    
    // 正常交换机
    @Bean
    public DirectExchange orderExchange() {
        return new DirectExchange("order.exchange");
    }
    
    // 延迟队列（30分钟TTL）
    @Bean
    public Queue orderDelayQueue() {
        return QueueBuilder
            .durable("order.delay.queue")
            .deadLetterExchange("order.exchange")
            .deadLetterRoutingKey("order.cancel")
            .ttl(1800000) // 30分钟
            .build();
    }
    
    // 处理队列
    @Bean
    public Queue orderCancelQueue() {
        return new Queue("order.cancel.queue");
    }
    
    @Bean
    public Binding orderCancelBinding() {
        return BindingBuilder
            .bind(orderCancelQueue())
            .to(orderExchange())
            .with("order.cancel");
    }
}

// 订单服务
@Service
@Slf4j
public class OrderService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Autowired
    private OrderMapper orderMapper;
    
    // 创建订单
    @Transactional
    public Order createOrder(OrderDTO dto) {
        // 1. 创建订单
        Order order = new Order();
        order.setOrderId(UUID.randomUUID().toString());
        order.setUserId(dto.getUserId());
        order.setAmount(dto.getAmount());
        order.setStatus("UNPAID");
        order.setCreateTime(LocalDateTime.now());
        orderMapper.insert(order);
        
        // 2. 扣减库存
        stockService.deduct(dto.getProductId(), dto.getQuantity());
        
        // 3. 发送延时消息
        rabbitTemplate.convertAndSend(
            "order.delay.queue", 
            order.getOrderId()
        );
        log.info("订单创建成功，30分钟后自动取消: {}", order.getOrderId());
        
        return order;
    }
}

// 消费者
@Component
@Slf4j
public class OrderCancelConsumer {
    
    @Autowired
    private OrderMapper orderMapper;
    
    @Autowired
    private StockService stockService;
    
    @RabbitListener(queues = "order.cancel.queue")
    public void handleOrderCancel(String orderId, Channel channel, Message message) {
        try {
            // 1. 查询订单状态
            Order order = orderMapper.selectById(orderId);
            
            if (order == null) {
                log.warn("订单不存在: {}", orderId);
                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
                return;
            }
            
            // 2. 如果仍未支付，取消订单
            if ("UNPAID".equals(order.getStatus())) {
                order.setStatus("CANCELLED");
                order.setUpdateTime(LocalDateTime.now());
                orderMapper.updateById(order);
                
                // 3. 恢复库存
                stockService.restore(order.getProductId(), order.getQuantity());
                
                log.info("订单超时自动取消: {}", orderId);
            } else {
                log.info("订单已支付，无需取消: {}", orderId);
            }
            
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
            
        } catch (Exception e) {
            log.error("订单取消失败: {}", orderId, e);
            try {
                channel.basicNack(message.getMessageProperties().getDeliveryTag(), 
                                 false, true);
            } catch (IOException ex) {
                log.error("消息拒绝失败", ex);
            }
        }
    }
}
```

## ⚡ 案例二：秒杀系统削峰

### 业务场景

秒杀活动瞬间大量请求，保护数据库，防止系统崩溃。

### 实现方案

```java
// 秒杀配置
@Configuration
public class SeckillConfig {
    
    @Bean
    public Queue seckillQueue() {
        return QueueBuilder
            .durable("seckill.queue")
            .maxLength(10000) // 队列最大长度
            .build();
    }
}

// 秒杀Controller
@RestController
@RequestMapping("/api/seckill")
@Slf4j
public class SeckillController {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    @PostMapping("/order")
    public Result seckill(@RequestParam Long productId, @RequestParam Long userId) {
        // 1. 检查是否重复下单
        String key = "seckill:" + productId + ":" + userId;
        Boolean flag = redisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.MINUTES);
        if (Boolean.FALSE.equals(flag)) {
            return Result.fail("请勿重复下单");
        }
        
        // 2. 检查库存（Redis预减）
        Long stock = redisTemplate.opsForValue().decrement("stock:" + productId);
        if (stock == null || stock < 0) {
            redisTemplate.opsForValue().increment("stock:" + productId);
            return Result.fail("库存不足");
        }
        
        // 3. 发送消息到队列
        SeckillMessage message = new SeckillMessage(productId, userId);
        rabbitTemplate.convertAndSend("seckill.queue", message);
        
        log.info("秒杀请求已提交: product={}, user={}", productId, userId);
        return Result.success("秒杀请求已提交，请稍后查看结果");
    }
}

// 秒杀消费者
@Component
@Slf4j
public class SeckillConsumer {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private StockService stockService;
    
    @RabbitListener(queues = "seckill.queue", concurrency = "5-10")
    public void handleSeckill(SeckillMessage message, Channel channel, Message msg) {
        try {
            log.info("处理秒杀订单: {}", message);
            
            // 1. 扣减数据库库存
            boolean success = stockService.deductStock(message.getProductId(), 1);
            if (!success) {
                log.warn("库存不足: {}", message.getProductId());
                channel.basicAck(msg.getMessageProperties().getDeliveryTag(), false);
                return;
            }
            
            // 2. 创建订单
            Order order = orderService.createSeckillOrder(message);
            
            // 3. 发送通知
            notifyUser(message.getUserId(), order);
            
            channel.basicAck(msg.getMessageProperties().getDeliveryTag(), false);
            log.info("秒杀订单创建成功: {}", order.getOrderId());
            
        } catch (Exception e) {
            log.error("秒杀订单处理失败", e);
            try {
                channel.basicNack(msg.getMessageProperties().getDeliveryTag(), 
                                 false, false);
            } catch (IOException ex) {
                log.error("消息拒绝失败", ex);
            }
        }
    }
}
```

## 📊 案例三：日志收集系统

### 业务场景

收集分布式系统的日志，统一存储和分析。

### 实现方案

```java
// 日志配置
@Configuration
public class LogConfig {
    
    @Bean
    public TopicExchange logExchange() {
        return new TopicExchange("log.exchange");
    }
    
    @Bean
    public Queue errorLogQueue() {
        return new Queue("log.error.queue");
    }
    
    @Bean
    public Queue allLogQueue() {
        return new Queue("log.all.queue");
    }
    
    @Bean
    public Binding errorLogBinding() {
        return BindingBuilder
            .bind(errorLogQueue())
            .to(logExchange())
            .with("*.error");
    }
    
    @Bean
    public Binding allLogBinding() {
        return BindingBuilder
            .bind(allLogQueue())
            .to(logExchange())
            .with("#");
    }
}

// 日志发送器
@Component
@Slf4j
public class LogSender {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendLog(String level, String service, String message) {
        LogMessage logMsg = new LogMessage();
        logMsg.setLevel(level);
        logMsg.setService(service);
        logMsg.setMessage(message);
        logMsg.setTimestamp(LocalDateTime.now());
        
        String routingKey = service + "." + level;
        rabbitTemplate.convertAndSend("log.exchange", routingKey, logMsg);
    }
}

// 日志消费者（存储到Elasticsearch）
@Component
@Slf4j
public class LogConsumer {
    
    @Autowired
    private ElasticsearchTemplate esTemplate;
    
    @RabbitListener(queues = "log.all.queue")
    public void handleAllLog(LogMessage logMsg) {
        // 存储到ES
        esTemplate.save(logMsg);
        log.debug("日志已存储: {}", logMsg);
    }
    
    @RabbitListener(queues = "log.error.queue")
    public void handleErrorLog(LogMessage logMsg) {
        // 错误日志告警
        sendAlert(logMsg);
        log.error("错误日志告警: {}", logMsg);
    }
    
    private void sendAlert(LogMessage logMsg) {
        // 发送钉钉/邮件告警
    }
}
```

## 🔄 案例四：分布式事务（最终一致性）

### 业务场景

订单支付成功后，需要更新订单状态、扣减积分、发送通知。

### 实现方案：可靠消息最终一致性

```java
// 订单支付
@Service
@Slf4j
public class PaymentService {
    
    @Autowired
    private OrderMapper orderMapper;
    
    @Autowired
    private MessageMapper messageMapper;
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Transactional
    public void pay(String orderId) {
        // 1. 更新订单状态
        Order order = orderMapper.selectById(orderId);
        order.setStatus("PAID");
        order.setPayTime(LocalDateTime.now());
        orderMapper.updateById(order);
        
        // 2. 记录消息表（与订单在同一事务）
        TransactionMessage msg = new TransactionMessage();
        msg.setMessageId(UUID.randomUUID().toString());
        msg.setContent(JSON.toJSONString(order));
        msg.setStatus("SENDING");
        msg.setCreateTime(LocalDateTime.now());
        messageMapper.insert(msg);
        
        // 3. 发送消息
        rabbitTemplate.convertAndSend(
            "order.exchange", 
            "order.paid", 
            order,
            message -> {
                message.getMessageProperties().setMessageId(msg.getMessageId());
                return message;
            }
        );
        
        // 4. 更新消息状态
        msg.setStatus("SENT");
        messageMapper.updateById(msg);
        
        log.info("订单支付成功，消息已发送: {}", orderId);
    }
}

// 积分服务消费者
@Component
@Slf4j
public class PointsConsumer {
    
    @Autowired
    private PointsService pointsService;
    
    @RabbitListener(queues = "points.queue")
    public void handleOrderPaid(Order order, Channel channel, Message message) {
        try {
            // 幂等性检查
            String messageId = message.getMessageProperties().getMessageId();
            if (isProcessed(messageId)) {
                log.info("消息已处理，跳过: {}", messageId);
                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
                return;
            }
            
            // 增加积分
            pointsService.addPoints(order.getUserId(), 
                                   order.getAmount().intValue());
            
            // 记录已处理
            markProcessed(messageId);
            
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
            log.info("积分增加成功: userId={}, points={}", 
                    order.getUserId(), order.getAmount().intValue());
            
        } catch (Exception e) {
            log.error("积分增加失败", e);
            try {
                channel.basicNack(message.getMessageProperties().getDeliveryTag(), 
                                 false, true);
            } catch (IOException ex) {
                log.error("消息拒绝失败", ex);
            }
        }
    }
}

// 定时任务：重发失败的消息
@Component
@Slf4j
public class MessageRetryTask {
    
    @Autowired
    private MessageMapper messageMapper;
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Scheduled(fixedDelay = 60000) // 每分钟执行一次
    public void retryFailedMessages() {
        List<TransactionMessage> failedMessages = messageMapper.selectFailed();
        
        for (TransactionMessage msg : failedMessages) {
            try {
                rabbitTemplate.convertAndSend("order.exchange", "order.paid", 
                                             msg.getContent());
                msg.setStatus("SENT");
                messageMapper.updateById(msg);
                log.info("消息重发成功: {}", msg.getMessageId());
            } catch (Exception e) {
                log.error("消息重发失败: {}", msg.getMessageId(), e);
            }
        }
    }
}
```

## 💡 最佳实践总结

1. **延时任务** - TTL + 死信队列或延迟插件
2. **流量削峰** - Redis预减库存 + 队列缓冲
3. **日志收集** - Topic交换机分类处理
4. **分布式事务** - 可靠消息 + 幂等性 + 定时补偿
5. **消息幂等** - 使用唯一ID去重
6. **异常处理** - 重试机制 + 死信队列

## 🎯 小结

本节学习了RabbitMQ的实战应用：
- ✅ 订单延时取消
- ✅ 秒杀系统削峰
- ✅ 日志收集系统
- ✅ 分布式事务方案

---

**下一节：** [05-RabbitMQ集群与监控](05-RabbitMQ集群与监控.md)
