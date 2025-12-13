---
title: Servlet 教程
---

# Servlet 教程

> 从零开始掌握 Servlet，理解 Java Web 开发基础

## 📚 教程简介

本教程将带你系统学习 Servlet 技术，从基础概念到实战应用。虽然现代企业开发主要使用 Spring Boot，但 Servlet 作为 Java Web 的基石，理解其原理对深入掌握框架至关重要。

## 🎯 学习目标

- ✅ 理解 Servlet 的工作原理
- ✅ 掌握 Servlet 生命周期
- ✅ 熟练处理 HTTP 请求和响应
- ✅ 掌握 Session 和 Cookie 机制
- ✅ 了解 JSP 技术
- ✅ 理解过滤器和监听器
- ✅ 应对常见的 Servlet 面试题

## 📖 教程目录

### [第一章：Servlet 基础入门](1.Servlet基础入门.md)
- Servlet 是什么？
- Servlet 体系结构
- 创建第一个 Servlet
- Servlet 生命周期
- web.xml 配置
- 注解配置（Servlet 3.0+）

### [第二章：Servlet 核心技术](2.Servlet核心技术.md)
- HttpServletRequest 详解
- HttpServletResponse 详解
- 请求转发 vs 重定向
- 中文乱码问题
- 文件上传下载
- 过滤器（Filter）
- 监听器（Listener）

### [第三章：JSP 技术](3.JSP技术.md)
- JSP 基础语法
- JSP 内置对象
- EL 表达式
- JSTL 标签库
- JSP 与 Servlet 的关系

### [第四章：Session 和 Cookie](4.Session和Cookie.md)
- HTTP 无状态协议
- Cookie 机制详解
- Session 机制详解
- Session 与 Cookie 的区别
- 分布式 Session 解决方案

### [第五章：Servlet 面试题集](5.Servlet面试题集.md)
- Servlet 基础面试题
- 生命周期面试题
- Session 和 Cookie 面试题
- 过滤器和监听器面试题
- 高频面试题解析

## 🚀 快速开始

### 环境准备

**前置要求：**
- JDK 8 或更高版本
- Tomcat 8.5 或更高版本
- Maven 3.5+
- IDE（推荐 IntelliJ IDEA）

### 创建第一个 Servlet 项目

**步骤1：创建 Maven Web 项目**

```bash
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=servlet-demo \
  -DarchetypeArtifactId=maven-archetype-webapp \
  -DinteractiveMode=false
```

**步骤2：添加依赖**

```xml
<dependencies>
    <!-- Servlet API -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

**步骤3：创建 Servlet**

```java
package com.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        
        out.println("<html>");
        out.println("<head><title>Hello Servlet</title></head>");
        out.println("<body>");
        out.println("<h1>Hello, Servlet!</h1>");
        out.println("</body>");
        out.println("</html>");
    }
}
```

**步骤4：部署运行**

```bash
# 使用 Tomcat Maven 插件
mvn tomcat7:run

# 访问
http://localhost:8080/servlet-demo/hello
```

## 💡 学习建议

1. **理解原理** - 深入理解 Servlet 的工作机制
2. **动手实践** - 每个知识点都要编码实践
3. **对比学习** - 对比 Servlet 和 Spring MVC
4. **掌握基础** - Servlet 是 Java Web 的基石
5. **循序渐进** - 从简单到复杂，逐步掌握

## 🌟 Servlet 核心概念速览

### Servlet 是什么？

**Servlet** 是运行在服务器端的 Java 程序，用于处理客户端请求并生成响应。

```
浏览器 → HTTP请求 → Tomcat → Servlet → 处理请求 → 生成响应 → 浏览器
```

### Servlet 生命周期

```
1. 加载类：Tomcat 启动时或首次访问时
2. 实例化：调用构造器
3. 初始化：调用 init() 方法
4. 服务：每次请求调用 service() 方法
5. 销毁：Tomcat 关闭时调用 destroy() 方法
```

**生命周期方法：**
```java
public class MyServlet extends HttpServlet {
    
    public MyServlet() {
        System.out.println("1. 构造器");
    }
    
    @Override
    public void init() throws ServletException {
        System.out.println("2. 初始化");
    }
    
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        System.out.println("3. 处理请求");
        super.service(req, resp);
    }
    
    @Override
    public void destroy() {
        System.out.println("4. 销毁");
    }
}
```

### HTTP 方法

| 方法 | 说明 | Servlet 方法 |
|------|------|-------------|
| GET | 获取资源 | doGet() |
| POST | 提交数据 | doPost() |
| PUT | 更新资源 | doPut() |
| DELETE | 删除资源 | doDelete() |
| HEAD | 获取响应头 | doHead() |
| OPTIONS | 获取服务器支持的方法 | doOptions() |

### 请求转发 vs 重定向

**请求转发（Forward）：**
```java
request.getRequestDispatcher("/target.jsp").forward(request, response);
```
- 服务器内部跳转
- 浏览器地址不变
- 只有一次请求
- 可以共享 request 数据

**重定向（Redirect）：**
```java
response.sendRedirect("/servlet-demo/target.jsp");
```
- 浏览器重新发起请求
- 浏览器地址改变
- 两次请求
- 不能共享 request 数据

## 🏗️ Servlet 项目结构

```
servlet-demo/
├── pom.xml
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/
│       │       ├── servlet/
│       │       │   ├── HelloServlet.java
│       │       │   └── UserServlet.java
│       │       ├── filter/
│       │       │   └── EncodingFilter.java
│       │       └── listener/
│       │           └── OnlineCountListener.java
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml
│           │   └── lib/
│           ├── index.jsp
│           └── css/
└── target/
```

## 📚 Servlet 体系结构

```
javax.servlet
├── Servlet (接口)
│   └── GenericServlet (抽象类)
│       └── HttpServlet (抽象类) ← 通常继承这个
│
├── ServletRequest (接口)
│   └── HttpServletRequest (接口)
│
├── ServletResponse (接口)
│   └── HttpServletResponse (接口)
│
├── Filter (接口)
├── FilterChain (接口)
├── ServletContext (接口)
└── ServletConfig (接口)
```

## 🔧 Servlet 三大组件

### 1. Servlet

**作用：** 处理请求，生成响应

```java
@WebServlet("/user")
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // 处理 GET 请求
    }
}
```

### 2. Filter（过滤器）

**作用：** 请求前后的拦截处理

```java
@WebFilter("/*")
public class EncodingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                         FilterChain chain) throws IOException, ServletException {
        // 前置处理
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        // 放行
        chain.doFilter(request, response);
        
        // 后置处理
    }
}
```

### 3. Listener（监听器）

**作用：** 监听应用、会话、请求的生命周期事件

```java
@WebListener
public class OnlineCountListener implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        // 会话创建时
        System.out.println("用户上线");
    }
    
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        // 会话销毁时
        System.out.println("用户下线");
    }
}
```

## 📚 推荐资源

### 官方文档
- [Servlet 规范](https://jakarta.ee/specifications/servlet/)
- [Tomcat 文档](https://tomcat.apache.org/tomcat-9.0-doc/)

### 推荐书籍
- 《Head First Servlets and JSP》
- 《深入分析 Java Web 技术内幕》

## ⚠️ 注意事项

1. **Servlet 不是线程安全的** - 避免使用成员变量
2. **及时关闭资源** - 使用 try-with-resources
3. **处理中文乱码** - 设置正确的编码
4. **scope="provided"** - Servlet API 由容器提供
5. **了解即可** - 现代开发主要使用 Spring MVC/Boot

## 🎯 学习路线图

```
第1周：Servlet 基础
├─ Servlet 概念
├─ 生命周期
├─ 请求响应处理
└─ 配置方式

第2周：核心技术
├─ Request/Response API
├─ 请求转发与重定向
├─ 文件上传下载
└─ Filter 和 Listener

第3周：JSP 技术
├─ JSP 基础语法
├─ 内置对象
├─ EL 和 JSTL
└─ JSP 与 Servlet 协作

第4周：会话管理
├─ Cookie 机制
├─ Session 机制
├─ 会话跟踪
└─ 安全性
```

## 🤝 Servlet vs Spring MVC

| 特性 | Servlet | Spring MVC |
|------|---------|-----------|
| 开发效率 | 低 | 高 |
| 代码简洁 | 繁琐 | 简洁 |
| 配置 | 复杂 | 简单 |
| 功能 | 基础 | 强大 |
| 学习成本 | 低 | 中 |
| 使用场景 | 学习基础 | 企业开发 |

**学习建议：** 学习 Servlet 理解原理，使用 Spring MVC 进行开发。

## 📄 版权说明

本教程仅供学习使用，欢迎分享传播。

---

**准备好了吗？让我们开始 Servlet 学习之旅！🚀**

**建议从 [第一章：Servlet 基础入门](1.Servlet基础入门.md) 开始学习**
