---
title: Lambda 表达式
date: 2026-11-19
categories:
  - Android
  - Kotlin
tags:
  - Kotlin
  - Lambda
  - 函数式编程
author: 剑桥折刀
---

# Lambda 表达式

Lambda 是 Kotlin 最"好用又最容易被劝退"的特性。好用的是它能把一大坨匿名类压成一行；劝退的是那堆 `->`、`it`、`return@` 看着像天书。这一篇我们从语法讲到实战，最后把一段真实项目代码逐行拆开。

## 一、Lambda 是什么

一句话：**Lambda 就是一段可以像变量一样传递的代码块**。

### 1.1 基本语法

```kotlin
val sum = { a: Int, b: Int -> a + b }

fun main() {
    println(sum(1, 2))   // 3
}
```

结构非常固定：`{ 参数列表 -> 函数体 }`。大括号包起来；参数和函数体之间用 `->` 分隔；没有参数时 `->` 可以省略；**最后一行表达式的值就是返回值**，不用写 `return`。

### 1.2 it 的省略

当 Lambda **只有一个参数**时，可以省略参数声明，用内置的 `it` 指代：

```kotlin
fun main() {
    val numbers = listOf(1, 2, 3)
    println(numbers.map { it * 2 })      // [2, 4, 6]
    println(numbers.filter { it > 1 })   // [2, 3]
}
```

> **特别注意**
> `it` 只在一个参数时才有。两个及以上参数必须显式命名；嵌套 Lambda 时 `it` 指向最近的一层，很容易搞混。

## 二、Lambda 作为函数参数（高阶函数）

参数类型是"函数"的函数，叫**高阶函数**。函数类型写成 `(参数类型) -> 返回类型`：

```kotlin
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

fun main() {
    println(calculate(3, 4) { x, y -> x + y })   // 7
    println(calculate(3, 4) { x, y -> x * y })   // 12
}
```

注意调用时 Lambda 写在了括号**外面**，这叫**尾随 Lambda**。规则是：最后一个参数是函数类型时，Lambda 可以提到括号外；如果只有一个函数参数，括号还能直接省略：

```kotlin
fun postDelayed(delay: Long, action: () -> Unit) {
    action()
}

fun main() {
    postDelayed(1000) { println("执行了") }
}
```

## 三、逐行读懂一段 JSON 转对象的代码

```kotlin
val saveList = JsonUtil.jsonToList(saveJson) { obj ->
    val student = Student()
    student.name = obj.getString("name")
    student.studentId = obj.getString("studentId")
    student.major = obj.getString("major")
    student
}
```

第一行 `JsonUtil.jsonToList(saveJson) { obj -> ... }`：`JsonUtil` 是一个工具单例，`jsonToList` 负责把 JSON 字符串拆成一个个 JSONObject，但它不知道你的业务类长什么样，所以把"怎么把 JSONObject 变成你的对象"交给你用 Lambda 传进去。

第二行 `{ obj ->`：这就是尾随 Lambda。`obj` 是 `jsonToList` 内部每次循环传进来的一个 `JSONObject`，代表数组里的一条记录。

第三到第五行 `obj.getString(...)`：从 JSON 里按 key 取值，塞进 `Student` 的属性里。这里是 `student.name = ...`，说明 `Student` 的 `name` 是 `var` 的。

最后一行 `student`：这是 Lambda 的**返回值**。Lambda 不需要写 `return`，最后一行表达式自动作为结果返回，再被收集进 `saveList`。

### 3.1 jsonToList 大概长什么样

`jsonToList` 负责"循环 + 收集"，`transform(obj)` 负责"造对象"，职责分得很干净，以后解析别的业务类复用的还是这套逻辑。

> **特别注意**
> 别在 Lambda 里写 `return student`，裸 `return` 会尝试从**外层函数**返回，编译器会报错。想提前返回用标签：`return@jsonToList student`。

## 四、Android 里的 setOnClickListener

```java
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(context, "点击了", Toast.LENGTH_SHORT).show();
    }
});
```

Kotlin 版本：

```kotlin
button.setOnClickListener {
    Toast.makeText(context, "点击了", Toast.LENGTH_SHORT).show()
}
```

从 6 行压到 3 行，背后靠的是 **SAM 转换**：当 Java 接口只有一个抽象方法时，Kotlin 会自动把 Lambda 转成这个接口的匿名实现。Compose 里更彻底，`onClick` 本身就是 `() -> Unit` 类型。

## 五、几个容易踩的坑

**最后一行是返回值。** 下面这段代码里 `println(it)` 的结果是 `Unit`，真正的返回值是 `it * 2`：

```kotlin
fun main() {
    val result = listOf(1, 2, 3).map {
        println(it)
        it * 2        // 这一行才是 map 的结果
    }
}
```

**跳过本次用 `return@`。** 直接写 `return` 会从外层函数返回，`return@forEach` 才是"跳过当前这一轮"：

```kotlin
fun main() {
    listOf(1, 2, 3, 4).forEach {
        if (it == 2) return@forEach
        println(it)   // 输出 1 3 4
    }
}
```

## 六、小结

Lambda 的语法就一句：`{ 参数 -> 最后一行是返回值 }`。单参数可以用 `it`，最后一个函数参数可以提到括号外。看懂它的关键是理解"函数也能当参数传"——`jsonToList` 把转化逻辑交给你，`setOnClickListener` 把点击后的动作交给你。记住 `return@标签` 和"最后一行即返回值"这两个坑，日常开发就够用了。
