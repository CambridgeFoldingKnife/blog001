---
title: RabbitMQ面试题
---

# 06 - RabbitMQ面试题

## 🎯 基础知识

### 1. 什么是RabbitMQ？有什么特点？

**答案：**
RabbitMQ是基于AMQP协议的开源消息队列中间件，使用Erlang语言开发。

**特点：**
- 可靠性：持久化、确认机制、镜像队列
- 灵活路由：多种交换机类型
- 高可用：集群、镜像队列
- 多语言支持：Java、Python、Go等
- 管理界面：Web控制台
- 插件系统：丰富的插件生态

### 2. RabbitMQ的核心概念有哪些？

**答案：**

| 概念 | 说明 |
|------|------|
| Producer | 消息生产者 |
| Consumer | 消息消费者 |
| Exchange | 交换机，负责路由消息 |
| Queue | 队列，存储消息 |
| Binding | 绑定，Exchange和Queue的关系 |
| Routing Key | 路由键 |
| Virtual Host | 虚拟主机，隔离 |
| Connection | TCP连接 |
| Channel | 信道，复用连接 |

### 3. RabbitMQ的交换机类型有哪些？

**答案：**

**1. Direct（直连）**
- 精确匹配routing key
- 适用场景：错误日志路由

**2. Fanout（广播）**
- 发送到所有绑定的队列
- 适用场景：群发通知

**3. Topic（主题）**
- 模式匹配（`*`匹配一个单词，`#`匹配多个）
- 适用场景：复杂路由规则

**4. Headers（头部）**
- 根据消息头属性匹配
- 使用较少

### 4. 如何保证消息不丢失？

**答案：三个阶段保证**

**1. 生产者到Exchange**
```java
// 开启发送方确认
channel.confirmSelect();
channel.addConfirmListener(...);
```

**2. Exchange到Queue**
```java
// 消息持久化
channel.queueDeclare(queue, true, false, false, null);
channel.basicPublish("", queue, 
    MessageProperties.PERSISTENT_TEXT_PLAIN, 
    message.getBytes());
```

**3. Queue到Consumer**
```java
// 手动ACK
channel.basicConsume(queue, false, deliverCallback, cancelCallback);
channel.basicAck(deliveryTag, false);
```

### 5. 如何保证消息不被重复消费？

**答案：实现幂等性**

**方式1：使用唯一ID**
```java
@RabbitListener(queues = "order.queue")
public void consume(Message message) {
    String messageId = message.getMessageProperties().getMessageId();
    
    // Redis去重
    if (redisTemplate.opsForValue().setIfAbsent(messageId, "1", 1, TimeUnit.DAYS)) {
        // 处理消息
        processMessage(message);
    }
}
```

**方式2：数据库唯一索引**
```sql
CREATE UNIQUE INDEX idx_order_id ON orders(order_id);
```

### 6. 什么是死信队列？有什么用？

**答案：**

**死信（Dead Letter）产生原因：**
- 消息被拒绝（basic.reject/basic.nack）且requeue=false
- 消息TTL过期
- 队列达到最大长度

**用途：**
- 异常消息处理
- 延迟队列实现
- 消息重试

**配置示例：**
```java
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx.exchange");
args.put("x-dead-letter-routing-key", "dlx");
args.put("x-message-ttl", 10000);

channel.queueDeclare("normal.queue", true, false, false, args);
```

## 🔥 进阶问题

### 7. RabbitMQ如何实现延迟队列？

**答案：两种方式**

**方式1：TTL + 死信队列**
```java
// 延迟队列（无消费者）
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "order.exchange");
args.put("x-dead-letter-routing-key", "order.cancel");
args.put("x-message-ttl", 1800000); // 30分钟

channel.queueDeclare("delay.queue", true, false, false, args);
```

**方式2：延迟插件（推荐）**
```bash
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

```java
Map<String, Object> args = new HashMap<>();
args.put("x-delayed-type", "direct");
channel.exchangeDeclare("delayed.exchange", "x-delayed-message", true, false, args);

// 发送时设置延迟时间
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .headers(Collections.singletonMap("x-delay", 30000))
    .build();
```

### 8. RabbitMQ集群模式有哪些？

**答案：**

**1. 普通集群**
- 队列只在一个节点存储
- 其他节点只有元数据
- 消费时从存储节点拉取

**2. 镜像队列**
- 队列在所有节点同步
- 高可用，节点故障不影响
- 性能有所下降

**3. 仲裁队列（Quorum Queue）**
- 基于Raft协议
- 更高的数据一致性
- RabbitMQ 3.8+

### 9. 如何处理消息堆积？

**答案：**

**原因分析：**
- 生产速度 > 消费速度
- 消费者处理慢
- 消费者宕机

**解决方案：**

**1. 增加消费者**
```java
@RabbitListener(
    queues = "order.queue",
    concurrency = "5-10"  // 5-10个消费者
)
```

**2. 提高消费速度**
- 优化业务逻辑
- 批量处理
- 异步处理

**3. 限流**
```java
channel.basicQos(100); // 预取100条
```

**4. 临时扩容**
- 启动多个消费者实例
- 处理完毕后下线

### 10. RabbitMQ如何保证顺序消费？

**答案：**

**方式1：单队列 + 单消费者**
```java
@RabbitListener(
    queues = "order.queue",
    concurrency = "1"  // 只有1个消费者
)
```

**方式2：分区**
```java
// 相同订单ID发到同一队列
int queueIndex = orderId.hashCode() % queueCount;
String queueName = "order.queue." + queueIndex;
```

**注意：** 保证顺序会降低并发性能

### 11. RabbitMQ和Kafka的区别？

**答案：**

| 特性 | RabbitMQ | Kafka |
|------|----------|-------|
| 定位 | 消息队列 | 流处理平台 |
| 吞吐量 | 万级 | 百万级 |
| 消息延迟 | 微秒级 | 毫秒级 |
| 消息可靠性 | 高 | 一般 |
| 消息顺序 | 一般 | 高 |
| 路由功能 | 丰富 | 简单 |
| 适用场景 | 企业应用、RPC | 大数据、日志 |

**选择建议：**
- 高吞吐量、日志收集 → Kafka
- 复杂路由、可靠性高 → RabbitMQ

## 💼 实战问题

### 12. 秒杀系统如何使用RabbitMQ削峰？

**答案：**

**流程：**
```
用户请求 → Redis预减库存 → MQ队列 → 异步处理订单
```

**实现：**
```java
// Controller
@PostMapping("/seckill")
public Result seckill(Long productId, Long userId) {
    // 1. Redis预减库存
    Long stock = redisTemplate.opsForValue().decrement("stock:" + productId);
    if (stock < 0) {
        return Result.fail("库存不足");
    }
    
    // 2. 发送MQ
    rabbitTemplate.convertAndSend("seckill.queue", 
        new SeckillMessage(productId, userId));
    
    return Result.success("请求已提交");
}

// Consumer
@RabbitListener(queues = "seckill.queue", concurrency = "5-10")
public void handleSeckill(SeckillMessage msg) {
    // 扣减数据库库存
    // 创建订单
}
```

### 13. 如何实现分布式事务？

**答案：可靠消息最终一致性**

**步骤：**
1. 执行本地事务
2. 记录消息表（同一事务）
3. 发送MQ消息
4. 消费者处理（幂等性）
5. 定时任务补偿失败消息

```java
@Transactional
public void pay(String orderId) {
    // 1. 更新订单状态
    orderMapper.updateStatus(orderId, "PAID");
    
    // 2. 记录消息表
    TransactionMessage msg = new TransactionMessage();
    msg.setOrderId(orderId);
    msg.setStatus("SENDING");
    messageMapper.insert(msg);
    
    // 3. 发送MQ
    rabbitTemplate.convertAndSend("order.paid", orderId);
    
    // 4. 更新消息状态
    msg.setStatus("SENT");
    messageMapper.updateById(msg);
}
```

### 14. 如何监控RabbitMQ？

**答案：**

**1. 管理界面**
- 队列消息数
- 消费速度
- 内存使用

**2. HTTP API**
```java
GET http://localhost:15672/api/queues
```

**3. Prometheus + Grafana**
```bash
rabbitmq-plugins enable rabbitmq_prometheus
```

**4. 告警指标**
- 队列积压 > 10000
- 消费速度 < 阈值
- 内存使用 > 80%

### 15. RabbitMQ性能优化建议？

**答案：**

**1. 生产者**
- 批量发送
- 开启发送确认
- 使用连接池

**2. 消费者**
- 合理设置prefetch
- 批量ACK
- 增加并发数

**3. 队列**
- 使用惰性队列（大量消息）
- 设置TTL
- 限制队列长度

**4. 集群**
- 镜像队列
- 负载均衡
- 分片存储

**5. 配置优化**
```yaml
spring:
  rabbitmq:
    cache:
      channel:
        size: 50
    listener:
      simple:
        prefetch: 100
        concurrency: 5-10
```

## 🎯 高频场景题

### 16. 如何实现订单30分钟自动取消？

**答案：** 见[实战案例-订单延时取消](04-RabbitMQ实战案例.md#案例一订单延时取消)

### 17. 如何保证消费者接收到消息后一定处理成功？

**答案：**

**1. 手动ACK**
```java
channel.basicConsume(queue, false, deliverCallback, cancelCallback);
```

**2. 异常时拒绝消息**
```java
try {
    processMessage(message);
    channel.basicAck(deliveryTag, false);
} catch (Exception e) {
    channel.basicNack(deliveryTag, false, true); // 重新入队
}
```

**3. 重试机制**
```yaml
spring:
  rabbitmq:
    listener:
      simple:
        retry:
          enabled: true
          max-attempts: 3
          initial-interval: 2000
```

**4. 死信队列兜底**

### 18. 消息发送失败怎么办？

**答案：**

**1. 发送方确认**
```java
rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
    if (!ack) {
        // 重新发送或记录日志
        log.error("消息发送失败: {}", cause);
    }
});
```

**2. 持久化到数据库**
```java
// 发送前记录
messageMapper.insert(message);

// 发送后更新状态
message.setStatus("SENT");
messageMapper.updateById(message);
```

**3. 定时补偿**
```java
@Scheduled(fixedDelay = 60000)
public void retryFailedMessages() {
    List<Message> failedMessages = messageMapper.selectFailed();
    for (Message msg : failedMessages) {
        rabbitTemplate.convertAndSend(msg);
    }
}
```

## 💡 总结

**掌握要点：**
- ✅ 消息可靠性保证（确认机制、持久化、ACK）
- ✅ 消息幂等性（唯一ID、数据库索引）
- ✅ 死信队列和延迟队列
- ✅ 集群和高可用
- ✅ 性能优化策略
- ✅ 实战应用场景

---

**RabbitMQ教程完结！** 🎉

继续学习其他技术栈 → [返回MQ目录](../README.md)
