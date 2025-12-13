---
title: Spring Cloud 教程
---

# Spring Cloud 教程

> 从入门到精通，掌握微服务架构

## 📚 教程简介

本教程将带你系统学习 Spring Cloud 微服务框架，从微服务基础到各大核心组件，涵盖服务注册、负载均衡、服务调用、网关、配置中心、熔断限流等企业级应用开发技术。Spring Cloud 是目前最流行的微服务开发框架，掌握它是进入大厂的必备技能。

## 🎯 学习目标

- ✅ 理解微服务架构思想
- ✅ 掌握 Eureka 服务注册与发现
- ✅ 熟练使用 Ribbon 负载均衡
- ✅ 掌握 OpenFeign 声明式服务调用
- ✅ 熟练使用 Gateway 网关
- ✅ 掌握 Config 配置中心
- ✅ 熟练使用 Nacos 注册配置中心
- ✅ 掌握 Sentinel 熔断限流
- ✅ 具备微服务项目实战能力
- ✅ 应对 Spring Cloud 面试

## 📖 教程目录

### [第一章：微服务基础入门](1.微服务基础入门.md) ⭐⭐⭐⭐⭐
**学习内容：**
- 什么是微服务？
- 微服务 vs 单体架构
- Spring Cloud 简介
- Spring Cloud 版本
- 微服务架构演进
- 创建第一个微服务项目

### [第二章：Eureka 服务注册](2.Eureka服务注册.md) ⭐⭐⭐⭐⭐
**学习内容：**
- Eureka 简介
- 搭建 Eureka Server
- 服务注册
- 服务发现
- Eureka 高可用
- 自我保护机制

### [第三章：Ribbon 负载均衡](3.Ribbon负载均衡.md) ⭐⭐⭐⭐
**学习内容：**
- 负载均衡概述
- Ribbon 简介
- 负载均衡策略
- 自定义负载均衡
- RestTemplate 整合

### [第四章：OpenFeign 服务调用](4.OpenFeign服务调用.md) ⭐⭐⭐⭐⭐
**学习内容：**
- OpenFeign 简介
- 声明式服务调用
- 超时配置
- 日志配置
- 请求压缩
- 实战案例

### [第五章：Gateway 网关](5.Gateway网关.md) ⭐⭐⭐⭐⭐
**学习内容：**
- 网关概述
- Gateway 简介
- 路由配置
- 断言工厂
- 过滤器
- 全局过滤器
- 跨域配置

### [第六章：Config 配置中心](6.Config配置中心.md) ⭐⭐⭐⭐
**学习内容：**
- 配置中心概述
- Config Server 搭建
- Config Client 配置
- 动态刷新
- 配置加密

### [第七章：Nacos 注册配置中心](7.Nacos注册配置中心.md) ⭐⭐⭐⭐⭐
**学习内容：**
- Nacos 简介
- 安装启动
- 服务注册发现
- 配置管理
- 命名空间
- 配置共享

### [第八章：Sentinel 熔断限流](8.Sentinel熔断限流.md) ⭐⭐⭐⭐⭐
**学习内容：**
- 熔断限流概述
- Sentinel 简介
- 流量控制
- 熔断降级
- 热点参数限流
- 系统自适应限流
- 整合 OpenFeign

### [第九章：Spring Cloud 面试题集](9.SpringCloud面试题集.md) ⭐⭐⭐⭐⭐
**学习内容：**
- 微服务基础面试题
- Eureka 面试题
- Ribbon 面试题
- OpenFeign 面试题
- Gateway 面试题
- 熔断限流面试题
- 高频面试题 30+

## 🚀 快速开始

### 环境准备

**前置要求：**
- JDK 8 或更高版本
- Maven 3.5+
- Spring Boot 2.x
- IDE（推荐 IntelliJ IDEA）

### Spring Cloud 版本选择

**版本对应关系：**
| Spring Boot | Spring Cloud |
|-------------|--------------|
| 2.7.x | 2021.0.x (Jubilee) |
| 2.6.x | 2021.0.x (Jubilee) |
| 2.4.x, 2.5.x | 2020.0.x (Ilford) |

**推荐版本：**
```xml
<spring-boot.version>2.7.18</spring-boot.version>
<spring-cloud.version>2021.0.8</spring-cloud.version>
```

### 创建父工程

**pom.xml：**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>springcloud-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>
    
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <spring-boot.version>2.7.18</spring-boot.version>
        <spring-cloud.version>2021.0.8</spring-cloud.version>
    </properties>
    
    <dependencyManagement>
        <dependencies>
            <!-- Spring Boot -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            
            <!-- Spring Cloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

### 创建服务提供者

**1. 创建子模块（provider-service）**

**pom.xml：**
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
</dependencies>
```

**application.yml：**
```yaml
server:
  port: 8001

spring:
  application:
    name: provider-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka
```

**启动类：**
```java
@SpringBootApplication
@EnableEurekaClient
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
```

**Controller：**
```java
@RestController
@RequestMapping("/api")
public class HelloController {
    
    @GetMapping("/hello")
    public String hello(@RequestParam String name) {
        return "Hello, " + name + "!";
    }
}
```

## 💡 学习建议

1. **循序渐进** - 按照章节顺序学习
2. **动手实践** - 每学完一章，必须搭建项目
3. **理解原理** - 不仅要会用，还要理解原理
4. **项目实战** - 通过完整项目巩固知识
5. **阅读源码** - 深入理解底层实现

## 🌟 Spring Cloud 核心组件

### 1. 服务注册与发现

**Eureka：**
```
服务提供者 → 注册到 Eureka Server
服务消费者 → 从 Eureka Server 获取服务列表
```

### 2. 负载均衡

**Ribbon：**
```java
// 客户端负载均衡
@LoadBalanced
RestTemplate restTemplate();
```

### 3. 服务调用

**OpenFeign：**
```java
@FeignClient("provider-service")
public interface ProviderClient {
    @GetMapping("/api/hello")
    String hello(@RequestParam String name);
}
```

### 4. 服务网关

**Gateway：**
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: provider-route
          uri: lb://provider-service
          predicates:
            - Path=/provider/**
```

### 5. 配置中心

**Config：**
```yaml
spring:
  cloud:
    config:
      uri: http://localhost:8888
      profile: dev
```

### 6. 熔断限流

**Sentinel：**
```java
@SentinelResource(value = "hello", fallback = "helloFallback")
public String hello(String name) {
    return "Hello, " + name;
}
```

## 📊 微服务架构图

```
┌─────────────┐
│   用户请求   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Gateway   │ ← 统一网关
│    网关     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Eureka    │ ← 服务注册中心
│  注册中心   │
└──────┬──────┘
       │
       ├─────────────────┬─────────────────┐
       ↓                 ↓                 ↓
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  用户服务   │   │  订单服务   │   │  商品服务   │
│   User      │   │   Order     │   │  Product    │
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       └─────────────────┴─────────────────┘
                         │
                         ↓
                  ┌─────────────┐
                  │   MySQL     │
                  │   Redis     │
                  └─────────────┘
```

## 🏗️ Spring Cloud vs Spring Boot

| 特性 | Spring Boot | Spring Cloud |
|------|-------------|--------------|
| **定位** | 单体应用开发 | 微服务开发 |
| **关注点** | 简化配置 | 服务治理 |
| **核心功能** | 自动配置 | 服务注册、负载均衡 |
| **应用规模** | 中小型 | 大型分布式 |

## 🎯 学习路线图

```
第 1 周：微服务基础
  ├── 微服务概念
  ├── Spring Cloud 简介
  ├── 版本选择
  └── 创建第一个微服务

第 2 周：服务注册
  ├── Eureka Server
  ├── 服务注册
  ├── 服务发现
  └── 高可用集群

第 3 周：负载均衡与服务调用
  ├── Ribbon 负载均衡
  ├── 负载均衡策略
  ├── OpenFeign 服务调用
  └── 超时与重试

第 4 周：服务网关
  ├── Gateway 路由
  ├── 断言工厂
  ├── 过滤器
  └── 跨域配置

第 5 周：配置中心
  ├── Config Server
  ├── 配置读取
  ├── 动态刷新
  └── Nacos 配置中心

第 6 周：熔断限流
  ├── Sentinel 熔断
  ├── 流量控制
  ├── 降级规则
  └── 热点参数限流

第 7-8 周：项目实战
  ├── 电商微服务架构
  ├── 用户服务
  ├── 订单服务
  └── 商品服务
```

## 🔥 核心技术栈

### 注册中心
- **Eureka** - Netflix 开源（维护中）
- **Nacos** - 阿里巴巴开源（推荐）
- **Consul** - HashiCorp 开源

### 服务调用
- **Ribbon** - 客户端负载均衡
- **OpenFeign** - 声明式服务调用（推荐）

### 服务网关
- **Gateway** - Spring Cloud 官方（推荐）
- **Zuul** - Netflix 开源（已停更）

### 配置中心
- **Config** - Spring Cloud 官方
- **Nacos** - 阿里巴巴开源（推荐）

### 熔断限流
- **Hystrix** - Netflix 开源（已停更）
- **Sentinel** - 阿里巴巴开源（推荐）
- **Resilience4j** - 轻量级

### 链路追踪
- **Sleuth + Zipkin** - 分布式链路追踪

## 📚 推荐资源

### 官方资源
- [Spring Cloud 官方文档](https://spring.io/projects/spring-cloud)
- [Spring Cloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba)
- [Nacos 官网](https://nacos.io/)
- [Sentinel 官网](https://sentinelguard.io/)

### 推荐书籍
- 《Spring Cloud 微服务实战》
- 《Spring Cloud Alibaba 微服务原理与实战》

## ⚠️ 常见问题

### 1. Eureka 和 Nacos 如何选择？

**Eureka：**
- Netflix 开源
- AP 模式（可用性优先）
- 维护中

**Nacos：**
- 阿里巴巴开源
- AP + CP 模式
- 功能更强（注册 + 配置）
- **推荐使用**

### 2. Ribbon 和 Feign 的区别？

**Ribbon：**
- 客户端负载均衡
- 需要手动构建 HTTP 请求

**Feign：**
- 声明式服务调用
- 内置 Ribbon
- 使用更简单（推荐）

### 3. Gateway 和 Zuul 的区别？

**Gateway：**
- Spring Cloud 官方
- 基于 WebFlux（异步非阻塞）
- 性能更好
- **推荐使用**

**Zuul：**
- Netflix 开源
- 基于 Servlet（同步阻塞）
- 已停更

## 💪 进阶学习

**掌握 Spring Cloud 后，可以学习：**
1. **Spring Cloud Alibaba** - 阿里巴巴微服务全家桶
2. **Kubernetes** - 容器编排
3. **Docker** - 容器化部署
4. **分布式事务** - Seata
5. **消息队列** - RabbitMQ、Kafka

## 📄 版权说明

本教程仅供学习使用，欢迎分享传播。

---

**准备好了吗？让我们开始 Spring Cloud 微服务学习之旅！🚀**

**建议从 [第一章：微服务基础入门](1.微服务基础入门.md) 开始学习**
