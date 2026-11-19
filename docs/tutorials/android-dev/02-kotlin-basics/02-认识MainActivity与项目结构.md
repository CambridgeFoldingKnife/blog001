---
title: 认识 MainActivity 与项目结构
date: 2026-11-19
categories:
  - Android
  - Kotlin
tags:
  - Kotlin
  - Android
  - Jetpack Compose
author: 剑桥折刀
---

# 认识 MainActivity 与项目结构

新建完项目，很多同学第一反应是——这堆代码我一个都不认识。别慌，这一篇我们就只干一件事：把 `MainActivity.kt` 从头到尾读一遍，顺便搞懂项目里几个关键文件是干嘛的。

## 一、新建项目之后，MainActivity.kt 长什么样

### 1.1 先看完整代码

用 `Empty Activity` 模板新建项目，`MainActivity.kt` 默认长这样（省略了部分 import）：

```kotlin
package com.example.myapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
// 其余 import 省略：Compose 布局、Material3、主题等

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyApplicationTheme {
        Greeting("Android")
    }
}
```

<img src="/images/android-dev/02-kotlin基础语法_01-代码知识点-1.png" alt="MainActivity.kt 默认代码结构" style="zoom:50%;" />

### 1.2 setContent 是界面入口

在老项目里，界面的入口是 `setContentView(R.layout.activity_main)`，指向一个 XML 布局文件。而现在用 Jetpack Compose，界面是用 Kotlin 代码直接画出来的，入口变成了：

```kotlin
setContent {
    // 这里写的就是界面
}
```

`setContent` 的大括号里放的是 `@Composable` 函数。你可以把它理解成"把这一坨界面描述挂到 Activity 上"。`@Composable` 就是一个标记注解，告诉编译器：这个函数是用来描述界面的，不是普通函数。

`Scaffold` 是 Material 3 提供的基础脚手架，帮你把状态栏、导航栏、内容区的间距处理好；它回传的 `innerPadding` 就是系统栏占掉的高度，所以我们要 `Modifier.padding(innerPadding)` 把内容让出来。

### 1.3 包名和 Manifest 是干嘛的

第一行 `package com.example.myapplication` 是包名。它有两个作用：

- 组织代码，Kotlin 文件所在的目录要和包名对应（`src/main/java/com/example/myapplication/`）；
- 作为 App 的唯一标识，上架应用商店时不能和别的 App 重复。

而 `app/src/main/AndroidManifest.xml` 是整个 App 的"户口本"，负责登记：

- 有哪些 Activity、哪个是启动页（`android.intent.action.MAIN`）；
- 申请了哪些权限（网络、相册、定位）；
- 应用的图标、名称、主题。

> **特别注意**
> 新建 Activity 后如果在 Manifest 里没登记，运行时会直接崩溃，报 `ActivityNotFoundException`。这不是代码写错了，是"户口"没上。

### 1.4 项目目录速览

| 目录 | 作用 |
| --- | --- |
| `app/src/main/java` | 放 Kotlin / Java 源码 |
| `app/src/main/res` | 放图片、字符串、颜色、主题等资源 |
| `app/src/main/AndroidManifest.xml` | 应用清单，登记组件和权限 |
| `app/build.gradle.kts` | 模块级构建脚本，声明依赖和编译配置 |
| `gradle/libs.versions.toml` | 依赖版本统一管理（版本目录） |

## 二、一个特别实用的小经验：Padding 的内外边距

笔记里只剩下一句话，但这句话特别值钱：

> **Padding 在前面就是外边距，在后面就是内边距。**

在 Compose 里，`Modifier` 是链式调用，**顺序不同，效果完全不同**。同样是 `padding(16.dp)`，写在 `background()` 前面还是后面，视觉上就是两种东西。

```kotlin
@Composable
fun PaddingDemo() {
    Row {
        // padding 在前 = 外边距：红色背景不会覆盖外面那 16dp
        Box(
            Modifier
                .padding(16.dp)
                .background(Color.Red)
                .size(80.dp)
        )

        // padding 在后 = 内边距：红色背景铺满，内容往里缩 16dp
        Box(
            Modifier
                .background(Color.Red)
                .padding(16.dp)
                .size(80.dp)
        )
    }
}
```

我们可以这样理解：`Modifier` 是从左往右一层层"套"上去的。先写 `padding`，它就在最外层，相当于给整个元素外面留白；先写 `background`，背景就先铺上去，后面的 `padding` 只能在背景内部往里缩。

> **常见错误**
> 给按钮加背景色后发现背景没有铺满，或者内容贴边了，十有八九是 `padding` 和 `background` 的顺序写反了。改顺序比重写布局快得多。

## 三、小结

`MainActivity.kt` 其实就三件事：继承 `ComponentActivity`、在 `onCreate` 里调用 `setContent`、用 `@Composable` 函数描述界面。包名决定代码位置和 App 身份，Manifest 负责登记组件和权限。至于 `Padding` 的位置技巧，记住那句口诀就行——前面外边距，后面内边距。
