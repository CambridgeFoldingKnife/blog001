---
title: object 关键字与单例
date: 2026-11-19
categories:
  - Android
  - Kotlin
tags:
  - Kotlin
  - 单例
  - 设计模式
author: 剑桥折刀
---

# object 关键字与单例

整个 App 只需要一个实例的类，比如网络客户端、登录管理器，在 Kotlin 里用 `object` 一行就能搞定。Java 里要写一大段的双重检查锁，在 Kotlin 这里直接被语言特性抹平了。

## 一、为什么需要单例

App 里有些对象，全局只需要、也只应该有一个：

- **网络客户端 HttpClient**：内部维护连接池、Cookie、拦截器，创建多个既浪费内存，又会导致状态不一致；
- **登录管理器 AuthManager**：当前登录用户、token 只有一个，多个实例意味着某处"退出了"另一处还认为"登录着"。

## 二、Kotlin 的 object 单例

### 2.1 定义与使用

Kotlin 用 `object` 关键字直接声明单例，不需要私有构造、不需要 `getInstance()`：

```kotlin
object HttpClient {
    private const val BASE_URL = "https://api.example.com"

    fun get(path: String): String {
        println("GET $BASE_URL$path")
        return """{"code":0}"""
    }
}

fun main() {
    // 不需要创建实例，直接 类名.方法名
    HttpClient.get("/questions")
}
```

<img src="/images/android-dev/02-kotlin基础语法_10-object关键字-单例-1.png" alt="Kotlin object 关键字定义单例" style="zoom:50%;" />

它有三个特点，正好对应笔记里的三句话：以 `object` 关键字开头；全局 App 共用一个实例；使用时不需要实例化，直接 `类名.方法名`。

### 2.2 项目里的两个单例

```kotlin
object AuthManager {
    private var token: String? = null

    fun login(newToken: String) {
        token = newToken
    }

    fun logout() {
        token = null
    }

    fun isLoggedIn(): Boolean = token != null
}

fun main() {
    AuthManager.login("abc123")
    println(AuthManager.isLoggedIn())   // true
    AuthManager.logout()
    println(AuthManager.isLoggedIn())   // false
}
```

`HttpClient` 管网络、`AuthManager` 管登录态，两者都是"全局唯一"的典型代表，非常适合做成单例。

## 三、和 Java 单例对比

### 3.1 饿汉式

```java
public class HttpClient {
    private static final HttpClient INSTANCE = new HttpClient();

    private HttpClient() {}

    public static HttpClient getInstance() {
        return INSTANCE;
    }
}
```

类加载时就创建好实例，简单，但不论用不用都会初始化。

### 3.2 懒加载 + 双重检查锁

```java
public class AuthManager {
    private static volatile AuthManager instance;

    private AuthManager() {}

    public static AuthManager getInstance() {
        if (instance == null) {
            synchronized (AuthManager.class) {
                if (instance == null) {
                    instance = new AuthManager();
                }
            }
        }
        return instance;
    }
}
```

要处理线程安全、要加 `volatile` 防指令重排，稍不留神就写错。而 Kotlin 里只要 `object AuthManager` 一行，编译器在字节码层面帮你做了"私有构造 + 静态 INSTANCE 字段 + 类加载时初始化"。

| 对比项 | Java 饿汉式 | Java 双重检查锁 | Kotlin object |
| --- | --- | --- | --- |
| 线程安全 | 是 | 是（写对才行） | 是，JVM 保证 |
| 延迟初始化 | 否 | 是 | 首次访问时 |

## 四、线程安全与"懒加载"的真相

`object` 的实例初始化代码会被编译器放进类的 `<clinit>`（静态初始化块），由 **JVM 的类加载机制**保证只执行一次、且线程安全，所以你完全不需要自己加锁。

> **特别注意**
> `object` 保证的是"实例创建"线程安全，**不保证成员变量的读写安全**。多个线程同时 `Counter.count++` 一样会出问题。要共享可变状态，请用 `AtomicInteger`、`synchronized` 或者 `Mutex`。

严格来说，`object` 是"首次访问时初始化"：类第一次被真正用到（调用任意成员）时，JVM 才执行 `<clinit>`。所以它比饿汉式更晚创建，但不是严格意义的按需懒加载——碰了类里任何一个成员，整个对象就初始化了。如果初始化逻辑很重，希望"真正用到某个字段时才算"，可以用 `by lazy`：

```kotlin
object AppConfig {
    val apiKey: String by lazy { "key-from-local" }
}
```

## 五、什么时候不该用单例

单例是全局状态，滥用会带来麻烦：需要多实例时（比如不同 `baseUrl` 的 API 客户端）不合适；`object` 没有构造函数，需要传构造参数时很别扭；单元测试时无法注入 mock、替换实例。

这几种情况，更好的做法是把类写成普通类，在 `Application` 或依赖注入容器（Hilt）里创建一次再分发。

> **常见错误**
> 在 `object` 里持有 `Activity` 或 `Context` 引用。单例的生命周期和 App 一样长，持有 Activity 会导致它无法回收，直接内存泄漏。需要 Context 请用 `applicationContext`。

## 六、小结

`object` 是 Kotlin 送给我们的"开箱即用单例"：定义简单、线程安全、直接类名调用。`HttpClient`、`AuthManager` 这类全局唯一的服务对象最适合它。但记住两点：单例内部的**可变成员**依然要自己做线程安全；不需要全局唯一的东西，别硬做成单例。
