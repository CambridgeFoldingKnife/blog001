---
title: Spring 框架教程
autoGroup: false
autoSort: false
sidebarDepth: 0
---

# Spring 框架教程

> 从零开始掌握 Spring 框架，成为 Java 企业级开发专家

## 📚 教程简介

本教程将带你系统学习 Spring 框架，从基础概念到实战应用，涵盖 IoC、DI、AOP、事务管理等核心知识点。Spring 是 Java 企业级开发的基石，掌握 Spring 是每个 Java 开发者的必备技能。

## 🎯 学习目标

- ✅ 深入理解 IoC 和 DI 的核心思想
- ✅ 熟练掌握 Spring Bean 的管理
- ✅ 掌握 AOP 面向切面编程
- ✅ 熟悉 Spring 事务管理机制
- ✅ 掌握 Spring 常用注解
- ✅ 能够进行 Spring 项目开发
- ✅ 应对常见的 Spring 面试题

## 📖 教程目录

### [第一章：Spring 基础入门](1.Spring基础入门.md)
- Spring 是什么？Spring 的核心特性
- Spring 框架体系结构
- IoC 控制反转详解
- DI 依赖注入详解
- Bean 的配置与管理
- 创建第一个 Spring 项目

### [第二章：Spring 核心注解](2.Spring核心注解.md)
- 组件注解：@Component、@Service、@Repository、@Controller
- 依赖注入注解：@Autowired、@Resource、@Qualifier
- 配置注解：@Configuration、@Bean、@ComponentScan
- 属性注解：@Value、@PropertySource
- 作用域注解：@Scope
- 生命周期注解：@PostConstruct、@PreDestroy

### [第三章：Spring AOP](3.SpringAOP.md)
- AOP 核心概念
- AOP 的实现方式（JDK 动态代理 vs CGLIB）
- 切点表达式详解
- 通知类型：前置、后置、环绕、异常、最终
- AOP 实战应用（日志、权限、事务）
- AOP 常见问题

### [第四章：Spring 事务管理](4.Spring事务管理.md)
- 事务的基本概念
- 编程式事务 vs 声明式事务
- @Transactional 注解详解
- 事务传播行为
- 事务隔离级别
- 事务失效场景及解决方案

### [第五章：Spring 面试题集](5.Spring面试题集.md)
- IoC 和 DI 相关面试题
- Bean 生命周期面试题
- AOP 相关面试题
- 事务管理面试题
- 高频面试题解析

## 🚀 快速开始

### 环境准备

**前置要求：**
- JDK 8 或更高版本
- Maven 3.5+
- IDE（推荐 IntelliJ IDEA）

### 创建第一个 Spring 项目

**步骤1：创建 Maven 项目**

```bash
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=spring-demo \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

**步骤2：添加 Spring 依赖**

```xml
<dependencies>
    <!-- Spring Context -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.30</version>
    </dependency>
    
    <!-- JUnit -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

**步骤3：创建 Bean**

```java
package com.example.service;

public class UserService {
    public void sayHello() {
        System.out.println("Hello Spring!");
    }
}
```

**步骤4：创建 Spring 配置**

**方式1：XML 配置**

`applicationContext.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <bean id="userService" class="com.example.service.UserService"/>
</beans>
```

**方式2：注解配置（推荐）**

```java
@Configuration
@ComponentScan("com.example")
public class AppConfig {
}

@Service
public class UserService {
    public void sayHello() {
        System.out.println("Hello Spring!");
    }
}
```

**步骤5：测试运行**

```java
public class App {
    public static void main(String[] args) {
        // XML 方式
        ApplicationContext context = 
            new ClassPathXmlApplicationContext("applicationContext.xml");
        
        // 注解方式
        ApplicationContext context = 
            new AnnotationConfigApplicationContext(AppConfig.class);
        
        UserService userService = context.getBean(UserService.class);
        userService.sayHello();
    }
}
```

## 💡 学习建议

1. **理解核心思想** - 深入理解 IoC 和 DI，这是 Spring 的基础
2. **动手实践** - 每学完一个知识点，立即编码实践
3. **对比学习** - 对比 XML 配置和注解配置的差异
4. **阅读源码** - 有能力的同学可以阅读 Spring 源码
5. **循序渐进** - 从简单到复杂，逐步掌握

## 🌟 Spring 核心概念速览

### IoC（控制反转）

**传统方式：**
```java
public class UserService {
    private UserDao userDao = new UserDao(); // 自己创建依赖
}
```

**Spring IoC：**
```java
@Service
public class UserService {
    @Autowired
    private UserDao userDao; // Spring 注入依赖
}
```

**优势：**
- 解耦：对象之间的依赖关系由 Spring 管理
- 易测试：可以方便地注入 Mock 对象
- 易维护：修改依赖不需要改动代码

### DI（依赖注入）

**三种注入方式：**

1. **构造器注入（推荐）**
```java
@Service
public class UserService {
    private final UserDao userDao;
    
    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

2. **Setter 注入**
```java
@Service
public class UserService {
    private UserDao userDao;
    
    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

3. **字段注入（不推荐）**
```java
@Service
public class UserService {
    @Autowired
    private UserDao userDao;
}
```

### Bean 作用域

| 作用域 | 说明 |
|--------|------|
| singleton | 单例（默认） |
| prototype | 每次获取创建新实例 |
| request | Web 应用中每个请求一个实例 |
| session | Web 应用中每个会话一个实例 |

### AOP 核心概念

```
切面（Aspect）= 切点（Pointcut） + 通知（Advice）

切点：在哪里切入
通知：切入后做什么
```

**通知类型：**
- @Before：前置通知
- @After：后置通知
- @AfterReturning：返回后通知
- @AfterThrowing：异常通知
- @Around：环绕通知

## 📚 Spring 体系结构

```
Spring Framework
├── Core Container (核心容器)
│   ├── Beans
│   ├── Core
│   ├── Context
│   └── SpEL
│
├── AOP (面向切面)
│   ├── AOP
│   └── Aspects
│
├── Data Access (数据访问)
│   ├── JDBC
│   ├── ORM
│   ├── Transactions
│   └── OXM
│
├── Web (Web 层)
│   ├── Web
│   ├── Servlet (Spring MVC)
│   ├── WebSocket
│   └── Portlet
│
└── Test (测试)
    └── Test
```

## 🏗️ Spring 项目结构

```
spring-demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── config/          # 配置类
│   │   │       │   └── AppConfig.java
│   │   │       ├── controller/      # 控制层
│   │   │       ├── service/         # 业务层
│   │   │       │   ├── UserService.java
│   │   │       │   └── impl/
│   │   │       │       └── UserServiceImpl.java
│   │   │       ├── dao/             # 数据访问层
│   │   │       │   └── UserDao.java
│   │   │       ├── entity/          # 实体类
│   │   │       │   └── User.java
│   │   │       └── aspect/          # 切面类
│   │   │           └── LogAspect.java
│   │   └── resources/
│   │       ├── applicationContext.xml
│   │       └── application.properties
│   └── test/
│       └── java/
└── pom.xml
```

## 📚 推荐资源

### 官方文档
- [Spring Framework 官方文档](https://spring.io/projects/spring-framework)
- [Spring Framework 参考文档](https://docs.spring.io/spring-framework/reference/)

### 推荐书籍
- 《Spring 实战》（第 5 版）
- 《Spring 源码深度解析》
- 《精通 Spring 4.x 企业应用开发实战》

### 在线资源
- [Spring 官方博客](https://spring.io/blog)
- [Spring Guides](https://spring.io/guides)

## ⚠️ 注意事项

1. **版本选择** - 建议使用 Spring 5.x 版本，与 Spring Boot 2.x 兼容
2. **注解优先** - 优先使用注解配置，XML 配置作为了解
3. **依赖注入** - 优先使用构造器注入，保证不可变性
4. **事务管理** - 理解事务传播行为，避免事务失效
5. **AOP 使用** - 合理使用 AOP，避免过度使用

## 🎯 学习路线图

```
第1周：Spring 基础
├─ IoC 和 DI 概念
├─ Bean 配置和管理
├─ 注解配置
└─ 依赖注入方式

第2周：Spring 注解
├─ 组件注解
├─ 依赖注入注解
├─ 配置注解
└─ 生命周期注解

第3周：Spring AOP
├─ AOP 核心概念
├─ 切点表达式
├─ 通知类型
└─ AOP 实战

第4周：Spring 事务
├─ 事务管理概念
├─ @Transactional 使用
├─ 事务传播行为
└─ 事务失效场景
```

## 🤝 Spring vs Spring Boot

| 特性 | Spring | Spring Boot |
|------|--------|-------------|
| 配置 | 需要大量 XML/注解配置 | 自动配置，开箱即用 |
| 依赖管理 | 手动管理依赖版本 | starter 统一管理 |
| 内嵌服务器 | 需要外部 Tomcat | 内置 Tomcat/Jetty |
| 学习曲线 | 陡峭 | 平缓 |
| 开发效率 | 一般 | 高 |
| 适用场景 | 传统企业级应用 | 微服务、快速开发 |

**学习建议：** 先学 Spring 理解原理，再学 Spring Boot 提高效率。

## 📄 版权说明

本教程仅供学习使用，欢迎分享传播。

---

**准备好了吗？让我们开始 Spring 学习之旅！🚀**

**建议从 [第一章：Spring 基础入门](1.Spring基础入门.md) 开始学习**
