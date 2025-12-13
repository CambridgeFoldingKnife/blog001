---
title: RabbitMQ进阶特性
---

# 02 - RabbitMQ进阶特性

## 🎯 学习目标

- 掌握消息可靠性保证机制
- 理解消息持久化原理
- 学会使用消费者ACK机制
- 掌握死信队列和延迟队列
- 了解优先级队列和惰性队列

## 🔒 消息可靠性保证

### 三个阶段的可靠性

```
生产者 → [确认机制] → RabbitMQ → [持久化] → 队列 → [ACK机制] → 消费者
```

## 1️⃣ 生产者确认机制

### Publisher Confirms

**作用：** 确保消息成功到达Exchange

#### 开启确认模式

```java
public class ProducerConfirm {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 开启发送方确认模式
            channel.confirmSelect();
            
            String message = "Hello RabbitMQ!";
            channel.basicPublish("", "queue_name", null, message.getBytes());
            
            // 等待确认（同步）
            boolean confirmed = channel.waitForConfirms();
            if (confirmed) {
                System.out.println("消息发送成功");
            } else {
                System.out.println("消息发送失败");
            }
        }
    }
}
```

#### 异步确认（推荐）

```java
public class AsyncProducerConfirm {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            channel.confirmSelect();
            
            // 添加确认监听器
            channel.addConfirmListener(new ConfirmListener() {
                @Override
                public void handleAck(long deliveryTag, boolean multiple) {
                    System.out.println("消息确认成功: " + deliveryTag);
                }
                
                @Override
                public void handleNack(long deliveryTag, boolean multiple) {
                    System.out.println("消息确认失败: " + deliveryTag);
                    // 重新发送或记录日志
                }
            });
            
            // 发送100条消息
            for (int i = 1; i <= 100; i++) {
                String message = "Message " + i;
                channel.basicPublish("", "queue_name", null, message.getBytes());
            }
            
            // 等待所有消息确认
            channel.waitForConfirmsOrDie(5000);
        }
    }
}
```

### Publisher Returns

**作用：** 消息无法路由到Queue时回退

```java
public class ProducerReturn {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 添加返回监听器
            channel.addReturnListener((replyCode, replyText, exchange, 
                                      routingKey, properties, body) -> {
                System.out.println("消息未路由到队列:");
                System.out.println("Exchange: " + exchange);
                System.out.println("RoutingKey: " + routingKey);
                System.out.println("Message: " + new String(body));
                // 记录日志或重新发送
            });
            
            // 发送消息，mandatory=true表示无法路由时返回
            channel.basicPublish("exchange_name", "wrong_routing_key", 
                               true, null, "Hello".getBytes());
        }
    }
}
```

## 2️⃣ 消息持久化

### Exchange持久化

```java
// 第二个参数durable=true表示持久化
channel.exchangeDeclare("my_exchange", "direct", true);
```

### Queue持久化

```java
// 第二个参数durable=true表示持久化
channel.queueDeclare("my_queue", true, false, false, null);
```

### Message持久化

```java
import com.rabbitmq.client.MessageProperties;

// 方式1：使用预定义属性
channel.basicPublish("", "my_queue", 
                    MessageProperties.PERSISTENT_TEXT_PLAIN, 
                    message.getBytes());

// 方式2：自定义属性
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .deliveryMode(2) // 2表示持久化
    .contentType("text/plain")
    .build();
    
channel.basicPublish("", "my_queue", props, message.getBytes());
```

## 3️⃣ 消费者ACK机制

### 自动ACK vs 手动ACK

| 特性 | 自动ACK | 手动ACK |
|------|---------|---------|
| 可靠性 | 低 | 高 |
| 性能 | 高 | 中 |
| 使用难度 | 简单 | 中等 |
| 适用场景 | 允许消息丢失 | 不允许消息丢失 |

### 手动ACK示例

```java
public class ManualAckConsumer {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.queueDeclare("task_queue", true, false, false, null);
        
        // 设置每次只接收1条消息
        channel.basicQos(1);
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            
            try {
                System.out.println("处理消息: " + message);
                // 模拟业务处理
                doWork(message);
                
                // 手动确认（第二个参数false表示只确认当前消息）
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
                System.out.println("消息处理成功");
                
            } catch (Exception e) {
                e.printStackTrace();
                
                // 拒绝消息，并重新入队
                // 第二个参数false表示不批量拒绝，第三个参数true表示重新入队
                channel.basicNack(delivery.getEnvelope().getDeliveryTag(), 
                                 false, true);
                System.out.println("消息处理失败，重新入队");
            }
        };
        
        // 第二个参数false表示手动ACK
        channel.basicConsume("task_queue", false, deliverCallback, 
                            consumerTag -> {});
    }
    
    private static void doWork(String message) throws InterruptedException {
        Thread.sleep(1000);
    }
}
```

### ACK相关方法

```java
// 1. 确认消息
channel.basicAck(deliveryTag, multiple);

// 2. 拒绝单条消息
channel.basicReject(deliveryTag, requeue);

// 3. 拒绝多条消息
channel.basicNack(deliveryTag, multiple, requeue);
```

## 4️⃣ 死信队列（DLX）

### 什么是死信？

消息变成死信的情况：
- ❌ 消息被拒绝（basic.reject/basic.nack）且requeue=false
- ⏰ 消息TTL过期
- 📊 队列达到最大长度

### 死信队列配置

```java
public class DLXExample {
    private static final String NORMAL_EXCHANGE = "normal_exchange";
    private static final String NORMAL_QUEUE = "normal_queue";
    private static final String DLX_EXCHANGE = "dlx_exchange";
    private static final String DLX_QUEUE = "dlx_queue";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 1. 声明死信交换机和队列
            channel.exchangeDeclare(DLX_EXCHANGE, "direct");
            channel.queueDeclare(DLX_QUEUE, true, false, false, null);
            channel.queueBind(DLX_QUEUE, DLX_EXCHANGE, "dlx_routing_key");
            
            // 2. 声明正常交换机
            channel.exchangeDeclare(NORMAL_EXCHANGE, "direct");
            
            // 3. 声明正常队列，并配置死信交换机
            Map<String, Object> args = new HashMap<>();
            args.put("x-dead-letter-exchange", DLX_EXCHANGE);
            args.put("x-dead-letter-routing-key", "dlx_routing_key");
            args.put("x-message-ttl", 10000); // 消息TTL 10秒
            
            channel.queueDeclare(NORMAL_QUEUE, true, false, false, args);
            channel.queueBind(NORMAL_QUEUE, NORMAL_EXCHANGE, "normal_routing_key");
            
            // 4. 发送消息
            String message = "这是一条测试消息";
            channel.basicPublish(NORMAL_EXCHANGE, "normal_routing_key", 
                               null, message.getBytes());
            System.out.println("消息已发送，10秒后进入死信队列");
        }
    }
}
```

### 死信队列消费者

```java
public class DLXConsumer {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.queueDeclare("dlx_queue", true, false, false, null);
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("死信队列收到消息: " + message);
            
            // 处理死信消息（记录日志、告警等）
            handleDeadLetter(message);
            
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
        };
        
        channel.basicConsume("dlx_queue", false, deliverCallback, 
                            consumerTag -> {});
    }
    
    private static void handleDeadLetter(String message) {
        // 记录日志、发送告警、人工处理等
        System.out.println("处理死信: " + message);
    }
}
```

## 5️⃣ 延迟队列

### 实现方式

**方式1：TTL + 死信队列**

```java
public class DelayQueueExample {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 1. 声明延迟交换机和队列（没有消费者）
            Map<String, Object> args = new HashMap<>();
            args.put("x-dead-letter-exchange", "order_exchange");
            args.put("x-dead-letter-routing-key", "order_timeout");
            args.put("x-message-ttl", 1800000); // 30分钟
            
            channel.exchangeDeclare("delay_exchange", "direct");
            channel.queueDeclare("delay_queue", true, false, false, args);
            channel.queueBind("delay_queue", "delay_exchange", "delay");
            
            // 2. 声明处理交换机和队列
            channel.exchangeDeclare("order_exchange", "direct");
            channel.queueDeclare("order_timeout_queue", true, false, false, null);
            channel.queueBind("order_timeout_queue", "order_exchange", "order_timeout");
            
            // 3. 发送延迟消息（订单超时取消）
            String orderId = "ORDER_12345";
            channel.basicPublish("delay_exchange", "delay", null, orderId.getBytes());
            System.out.println("订单创建，30分钟后自动取消: " + orderId);
        }
    }
}
```

**方式2：延迟插件（推荐）**

```bash
# 安装延迟插件
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

```java
public class DelayPluginExample {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 1. 声明延迟交换机
            Map<String, Object> args = new HashMap<>();
            args.put("x-delayed-type", "direct");
            
            channel.exchangeDeclare("delayed_exchange", "x-delayed-message", 
                                   true, false, args);
            
            // 2. 声明队列并绑定
            channel.queueDeclare("delayed_queue", true, false, false, null);
            channel.queueBind("delayed_queue", "delayed_exchange", "delayed");
            
            // 3. 发送延迟消息
            AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
                .headers(Collections.singletonMap("x-delay", 30000)) // 延迟30秒
                .build();
            
            String message = "这是一条延迟30秒的消息";
            channel.basicPublish("delayed_exchange", "delayed", props, 
                               message.getBytes());
            System.out.println("延迟消息已发送");
        }
    }
}
```

## 6️⃣ 优先级队列

### 配置优先级队列

```java
public class PriorityQueueExample {
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 声明优先级队列（最大优先级为10）
            Map<String, Object> args = new HashMap<>();
            args.put("x-max-priority", 10);
            
            channel.queueDeclare("priority_queue", true, false, false, args);
            
            // 发送不同优先级的消息
            for (int i = 1; i <= 10; i++) {
                AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
                    .priority(i)
                    .build();
                
                String message = "优先级 " + i + " 的消息";
                channel.basicPublish("", "priority_queue", props, message.getBytes());
            }
            
            System.out.println("优先级消息发送完成");
        }
    }
}
```

### 优先级队列消费者

```java
// 消费时会按优先级从高到低消费
// 输出：优先级 10 的消息 → 优先级 9 的消息 → ... → 优先级 1 的消息
```

## 7️⃣ 惰性队列

### 什么是惰性队列？

消息直接存入磁盘，减少内存占用，适合消息量大的场景。

### 配置惰性队列

```java
Map<String, Object> args = new HashMap<>();
args.put("x-queue-mode", "lazy");

channel.queueDeclare("lazy_queue", true, false, false, args);
```

## 💡 最佳实践

1. **生产环境必须开启确认机制** - 保证消息可靠性
2. **重要消息使用持久化** - 防止服务器重启丢失
3. **使用手动ACK** - 业务处理成功后再确认
4. **合理使用死信队列** - 处理异常消息
5. **延迟队列用插件** - 更灵活更精确
6. **谨慎使用优先级队列** - 影响性能

## 🎯 小结

本节学习了RabbitMQ的高级特性：
- ✅ 消息可靠性三阶段保证
- ✅ 生产者确认和消费者ACK
- ✅ 死信队列处理异常消息
- ✅ 延迟队列实现定时任务
- ✅ 优先级队列和惰性队列

---

**下一节：** [03-Spring Boot整合RabbitMQ](03-SpringBoot整合RabbitMQ.md)
