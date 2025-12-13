---
title: Spring MVC 教程
---

# Spring MVC 教程

> 从零开始掌握 Spring MVC，成为 Web 开发高手

## 📚 教程简介

本教程将带你系统学习 Spring MVC 框架，从基础概念到实战应用，涵盖请求处理、数据绑定、拦截器、RESTful 接口等核心知识点。Spring MVC 是 Java Web 开发的主流框架，掌握它是每个 Java 开发者的必备技能。

## 🎯 学习目标

- ✅ 理解 Spring MVC 的工作原理
- ✅ 掌握控制器的开发
- ✅ 熟练处理请求和响应
- ✅ 掌握数据绑定和验证
- ✅ 开发 RESTful 接口
- ✅ 掌握拦截器和异常处理
- ✅ 应对常见的 Spring MVC 面试题

## 📖 教程目录

### [第一章：Spring MVC 基础入门](1.SpringMVC基础入门.md)
- Spring MVC 是什么？
- MVC 设计模式
- Spring MVC 执行流程
- 创建第一个 Spring MVC 项目
- 常用注解：@Controller、@RequestMapping

### [第二章：Spring MVC 核心技术](2.SpringMVC核心技术.md)
- 请求处理详解
- 响应处理详解
- 拦截器（Interceptor）
- 异常处理
- 文件上传下载
- 跨域配置

### [第三章：数据绑定与验证](3.数据绑定与验证.md)
- 请求参数绑定
- 路径变量绑定
- 请求体绑定
- 数据类型转换
- 数据验证（JSR-303）
- 自定义验证器

### [第四章：RESTful 接口开发](4.RESTful接口开发.md)
- RESTful 设计规范
- @RestController 详解
- 统一响应格式
- 统一异常处理
- 接口文档（Swagger）
- 接口测试

### [第五章：Spring MVC 面试题集](5.SpringMVC面试题集.md)
- 基础概念面试题
- 执行流程面试题
- 注解使用面试题
- 拦截器面试题
- 高频面试题解析

## 🚀 快速开始

### 环境准备

**前置要求：**
- JDK 8 或更高版本
- Maven 3.5+
- Tomcat 8.5 或更高版本
- IDE（推荐 IntelliJ IDEA）

### 创建第一个 Spring MVC 项目

**步骤1：创建 Maven Web 项目**

```bash
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=springmvc-demo \
  -DarchetypeArtifactId=maven-archetype-webapp \
  -DinteractiveMode=false
```

**步骤2：添加依赖**

```xml
<dependencies>
    <!-- Spring MVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.30</version>
    </dependency>
    
    <!-- Servlet API -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
    
    <!-- Jackson (JSON) -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.2</version>
    </dependency>
</dependencies>
```

**步骤3：配置 DispatcherServlet**

**web.xml：**
```xml
<servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

**步骤4：Spring MVC 配置**

**spring-mvc.xml：**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/mvc
           http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    
    <!-- 组件扫描 -->
    <context:component-scan base-package="com.example.controller"/>
    
    <!-- 注解驱动 -->
    <mvc:annotation-driven/>
    
    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

**步骤5：创建 Controller**

```java
package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    
    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        return "Hello, Spring MVC!";
    }
}
```

**步骤6：运行项目**

```bash
mvn tomcat7:run

# 访问：http://localhost:8080/hello
```

## 💡 学习建议

1. **理解流程** - 深入理解 Spring MVC 的执行流程
2. **动手实践** - 每学完一个知识点，立即编码实践
3. **对比学习** - 对比 Servlet 和 Spring MVC 的区别
4. **前后端分离** - 重点掌握 RESTful 接口开发
5. **循序渐进** - 从简单到复杂，逐步掌握

## 🌟 Spring MVC 核心概念速览

### MVC 设计模式

```
Model（模型） - 数据和业务逻辑
View（视图） - 页面展示
Controller（控制器） - 处理请求，调用 Service
```

**传统 MVC：**
```
浏览器 → Controller → Service → Dao → 数据库
                ↓
              View（JSP）
```

**前后端分离：**
```
浏览器 → Controller → Service → Dao → 数据库
         ↓
       JSON（RESTful API）
```

### Spring MVC 执行流程

```
1. 用户发送请求到 DispatcherServlet
2. DispatcherServlet 调用 HandlerMapping 找到处理器
3. HandlerMapping 返回 HandlerExecutionChain
4. DispatcherServlet 调用 HandlerAdapter 执行处理器
5. Handler 处理请求，返回 ModelAndView
6. DispatcherServlet 调用 ViewResolver 解析视图
7. ViewResolver 返回具体的 View
8. View 渲染响应
9. DispatcherServlet 返回响应给用户
```

### 核心组件

| 组件 | 说明 |
|------|------|
| **DispatcherServlet** | 前端控制器，统一处理请求 |
| **HandlerMapping** | 处理器映射器，找到对应的 Handler |
| **HandlerAdapter** | 处理器适配器，执行 Handler |
| **Handler** | 处理器（Controller） |
| **ViewResolver** | 视图解析器 |
| **View** | 视图（JSP、JSON等） |

### 常用注解

**控制器注解：**
```java
@Controller         // 控制器
@RestController     // RESTful 控制器（= @Controller + @ResponseBody）
@RequestMapping     // 请求映射
@GetMapping        // GET 请求
@PostMapping       // POST 请求
@PutMapping        // PUT 请求
@DeleteMapping     // DELETE 请求
```

**参数注解：**
```java
@RequestParam      // 请求参数
@PathVariable      // 路径变量
@RequestBody       // 请求体
@RequestHeader     // 请求头
@CookieValue       // Cookie
@SessionAttribute  // Session 属性
@ModelAttribute    // 模型属性
```

## 🏗️ Spring MVC 项目结构

```
springmvc-demo/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/example/
        │       ├── controller/      # 控制器
        │       │   └── UserController.java
        │       ├── service/         # 业务层
        │       │   └── UserService.java
        │       ├── dao/             # 数据访问层
        │       │   └── UserDao.java
        │       ├── entity/          # 实体类
        │       │   └── User.java
        │       ├── vo/              # 视图对象
        │       ├── dto/             # 数据传输对象
        │       ├── interceptor/     # 拦截器
        │       └── exception/       # 异常处理
        ├── resources/
        │   └── spring-mvc.xml
        └── webapp/
            ├── WEB-INF/
            │   ├── web.xml
            │   └── views/           # JSP 视图
            └── static/              # 静态资源
                ├── css/
                ├── js/
                └── images/
```

## 📚 Spring MVC vs Servlet

| 特性 | Servlet | Spring MVC |
|------|---------|-----------|
| 开发效率 | 低 | 高 |
| 代码简洁 | 繁琐 | 简洁 |
| 请求映射 | web.xml | @RequestMapping |
| 参数获取 | request.getParameter() | @RequestParam 自动绑定 |
| 响应处理 | response.getWriter() | return 对象自动转换 |
| 拦截器 | Filter | Interceptor |
| 文件上传 | 手动处理 | 自动解析 |

## 📚 推荐资源

### 官方文档
- [Spring MVC 官方文档](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- [Spring Framework 参考文档](https://docs.spring.io/spring-framework/reference/)

### 推荐书籍
- 《Spring MVC 学习指南》
- 《Spring 实战》（第 5 版）

### 在线资源
- [Spring 官方博客](https://spring.io/blog)
- [Spring Guides](https://spring.io/guides)

## ⚠️ 注意事项

1. **版本选择** - 建议使用 Spring 5.x 版本
2. **注解配置** - 优先使用注解配置，减少 XML
3. **前后端分离** - 重点掌握 @RestController 和 JSON
4. **异常处理** - 使用 @ControllerAdvice 统一处理
5. **Spring Boot** - 现代开发推荐使用 Spring Boot

## 🎯 学习路线图

```
第1周：Spring MVC 基础
├─ MVC 设计模式
├─ 执行流程
├─ Controller 开发
└─ 请求映射

第2周：核心技术
├─ 请求处理
├─ 响应处理
├─ 拦截器
└─ 异常处理

第3周：数据处理
├─ 参数绑定
├─ 数据验证
├─ 类型转换
└─ 文件上传

第4周：RESTful 开发
├─ RESTful 规范
├─ @RestController
├─ 统一响应
└─ 接口文档
```

## 🤝 Spring MVC vs Spring Boot

| 特性 | Spring MVC | Spring Boot |
|------|-----------|-------------|
| 配置 | 复杂（XML + Java） | 简单（自动配置） |
| 依赖管理 | 手动管理 | starter 统一管理 |
| 内嵌服务器 | 需要外部 Tomcat | 内置 Tomcat |
| 学习曲线 | 陡峭 | 平缓 |
| 开发效率 | 一般 | 高 |
| 适用场景 | 学习基础 | 企业开发 |

**学习建议：** 学习 Spring MVC 理解原理，使用 Spring Boot 进行开发。

## 📄 版权说明

本教程仅供学习使用，欢迎分享传播。

---

**准备好了吗？让我们开始 Spring MVC 学习之旅！🚀**

**建议从 [第一章：Spring MVC 基础入门](1.SpringMVC基础入门.md) 开始学习**
