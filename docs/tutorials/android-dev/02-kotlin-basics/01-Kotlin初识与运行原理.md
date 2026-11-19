---
title: Kotlin 初识与运行原理
date: 2026-11-19
categories:
  - Android
  - Kotlin
tags:
  - Kotlin
  - Android
  - JVM
author: 剑桥折刀
---

# Kotlin 初识与运行原理

在正式敲第一行 Kotlin 代码之前，我们先把几个最基本的问题说清楚：它是什么、为什么 Android 要用它、它跑在哪里、环境怎么配。这几件事想明白了，后面学语法就不会一脸懵。

## 一、Kotlin 是什么

### 1.1 一句话认识 Kotlin

Kotlin 是 JetBrains 在 2011 年推出的一门静态类型编程语言，它最大的特点是"兼容 Java 生态，但写起来更省事"。2017 年 Google I/O 大会上，Kotlin 被宣布为 Android 官方支持语言；2019 年 Google 进一步提出 Kotlin First，新项目默认就用 Kotlin。

<img src="/images/android-dev/git-token_00-Kotlin初识-1.png" alt="Kotlin 官方介绍与语言定位" style="zoom:50%;" />

所以你现在打开 Android Studio 新建项目，语言选项里默认就是 Kotlin，这不是潮流，是官方推荐路线。

### 1.2 它和 Java 是什么关系

很多同学担心"学 Kotlin 是不是 Java 就白学了"，完全不用担心。Kotlin 编译之后生成的是 JVM 字节码，和 Java 编译出来的东西是同一类东西，运行时跑在同一个 JVM 上。

也就是说：

- Kotlin 可以直接调用 Java 的类库，Java 也能调用 Kotlin 写的代码，100% 互操作；
- 同一个项目里 Kotlin 文件和 Java 文件可以混着放，互不打架；
- 你之前学的 Java 集合、线程、IO，在 Kotlin 里全都还能用。

### 1.3 三个让人愿意用它的理由

**第一，和 Java 100% 互操作。** 老项目可以一个文件一个文件地迁移，不需要推倒重来。

**第二，空安全。** Java 里最常见的线上崩溃就是 `NullPointerException`。Kotlin 在类型系统层面就把"可能为空"标出来了，`String` 和 `String?` 是两个类型，很多空指针在编译期就被拦住了。

**第三，语法简洁。** 同样一个数据类，Java 要写字段、构造函数、getter、setter、equals、hashCode、toString，几十行；Kotlin 一行就够：

```kotlin
data class User(val name: String, val age: Int)
```

## 二、Kotlin 代码到底跑在哪里

### 2.1 编译到 JVM 字节码

整个流程是这样的：

```Bash
User.kt  --(kotlinc 编译器)-->  User.class  --(JVM)-->  运行
```

`.class` 文件就是 JVM 字节码。正因为如此，Kotlin 不只可以写 Android，还能写后端（Spring Boot 官方支持）、写桌面程序（Compose Desktop）、写脚本，甚至编译到 JavaScript 和 Native。

### 2.2 学习阶段不需要真机和模拟器

> **特别注意**
> 基础语法这一章的所有代码，都不需要真机和模拟器。因为 Kotlin 跑在 JVM 上，你只要有一个能执行 `main` 函数的环境就够了。

最省事的方式有三种：

1. 在 Android Studio 里新建一个 Kotlin 文件，写好 `main` 函数，点左边的绿色三角形直接运行；
2. 用 Android Studio 的 Scratch File（`Ctrl + Alt + Shift + N`），临时写代码测试；
3. 打开浏览器用 Kotlin Playground，一行环境都不用装。

### 2.3 最小的可运行程序

Kotlin 程序的入口就是一个 `main` 函数，没有类、没有 `public static void`：

```kotlin
fun main() {
    println("Hello Kotlin")
}
```

`fun` 是声明函数的关键字，`println` 会打印一行并自动换行。就这么多，没有别的仪式感。

## 三、把环境配置好

### 3.1 安装 Android Studio

去 Android 开发者官网下载最新稳定版 Android Studio，安装过程基本一路 Next。首次启动时它会引导你下载 SDK，这一步建议保持网络通畅，不然会很慢。

<img src="/images/android-dev/git-token_00-Kotlin初识-3.png" alt="Android Studio 安装与 SDK 配置界面" style="zoom:50%;" />

安装完成后注意两点：

- Android Studio 自带 Kotlin 插件，不需要你单独装；
- 新建项目时语言选择 Kotlin 即可，Gradle 会自动引入 Kotlin 标准库。

### 3.2 新建一个 Kotlin 项目

打开 Android Studio，依次点击 `New Project` → 选择 `Empty Activity` → 在语言（Language）一栏确认是 `Kotlin` → 点 `Finish`。

<img src="/images/android-dev/git-token_00-Kotlin初识-2.png" alt="新建 Android 项目时选择 Kotlin 语言" style="zoom:50%;" />

项目创建完成后，Gradle 会自动同步依赖。第一次同步会比较久，耐心等进度条走完。

### 3.3 跑通第一个 Hello World

项目打开后，找到 `app/src/main/java/你的包名/MainActivity.kt`，直接点右上角的绿色运行按钮。如果暂时没有配置模拟器，也可以先只验证语法：在任意 Kotlin 文件里写一个 `main` 函数，点函数左侧的绿色三角运行。

```kotlin
fun main() {
    val name = "剑桥折刀"
    println("Hello, $name")
}
```

> **常见错误**
> 1. Gradle 下载卡住：检查网络，或者给 Gradle 配置国内镜像；
> 2. 报 JDK 版本不匹配：在 `Settings → Build Tools → Gradle` 里把 Gradle JDK 换成 Android Studio 自带的 JDK；
> 3. 改了 `build.gradle.kts` 没生效：点一下 `Sync Now`，不要直接运行。

## 四、这一章你该带走什么

记住三句话就够了：Kotlin 编译成 JVM 字节码，和 Java 同宗同源；它跟 Java 可以互相调用，老代码不用重写；语法更短、更安全，所以 Android 官方首选它。接下来我们就进项目，看看一个真实的 `MainActivity.kt` 长什么样。
