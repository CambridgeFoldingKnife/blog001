---
title: RabbitMQ集群与监控
---

# 05 - RabbitMQ集群与监控

## 🎯 学习目标

- 理解RabbitMQ集群架构
- 掌握集群搭建方法
- 学会配置镜像队列
- 了解性能优化策略
- 掌握监控和告警方案

## 🏗️ 集群架构

### 集群模式

RabbitMQ有三种集群模式：

#### 1. 普通集群模式（默认）
- 队列数据只存在于一个节点
- 其他节点只有元数据
- 消费时会从存储节点拉取

#### 2. 镜像队列模式（推荐）
- 队列数据在所有节点同步
- 高可用，一个节点挂掉不影响
- 性能有所下降

#### 3. 仲裁队列模式（Quorum Queue）
- RabbitMQ 3.8+新特性
- 基于Raft协议
- 更高的数据一致性

## 🔧 集群搭建

### Docker Compose搭建

```yaml
version: '3.8'

services:
  rabbitmq1:
    image: rabbitmq:3.12-management
    hostname: rabbitmq1
    container_name: rabbitmq1
    environment:
      - RABBITMQ_ERLANG_COOKIE=SECRETCOOKIE
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=admin123
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - ./rabbitmq1:/var/lib/rabbitmq

  rabbitmq2:
    image: rabbitmq:3.12-management
    hostname: rabbitmq2
    container_name: rabbitmq2
    environment:
      - RABBITMQ_ERLANG_COOKIE=SECRETCOOKIE
    ports:
      - "5673:5672"
      - "15673:15672"
    volumes:
      - ./rabbitmq2:/var/lib/rabbitmq

  rabbitmq3:
    image: rabbitmq:3.12-management
    hostname: rabbitmq3
    container_name: rabbitmq3
    environment:
      - RABBITMQ_ERLANG_COOKIE=SECRETCOOKIE
    ports:
      - "5674:5672"
      - "15674:15672"
    volumes:
      - ./rabbitmq3:/var/lib/rabbitmq
```

### 加入集群

```bash
# 进入rabbitmq2容器
docker exec -it rabbitmq2 bash

# 停止应用
rabbitmqctl stop_app

# 重置节点
rabbitmqctl reset

# 加入集群
rabbitmqctl join_cluster rabbit@rabbitmq1

# 启动应用
rabbitmqctl start_app

# 同样操作rabbitmq3
docker exec -it rabbitmq3 bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@rabbitmq1
rabbitmqctl start_app

# 查看集群状态
rabbitmqctl cluster_status
```

## 🔄 镜像队列配置

### 通过命令配置

```bash
# 设置所有队列为镜像队列（2个副本）
rabbitmqctl set_policy ha-all "^" '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'

# 设置特定队列为镜像队列
rabbitmqctl set_policy ha-order "^order\." '{"ha-mode":"all","ha-sync-mode":"automatic"}'

# 查看策略
rabbitmqctl list_policies
```

### 通过管理界面配置

```
访问: http://localhost:15672
Admin → Policies → Add/Update Policy

Name: ha-all
Pattern: ^
Apply to: queues
Definition:
  ha-mode: all
  ha-sync-mode: automatic
```

### 镜像队列参数

| 参数 | 说明 | 值 |
|------|------|-----|
| ha-mode | 镜像模式 | all（所有节点）<br>exactly（指定数量）<br>nodes（指定节点） |
| ha-params | 参数 | 节点数量或节点名称列表 |
| ha-sync-mode | 同步模式 | automatic（自动）<br>manual（手动） |

## 🚀 Spring Boot连接集群

```yaml
spring:
  rabbitmq:
    # 集群地址
    addresses: 192.168.1.101:5672,192.168.1.102:5672,192.168.1.103:5672
    username: admin
    password: admin123
    virtual-host: /
    
    # 连接池配置
    listener:
      simple:
        prefetch: 1
        concurrency: 5
        max-concurrency: 10
```

## 📊 性能优化

### 1. 消息持久化优化

```java
// 批量发送，减少IO
@Service
public class BatchSender {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void batchSend(List<String> messages) {
        // 开启事务
        rabbitTemplate.execute(channel -> {
            for (String message : messages) {
                channel.basicPublish("", "queue", null, message.getBytes());
            }
            return null;
        });
    }
}
```

### 2. 预取数量优化

```yaml
spring:
  rabbitmq:
    listener:
      simple:
        # 一次拉取消息数量
        prefetch: 50
```

### 3. 连接池优化

```yaml
spring:
  rabbitmq:
    cache:
      connection:
        mode: channel
        size: 25
      channel:
        size: 50
        checkout-timeout: 5000
```

### 4. 消费者并发优化

```java
@RabbitListener(
    queues = "high-traffic.queue",
    concurrency = "5-10"  // 最小5个，最多10个消费者
)
public void handleMessage(String message) {
    // 处理消息
}
```

### 5. 惰性队列

```java
// 大量消息时使用惰性队列
@Bean
public Queue lazyQueue() {
    return QueueBuilder
        .durable("lazy.queue")
        .lazy()  // 启用惰性模式
        .build();
}
```

## 📈 监控方案

### 1. 管理界面监控

访问: `http://localhost:15672`

**关键指标：**
- 队列消息数量
- 消费速度
- 发布速度
- 内存使用
- 连接数

### 2. HTTP API监控

```java
@Service
public class RabbitMQMonitor {
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiUrl = "http://localhost:15672/api";
    private final String auth = Base64.getEncoder()
        .encodeToString("admin:admin123".getBytes());
    
    public QueueInfo getQueueInfo(String queueName) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + auth);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<QueueInfo> response = restTemplate.exchange(
            apiUrl + "/queues/%2F/" + queueName,
            HttpMethod.GET,
            entity,
            QueueInfo.class
        );
        
        return response.getBody();
    }
}
```

### 3. Prometheus + Grafana监控

**启用Prometheus插件：**
```bash
rabbitmq-plugins enable rabbitmq_prometheus
```

**Prometheus配置：**
```yaml
scrape_configs:
  - job_name: 'rabbitmq'
    static_configs:
      - targets: ['localhost:15692']
```

**Grafana Dashboard ID:** 10991

### 4. 告警规则

```yaml
# Prometheus告警规则
groups:
  - name: rabbitmq
    rules:
      # 队列消息积压告警
      - alert: RabbitMQQueueBacklog
        expr: rabbitmq_queue_messages > 10000
        for: 5m
        annotations:
          summary: "队列消息积压"
          description: "队列{{ $labels.queue }}消息数: {{ $value }}"
      
      # 消费速度过慢
      - alert: RabbitMQSlowConsume
        expr: rate(rabbitmq_queue_messages_consumed_total[5m]) < 10
        for: 5m
        annotations:
          summary: "消费速度过慢"
      
      # 节点内存告警
      - alert: RabbitMQHighMemory
        expr: rabbitmq_node_mem_used / rabbitmq_node_mem_limit > 0.8
        for: 5m
        annotations:
          summary: "内存使用率过高"
```

## 🔍 常用运维命令

```bash
# 查看集群状态
rabbitmqctl cluster_status

# 查看队列
rabbitmqctl list_queues name messages consumers

# 查看交换机
rabbitmqctl list_exchanges

# 查看绑定
rabbitmqctl list_bindings

# 查看连接
rabbitmqctl list_connections

# 查看通道
rabbitmqctl list_channels

# 清空队列
rabbitmqctl purge_queue queue_name

# 删除队列
rabbitmqctl delete_queue queue_name

# 查看内存使用
rabbitmqctl status | grep memory

# 重置节点
rabbitmqctl reset
```

## ⚙️ 调优建议

### 1. 系统层面

```bash
# 增加文件描述符限制
ulimit -n 65536

# 修改/etc/security/limits.conf
* soft nofile 65536
* hard nofile 65536
```

### 2. RabbitMQ配置

```conf
# rabbitmq.conf

# VM内存高水位（40%）
vm_memory_high_watermark.relative = 0.4

# 磁盘空闲空间阈值（50GB）
disk_free_limit.absolute = 50GB

# 心跳超时
heartbeat = 60

# 通道最大数量
channel_max = 2048

# 最大连接数
num_acceptors.tcp = 10
```

### 3. 队列优化

- 使用惰性队列处理大量消息
- 设置合理的TTL
- 使用死信队列处理异常
- 限制队列长度
- 合理设置prefetch

## 💡 高可用方案

### 1. 集群 + 镜像队列
```
Node1(Master) ← → Node2(Slave) ← → Node3(Slave)
```

### 2. HAProxy负载均衡

```
HAProxy
  ↓
├─ RabbitMQ1
├─ RabbitMQ2
└─ RabbitMQ3
```

**HAProxy配置：**
```conf
listen rabbitmq_cluster
    bind 0.0.0.0:5670
    mode tcp
    balance roundrobin
    server rabbit1 192.168.1.101:5672 check
    server rabbit2 192.168.1.102:5672 check
    server rabbit3 192.168.1.103:5672 check
```

## 🎯 小结

本节学习了RabbitMQ集群与监控：
- ✅ 集群架构和搭建
- ✅ 镜像队列配置
- ✅ 性能优化策略
- ✅ 监控告警方案
- ✅ 高可用部署

---

**下一节：** [06-RabbitMQ面试题](06-RabbitMQ面试题.md)
