---
title: RabbitMQ基础入门
---

# 01 - RabbitMQ基础入门

## 🎯 学习目标

- 了解RabbitMQ的基本概念和特点
- 掌握RabbitMQ的安装和配置
- 理解AMQP协议和核心组件
- 掌握五种工作模式
- 学会使用Java客户端API

## 📖 RabbitMQ简介

### 什么是RabbitMQ？

RabbitMQ是一个开源的消息代理软件（Message Broker），实现了AMQP（高级消息队列协议）。它使用Erlang语言开发，具有高可用、高可靠、可扩展的特点。

### 核心特点

- ✅ **可靠性** - 支持消息持久化、确认机制
- ✅ **灵活路由** - 多种交换机类型
- ✅ **集群支持** - 高可用集群部署
- ✅ **多语言** - 支持多种编程语言
- ✅ **管理界面** - Web管理控制台
- ✅ **插件系统** - 丰富的插件生态

### 应用场景

- 🔄 **异步处理** - 注册发送邮件、短信通知
- 🔌 **系统解耦** - 订单系统与库存、物流解耦
- ⛰️ **流量削峰** - 秒杀、抢购场景
- 📊 **日志收集** - 应用日志统一收集
- 🔔 **消息通知** - 站内消息、推送通知

## 🔧 安装RabbitMQ

### Docker安装（推荐）

```bash
# 拉取镜像（带管理界面）
docker pull rabbitmq:3.12-management

# 运行容器
docker run -d \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin123 \
  rabbitmq:3.12-management

# 访问管理界面
# http://localhost:15672
# 用户名: admin
# 密码: admin123
```

### Linux安装

```bash
# 安装Erlang
wget https://packages.erlang-solutions.com/erlang-solutions-2.0-1.noarch.rpm
rpm -Uvh erlang-solutions-2.0-1.noarch.rpm
yum install -y erlang

# 安装RabbitMQ
wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.12.0/rabbitmq-server-3.12.0-1.el7.noarch.rpm
rpm -Uvh rabbitmq-server-3.12.0-1.el7.noarch.rpm

# 启动服务
systemctl start rabbitmq-server
systemctl enable rabbitmq-server

# 启用管理插件
rabbitmq-plugins enable rabbitmq_management

# 添加用户
rabbitmqctl add_user admin admin123
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

### Windows安装

1. 安装Erlang: https://www.erlang.org/downloads
2. 安装RabbitMQ: https://www.rabbitmq.com/download.html
3. 启用管理插件:
```cmd
rabbitmq-plugins enable rabbitmq_management
```

## 🏗️ 核心概念

### AMQP协议

```
Producer → Exchange → Queue → Consumer
            ↓
         Binding
```

### 核心组件

#### 1. Producer（生产者）
发送消息的应用程序。

#### 2. Exchange（交换机）
接收生产者的消息，并根据路由规则转发到队列。

**交换机类型：**
- **Direct（直连）** - 精确匹配routing key
- **Fanout（广播）** - 发送到所有绑定的队列
- **Topic（主题）** - 模式匹配routing key
- **Headers（头部）** - 根据消息头属性匹配

#### 3. Queue（队列）
存储消息的容器，等待消费者消费。

#### 4. Binding（绑定）
Exchange和Queue之间的绑定关系。

#### 5. Consumer（消费者）
接收并处理消息的应用程序。

#### 6. Virtual Host（虚拟主机）
类似于数据库的database，用于隔离不同应用。

#### 7. Connection（连接）
TCP连接。

#### 8. Channel（信道）
在Connection内部建立的逻辑连接，减少TCP连接开销。

## 🎨 五种工作模式

### 1. Simple（简单模式）

**特点：** 一个生产者，一个队列，一个消费者

```
Producer → Queue → Consumer
```

**代码示例：**
```java
// 生产者
public class Producer {
    private static final String QUEUE_NAME = "simple_queue";
    
    public static void main(String[] args) throws Exception {
        // 1. 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        factory.setPort(5672);
        factory.setUsername("admin");
        factory.setPassword("admin123");
        
        // 2. 创建连接
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 3. 声明队列
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            
            // 4. 发送消息
            String message = "Hello RabbitMQ!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println("发送消息: " + message);
        }
    }
}

// 消费者
public class Consumer {
    private static final String QUEUE_NAME = "simple_queue";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        
        // 接收消息
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("收到消息: " + message);
        };
        
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
    }
}
```

### 2. Work Queue（工作队列模式）

**特点：** 一个生产者，一个队列，多个消费者（竞争消费）

```
Producer → Queue → Consumer1
              ↓
           Consumer2
```

**应用场景：** 任务分发、负载均衡

**代码示例：**
```java
// 生产者
public class Producer {
    private static final String QUEUE_NAME = "work_queue";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            
            // 发送10条消息
            for (int i = 1; i <= 10; i++) {
                String message = "Task " + i;
                channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
                System.out.println("发送: " + message);
            }
        }
    }
}

// 消费者（启动多个实例）
public class Consumer {
    private static final String QUEUE_NAME = "work_queue";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        
        // 设置每次只处理1条消息（公平分发）
        channel.basicQos(1);
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("处理任务: " + message);
            
            try {
                Thread.sleep(1000); // 模拟处理时间
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            // 手动确认
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
        };
        
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {});
    }
}
```

### 3. Publish/Subscribe（发布订阅模式）

**特点：** 使用Fanout交换机，消息发送给所有订阅者

```
Producer → Exchange(fanout) → Queue1 → Consumer1
                         ↓
                       Queue2 → Consumer2
```

**应用场景：** 群发消息、广播通知

**代码示例：**
```java
// 生产者
public class Producer {
    private static final String EXCHANGE_NAME = "logs";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            // 声明fanout交换机
            channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
            
            String message = "系统通知：服务器将在1小时后维护";
            channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes());
            System.out.println("发送通知: " + message);
        }
    }
}

// 消费者
public class Consumer {
    private static final String EXCHANGE_NAME = "logs";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        
        // 声明临时队列
        String queueName = channel.queueDeclare().getQueue();
        
        // 绑定队列到交换机
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("收到通知: " + message);
        };
        
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```

### 4. Routing（路由模式）

**特点：** 使用Direct交换机，根据routing key精确匹配

```
Producer → Exchange(direct) → Queue1(error) → Consumer1
                         ↓
                       Queue2(info,warning) → Consumer2
```

**应用场景：** 日志级别分发、错误处理

**代码示例：**
```java
// 生产者
public class Producer {
    private static final String EXCHANGE_NAME = "direct_logs";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            channel.exchangeDeclare(EXCHANGE_NAME, "direct");
            
            // 发送不同级别的日志
            String[] levels = {"info", "warning", "error"};
            for (String level : levels) {
                String message = level + " 级别日志消息";
                channel.basicPublish(EXCHANGE_NAME, level, null, message.getBytes());
                System.out.println("发送: " + message);
            }
        }
    }
}

// 消费者（只接收error日志）
public class ErrorConsumer {
    private static final String EXCHANGE_NAME = "direct_logs";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.exchangeDeclare(EXCHANGE_NAME, "direct");
        String queueName = channel.queueDeclare().getQueue();
        
        // 只绑定error级别
        channel.queueBind(queueName, EXCHANGE_NAME, "error");
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("ERROR日志: " + message);
        };
        
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```

### 5. Topic（主题模式）

**特点：** 使用Topic交换机，支持通配符匹配

- `*` - 匹配一个单词
- `#` - 匹配0个或多个单词

```
Producer → Exchange(topic) → Queue1(*.error) → Consumer1
                        ↓
                      Queue2(user.#) → Consumer2
```

**应用场景：** 复杂的消息路由

**代码示例：**
```java
// 生产者
public class Producer {
    private static final String EXCHANGE_NAME = "topic_logs";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            
            channel.exchangeDeclare(EXCHANGE_NAME, "topic");
            
            // 发送不同routing key的消息
            String[][] messages = {
                {"user.order.create", "用户创建订单"},
                {"user.order.cancel", "用户取消订单"},
                {"system.error", "系统错误"},
                {"user.login", "用户登录"}
            };
            
            for (String[] msg : messages) {
                channel.basicPublish(EXCHANGE_NAME, msg[0], null, msg[1].getBytes());
                System.out.println("发送: [" + msg[0] + "] " + msg[1]);
            }
        }
    }
}

// 消费者（接收所有user相关消息）
public class UserConsumer {
    private static final String EXCHANGE_NAME = "topic_logs";
    
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");
        String queueName = channel.queueDeclare().getQueue();
        
        // 绑定所有user开头的消息
        channel.queueBind(queueName, EXCHANGE_NAME, "user.#");
        
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String routingKey = delivery.getEnvelope().getRoutingKey();
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("收到: [" + routingKey + "] " + message);
        };
        
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```

## 📦 Maven依赖

```xml
<dependency>
    <groupId>com.rabbitmq</groupId>
    <artifactId>amqp-client</artifactId>
    <version>5.18.0</version>
</dependency>
```

## 💡 最佳实践

1. **使用连接池** - 复用Connection和Channel
2. **正确关闭资源** - 使用try-with-resources
3. **选择合适的交换机类型** - 根据业务场景
4. **设置合理的QoS** - 控制消费速度
5. **启用消息确认机制** - 保证消息可靠性

## 🎯 小结

本节学习了RabbitMQ的基础知识：
- ✅ 核心概念（Exchange、Queue、Binding）
- ✅ 五种工作模式及应用场景
- ✅ Java客户端API基本使用
- ✅ 消息的发送和接收

---

**下一节：** [02-RabbitMQ进阶特性](02-RabbitMQ进阶特性.md)
