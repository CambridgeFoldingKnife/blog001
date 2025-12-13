---
title: Spring Boot整合RabbitMQ
---

# 03 - Spring Boot整合RabbitMQ

## 🎯 学习目标

- 掌握Spring Boot整合RabbitMQ
- 学会使用RabbitTemplate发送消息
- 理解@RabbitListener注解使用
- 掌握消息转换器配置
- 学会声明式配置队列和交换机

## 🚀 快速开始

### 1. 添加依赖

```xml
<dependencies>
    <!-- Spring Boot RabbitMQ -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>
    
    <!-- JSON序列化 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
    
    <!-- Lombok（可选） -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 2. 配置文件

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: admin
    password: admin123
    virtual-host: /
    
    # 发布确认
    publisher-confirm-type: correlated
    # 发布返回
    publisher-returns: true
    
    # 消费者配置
    listener:
      simple:
        # 手动ACK
        acknowledge-mode: manual
        # 每次处理消息数
        prefetch: 1
        # 重试机制
        retry:
          enabled: true
          max-attempts: 3
          initial-interval: 2000
```

### 3. 启用RabbitMQ

```java
@SpringBootApplication
@EnableRabbit
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## 📦 声明式配置

### 配置类

```java
@Configuration
public class RabbitConfig {
    
    // ========== Simple模式 ==========
    
    @Bean
    public Queue simpleQueue() {
        return new Queue("simple.queue", true); // durable=true持久化
    }
    
    // ========== Work模式 ==========
    
    @Bean
    public Queue workQueue() {
        return QueueBuilder
            .durable("work.queue")
            .build();
    }
    
    // ========== Fanout模式 ==========
    
    @Bean
    public FanoutExchange fanoutExchange() {
        return new FanoutExchange("fanout.exchange");
    }
    
    @Bean
    public Queue fanoutQueue1() {
        return new Queue("fanout.queue1");
    }
    
    @Bean
    public Queue fanoutQueue2() {
        return new Queue("fanout.queue2");
    }
    
    @Bean
    public Binding fanoutBinding1(Queue fanoutQueue1, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);
    }
    
    @Bean
    public Binding fanoutBinding2(Queue fanoutQueue2, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(fanoutQueue2).to(fanoutExchange);
    }
    
    // ========== Direct模式 ==========
    
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange("direct.exchange");
    }
    
    @Bean
    public Queue directQueue1() {
        return new Queue("direct.queue1");
    }
    
    @Bean
    public Queue directQueue2() {
        return new Queue("direct.queue2");
    }
    
    @Bean
    public Binding directBinding1(Queue directQueue1, DirectExchange directExchange) {
        return BindingBuilder.bind(directQueue1)
            .to(directExchange)
            .with("error");
    }
    
    @Bean
    public Binding directBinding2(Queue directQueue2, DirectExchange directExchange) {
        return BindingBuilder.bind(directQueue2)
            .to(directExchange)
            .with("info");
    }
    
    // ========== Topic模式 ==========
    
    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange("topic.exchange");
    }
    
    @Bean
    public Queue topicQueue1() {
        return new Queue("topic.queue1");
    }
    
    @Bean
    public Queue topicQueue2() {
        return new Queue("topic.queue2");
    }
    
    @Bean
    public Binding topicBinding1(Queue topicQueue1, TopicExchange topicExchange) {
        return BindingBuilder.bind(topicQueue1)
            .to(topicExchange)
            .with("user.#");
    }
    
    @Bean
    public Binding topicBinding2(Queue topicQueue2, TopicExchange topicExchange) {
        return BindingBuilder.bind(topicQueue2)
            .to(topicExchange)
            .with("*.order.*");
    }
    
    // ========== 死信队列 ==========
    
    @Bean
    public DirectExchange dlxExchange() {
        return new DirectExchange("dlx.exchange");
    }
    
    @Bean
    public Queue dlxQueue() {
        return new Queue("dlx.queue");
    }
    
    @Bean
    public Binding dlxBinding(Queue dlxQueue, DirectExchange dlxExchange) {
        return BindingBuilder.bind(dlxQueue)
            .to(dlxExchange)
            .with("dlx");
    }
    
    @Bean
    public Queue normalQueue() {
        return QueueBuilder
            .durable("normal.queue")
            .deadLetterExchange("dlx.exchange")
            .deadLetterRoutingKey("dlx")
            .ttl(10000) // 10秒
            .build();
    }
    
    // ========== 消息转换器 ==========
    
    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    
    // ========== RabbitTemplate配置 ==========
    
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        
        // 设置确认回调
        template.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                System.out.println("消息发送成功");
            } else {
                System.out.println("消息发送失败: " + cause);
            }
        });
        
        // 设置返回回调
        template.setReturnsCallback(returned -> {
            System.out.println("消息未路由到队列:");
            System.out.println("Exchange: " + returned.getExchange());
            System.out.println("RoutingKey: " + returned.getRoutingKey());
            System.out.println("Message: " + returned.getMessage());
        });
        
        return template;
    }
}
```

## 📤 发送消息

### 消息实体类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderMessage {
    private String orderId;
    private String userId;
    private Double amount;
    private LocalDateTime createTime;
}
```

### 消息生产者

```java
@Service
@Slf4j
public class MessageProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    // 1. Simple模式 - 发送字符串
    public void sendSimple(String message) {
        rabbitTemplate.convertAndSend("simple.queue", message);
        log.info("发送Simple消息: {}", message);
    }
    
    // 2. Fanout模式 - 广播消息
    public void sendFanout(String message) {
        rabbitTemplate.convertAndSend("fanout.exchange", "", message);
        log.info("发送Fanout消息: {}", message);
    }
    
    // 3. Direct模式 - 路由消息
    public void sendDirect(String routingKey, String message) {
        rabbitTemplate.convertAndSend("direct.exchange", routingKey, message);
        log.info("发送Direct消息: [{}] {}", routingKey, message);
    }
    
    // 4. Topic模式 - 主题消息
    public void sendTopic(String routingKey, String message) {
        rabbitTemplate.convertAndSend("topic.exchange", routingKey, message);
        log.info("发送Topic消息: [{}] {}", routingKey, message);
    }
    
    // 5. 发送对象消息
    public void sendObject(OrderMessage order) {
        rabbitTemplate.convertAndSend("order.queue", order);
        log.info("发送订单消息: {}", order);
    }
    
    // 6. 发送消息with属性
    public void sendWithProperties(String message) {
        MessageProperties properties = new MessageProperties();
        properties.setContentType("text/plain");
        properties.setHeader("custom-header", "custom-value");
        properties.setPriority(5);
        
        Message msg = new Message(message.getBytes(), properties);
        rabbitTemplate.send("simple.queue", msg);
        log.info("发送带属性消息: {}", message);
    }
    
    // 7. 发送延迟消息
    public void sendDelay(String message, long delayMillis) {
        rabbitTemplate.convertAndSend("delay.exchange", "delay", message, msg -> {
            msg.getMessageProperties().setHeader("x-delay", delayMillis);
            return msg;
        });
        log.info("发送延迟{}ms消息: {}", delayMillis, message);
    }
}
```

## 📥 接收消息

### 消息消费者

```java
@Component
@Slf4j
public class MessageConsumer {
    
    // 1. Simple模式消费
    @RabbitListener(queues = "simple.queue")
    public void receiveSimple(String message) {
        log.info("Simple消费者收到: {}", message);
    }
    
    // 2. Work模式消费（启动多个实例）
    @RabbitListener(queues = "work.queue")
    public void receiveWork1(String message) throws InterruptedException {
        log.info("Work消费者1收到: {}", message);
        Thread.sleep(1000);
    }
    
    @RabbitListener(queues = "work.queue")
    public void receiveWork2(String message) throws InterruptedException {
        log.info("Work消费者2收到: {}", message);
        Thread.sleep(2000);
    }
    
    // 3. Fanout模式消费
    @RabbitListener(queues = "fanout.queue1")
    public void receiveFanout1(String message) {
        log.info("Fanout消费者1收到: {}", message);
    }
    
    @RabbitListener(queues = "fanout.queue2")
    public void receiveFanout2(String message) {
        log.info("Fanout消费者2收到: {}", message);
    }
    
    // 4. Direct模式消费
    @RabbitListener(queues = "direct.queue1")
    public void receiveDirect1(String message) {
        log.info("Direct消费者1(error)收到: {}", message);
    }
    
    @RabbitListener(queues = "direct.queue2")
    public void receiveDirect2(String message) {
        log.info("Direct消费者2(info)收到: {}", message);
    }
    
    // 5. Topic模式消费
    @RabbitListener(queues = "topic.queue1")
    public void receiveTopic1(String message) {
        log.info("Topic消费者1(user.#)收到: {}", message);
    }
    
    @RabbitListener(queues = "topic.queue2")
    public void receiveTopic2(String message) {
        log.info("Topic消费者2(*.order.*)收到: {}", message);
    }
    
    // 6. 接收对象消息
    @RabbitListener(queues = "order.queue")
    public void receiveOrder(OrderMessage order) {
        log.info("订单消费者收到: {}", order);
    }
    
    // 7. 手动ACK
    @RabbitListener(queues = "ack.queue")
    public void receiveManualAck(Message message, Channel channel) throws IOException {
        try {
            String msg = new String(message.getBody());
            log.info("手动ACK消费者收到: {}", msg);
            
            // 业务处理
            processMessage(msg);
            
            // 手动确认
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
            log.info("消息处理成功");
            
        } catch (Exception e) {
            log.error("消息处理失败", e);
            // 拒绝并重新入队
            channel.basicNack(message.getMessageProperties().getDeliveryTag(), 
                            false, true);
        }
    }
    
    // 8. 获取消息详细信息
    @RabbitListener(queues = "info.queue")
    public void receiveWithInfo(
        Message message, 
        Channel channel,
        @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag,
        @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        
        String msg = new String(message.getBody());
        log.info("收到消息: {}", msg);
        log.info("DeliveryTag: {}", deliveryTag);
        log.info("RoutingKey: {}", routingKey);
    }
    
    private void processMessage(String message) {
        // 业务处理逻辑
    }
}
```

### 声明式队列绑定

```java
@Component
public class AnnotationConsumer {
    
    // 使用注解声明队列和绑定
    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "anno.queue", durable = "true"),
        exchange = @Exchange(name = "anno.exchange", type = "direct"),
        key = "anno.key"
    ))
    public void receive(String message) {
        System.out.println("注解消费者收到: " + message);
    }
    
    // Topic模式
    @RabbitListener(bindings = @QueueBinding(
        value = @Queue("user.queue"),
        exchange = @Exchange(name = "user.exchange", type = "topic"),
        key = "user.*.create"
    ))
    public void receiveUserCreate(String message) {
        System.out.println("用户创建消息: " + message);
    }
}
```

## 🧪 单元测试

```java
@SpringBootTest
class RabbitMQTest {
    
    @Autowired
    private MessageProducer producer;
    
    @Test
    void testSimple() throws InterruptedException {
        producer.sendSimple("Hello RabbitMQ!");
        Thread.sleep(1000);
    }
    
    @Test
    void testFanout() throws InterruptedException {
        producer.sendFanout("广播消息");
        Thread.sleep(1000);
    }
    
    @Test
    void testDirect() throws InterruptedException {
        producer.sendDirect("error", "错误日志");
        producer.sendDirect("info", "信息日志");
        Thread.sleep(1000);
    }
    
    @Test
    void testTopic() throws InterruptedException {
        producer.sendTopic("user.order.create", "用户创建订单");
        producer.sendTopic("user.login", "用户登录");
        Thread.sleep(1000);
    }
    
    @Test
    void testObject() throws InterruptedException {
        OrderMessage order = new OrderMessage(
            "ORDER123", 
            "USER001", 
            99.99, 
            LocalDateTime.now()
        );
        producer.sendObject(order);
        Thread.sleep(1000);
    }
}
```

## 🎯 实战Controller

```java
@RestController
@RequestMapping("/api/message")
@Slf4j
public class MessageController {
    
    @Autowired
    private MessageProducer producer;
    
    @PostMapping("/simple")
    public String sendSimple(@RequestParam String message) {
        producer.sendSimple(message);
        return "Simple消息发送成功";
    }
    
    @PostMapping("/fanout")
    public String sendFanout(@RequestParam String message) {
        producer.sendFanout(message);
        return "Fanout消息发送成功";
    }
    
    @PostMapping("/direct")
    public String sendDirect(
        @RequestParam String routingKey, 
        @RequestParam String message) {
        producer.sendDirect(routingKey, message);
        return "Direct消息发送成功";
    }
    
    @PostMapping("/topic")
    public String sendTopic(
        @RequestParam String routingKey, 
        @RequestParam String message) {
        producer.sendTopic(routingKey, message);
        return "Topic消息发送成功";
    }
    
    @PostMapping("/order")
    public String createOrder(@RequestBody OrderMessage order) {
        producer.sendObject(order);
        return "订单消息发送成功";
    }
}
```

## 💡 最佳实践

1. **使用连接池** - 提高性能
2. **配置消息转换器** - 自动序列化对象
3. **开启确认机制** - 保证消息可靠性
4. **使用手动ACK** - 业务处理后确认
5. **合理设置prefetch** - 控制消费速度
6. **异常处理** - 捕获并记录异常
7. **监控告警** - 监控队列积压情况

## 🎯 小结

本节学习了Spring Boot整合RabbitMQ：
- ✅ 快速整合配置
- ✅ 声明式队列和交换机
- ✅ RabbitTemplate发送消息
- ✅ @RabbitListener接收消息
- ✅ 消息转换器配置
- ✅ 手动ACK机制

---

**下一节：** [04-RabbitMQ实战案例](04-RabbitMQ实战案例.md)
