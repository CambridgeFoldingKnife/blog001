---
title: RabbitMQ消息队列
---

# 🐰 RabbitMQ 消息队列

> 高性能、高可靠的消息中间件，企业级异步通信解决方案

## 📚 教程目录

### [01 - RabbitMQ基础入门](01-RabbitMQ基础入门.md)
- RabbitMQ简介与安装
- AMQP协议与核心概念
- 五种工作模式详解
- Java客户端API使用

### [02 - RabbitMQ进阶特性](02-RabbitMQ进阶特性.md)
- 生产者确认机制
- 消息持久化
- 消费者ACK机制
- 死信队列（DLX）
- 延迟队列实现
- 优先级队列

### [03 - Spring Boot整合RabbitMQ](03-SpringBoot整合RabbitMQ.md)
- 快速整合配置
- 声明式队列和交换机
- RabbitTemplate使用
- @RabbitListener注解
- 消息转换器配置
- 手动ACK实现

### [04 - RabbitMQ实战案例](04-RabbitMQ实战案例.md)
- 订单延时取消
- 秒杀系统削峰
- 日志收集系统
- 分布式事务方案

### [05 - RabbitMQ集群与监控](05-RabbitMQ集群与监控.md)
- 集群架构与搭建
- 镜像队列配置
- 性能优化策略
- Prometheus监控
- 告警配置

### [06 - RabbitMQ面试题](06-RabbitMQ面试题.md)
- 高频面试题汇总
- 消息可靠性保证
- 性能调优经验
- 实战问题解答

## 🎯 学习目标

完成本教程后，你将掌握：
- ✅ RabbitMQ核心概念和工作原理
- ✅ 五种工作模式的应用场景
- ✅ 消息可靠性保证机制
- ✅ Spring Boot整合最佳实践
- ✅ 生产环境部署和监控
- ✅ 常见问题排查和优化

## 🚀 快速开始

### Docker快速启动

```bash
docker run -d \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin123 \
  rabbitmq:3.12-management
```

访问管理界面：http://localhost:15672

## 📊 学习路线

```
基础入门 → 进阶特性 → Spring Boot整合 → 实战案例 → 集群部署 → 面试准备
```

## 💡 应用场景

- 🔄 **异步处理** - 注册发送邮件、订单通知
- 🔌 **系统解耦** - 订单系统与库存、物流解耦
- ⛰️ **流量削峰** - 秒杀、抢购场景
- ⏰ **延迟任务** - 订单超时取消
- 📊 **日志收集** - 分布式日志统一处理

## 🔗 相关资源

- [RabbitMQ官方文档](https://www.rabbitmq.com/documentation.html)
- [Spring AMQP文档](https://spring.io/projects/spring-amqp)
- [RabbitMQ GitHub](https://github.com/rabbitmq/rabbitmq-server)

---

**开始学习** → [01-RabbitMQ基础入门](01-RabbitMQ基础入门.md)
