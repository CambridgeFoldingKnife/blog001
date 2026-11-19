---
title: 数据类 data class
date: 2026-11-19
categories:
  - Android
  - Kotlin
tags:
  - Kotlin
  - 数据类
  - 面向对象
author: 剑桥折刀
---

# 数据类 data class

如果你问我 Kotlin 里哪个特性在 Android 开发中用得最多，我会毫不犹豫地说：`data class`。接口返回的数据、列表里的每一项、页面的状态，几乎全靠它来承载。

## 一、为什么需要 data class

Android 开发大部分时间在处理数据：网络请求返回的 JSON、数据库查出来的记录、列表的每一项。这些对象的核心诉求是：能方便地比较内容是否相同、能打印出可读的日志、能复制一份改几个字段。

普通类默认只继承 `Object` 的实现：`==` 比的是引用地址，`toString()` 输出的是 `Order@1b6d3586` 这种看不懂的东西。要让它好用，你就得手写 `equals`、`hashCode`、`toString`——又长又容易写错。

`data class` 就是来解决这个问题的：**你只声明属性，方法全自动生成**。

## 二、定义规则

只需要在 `class` 前面加一个 `data`：

```kotlin
data class Order(
    val id: String,
    val amount: Double,
    val status: String
)
```

看起来像普通类，但编译器会额外生成一堆方法。它有四条硬性规则：

1. 主构造函数至少要有**一个参数**；
2. 主构造的所有参数必须用 `val` 或 `var` 标记；
3. 不能是 `abstract`、`open`、`sealed` 或 `inner`；
4. 只有**主构造里的属性**会参与生成方法，写在类体里的属性不算。

```kotlin
// 正确
data class User(val name: String, val age: Int)
```

注意：主构造没有参数、参数没写 `val` / `var`、或者给 `data class` 加 `open`，都会编译失败。

## 三、自动生成的方法

一个 `data class` 会自动生成五个东西：`equals()`、`hashCode()`、`toString()`、`copy()`、`componentN()`。我们重点看前三个。

```kotlin
data class User(val name: String, val age: Int)

fun main() {
    val a = User("剑桥折刀", 18)
    val b = User("剑桥折刀", 18)
    val c = User("小明", 20)

    println(a == b)                       // true，比较的是内容
    println(a.hashCode() == b.hashCode()) // true
    println(a)                            // User(name=剑桥折刀, age=18)
    println(a == c)                       // false
}
```

### 3.1 和普通 class 对比

```kotlin
class UserNormal(val name: String, val age: Int)
data class UserData(val name: String, val age: Int)

fun main() {
    println(UserNormal("剑桥折刀", 18) == UserNormal("剑桥折刀", 18))  // false
    println(UserData("剑桥折刀", 18) == UserData("剑桥折刀", 18))      // true

    println(UserNormal("剑桥折刀", 18))  // UserNormal@1b6d3586
    println(UserData("剑桥折刀", 18))    // UserData(name=剑桥折刀, age=18)
}
```

## 四、copy：改一个字段，其余不变

`copy()` 会创建一个新对象，只覆盖你指定的字段：

```kotlin
data class Order(val id: String, val amount: Double, val status: String)

fun main() {
    val pending = Order("A001", 99.0, "待支付")
    val paid = pending.copy(status = "已支付")

    println(pending)          // Order(id=A001, amount=99.0, status=待支付)
    println(paid)             // Order(id=A001, amount=99.0, status=已支付)
    println(pending === paid) // false，是两个不同对象
}
```

这在 Compose 和 `StateFlow` 里特别有用：数据对象保持不可变，状态更新靠"复制一份新的"。

```kotlin
var order by mutableStateOf(Order("A001", 99.0, "待支付"))
order = order.copy(status = "已支付")   // 触发界面刷新
```

## 五、解构声明

`data class` 会按主构造参数顺序生成 `component1()`、`component2()`……，所以可以直接解构：

```kotlin
data class User(val name: String, val age: Int, val city: String)

fun main() {
    val user = User("剑桥折刀", 18, "杭州")

    val (name, age, city) = user
    println("$name / $age / $city")   // 剑桥折刀 / 18 / 杭州

    val (_, ageOnly, _) = user        // 用下划线占位，只要年龄
    println(ageOnly)                  // 18
}
```

> **特别注意**
> 解构的顺序严格按**主构造参数顺序**，跟属性名无关。如果两个字段类型都是 `String`，解构写反了编译器不会报错，但逻辑就错了。

## 六、data class 的实战场景

```kotlin
// 接口返回的数据模型
data class QuestionItem(
    val id: Int,
    val title: String,
    val options: List<String>,
    val answer: String
)
```

配合 JSON 解析库，一行就能把接口数据映射成对象，`toString()` 还能直接打日志；用 `copy()` 更新状态，用 `==` 判断要不要刷新，代码干净得多。

## 七、小结

`data class` 的四步走：加 `data`、主构造至少一个参数、参数都加 `val` / `var`、不要加 `open` 之类的修饰符。它会自动生成 `equals`、`hashCode`、`toString`、`copy` 和 `componentN`。记住它只对主构造属性生效，类体里的属性不参与。写数据模型时优先用它，能省掉大量样板代码。
