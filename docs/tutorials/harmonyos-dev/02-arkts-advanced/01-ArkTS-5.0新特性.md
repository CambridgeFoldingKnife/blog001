---
title: ArkTS 5.0 新特性
date: 2025-01-22
---

# ArkTS 5.0 新特性

> 掌握 HarmonyOS NEXT 的核心开发语言

## 📘 什么是 ArkTS

ArkTS 是 HarmonyOS 应用开发的主力语言，基于 TypeScript 构建，专为 HarmonyOS 优化。

### ArkTS = TypeScript + 扩展

```typescript
TypeScript
└─ 类型系统
└─ ES6+ 特性
    
ArkTS = TypeScript + 
├─ 装饰器系统
├─ 状态管理
├─ 并发增强
└─ 性能优化
```

## 🆕 ArkTS 5.0 核心新特性

### 1. 新增装饰器

**@ObservedV2 和 @Trace**

```typescript
// 旧版本（HarmonyOS 4.0）
@Observed
class Person {
  name: string = ''
  age: number = 0
}

// 新版本（HarmonyOS NEXT）
@ObservedV2
class Person {
  @Trace name: string = ''  // 细粒度监听
  @Trace age: number = 0
  city: string = ''          // 不监听
}
```

**@Local 本地状态**

```typescript
@Entry
@Component
struct HomePage {
  // 本地状态，不会传递给子组件
  @Local counter: number = 0
  
  build() {
    Column() {
      Text(`Count: ${this.counter}`)
      Button('Add')
        .onClick(() => this.counter++)
    }
  }
}
```

### 2. 类型增强

**更严格的类型检查**

```typescript
// ❌ 旧版本可能通过
function greet(name) {  // 隐式 any
  return `Hello ${name}`
}

// ✅ 新版本要求明确类型
function greet(name: string): string {
  return `Hello ${name}`
}
```

**联合类型优化**

```typescript
// 智能类型推断
type Status = 'success' | 'error' | 'pending'

function handle Status(status: Status) {
  if (status === 'success') {
    // TypeScript 知道这里 status 只能是 'success'
    console.log('操作成功')
  }
}
```

### 3. 并发增强

**TaskPool 任务池**

```typescript
import taskpool from '@ohos.taskpool'

// 定义任务
@Concurrent
function heavyCompute(data: number[]): number {
  // 耗时计算
  return data.reduce((sum, num) => sum + num, 0)
}

// 使用任务池
async function processData() {
  const data = Array.from({ length: 10000 }, (_, i) => i)
  
  // 在后台线程执行
  const task = new taskpool.Task(heavyCompute, data)
  const result = await taskpool.execute(task)
  
  console.log('计算结果:', result)
}
```

**Worker 并发**

```typescript
import worker from '@ohos.worker'

// 主线程
const workerInstance = new worker.ThreadWorker('entry/ets/workers/Worker.ets')

workerInstance.postMessage({ type: 'compute', data: [1, 2, 3] })

workerInstance.onmessage = (message) => {
  console.log('Worker 返回:', message.data)
}

// Worker 线程 (Worker.ets)
import worker from '@ohos.worker'

const parentPort = worker.workerPort

parentPort.onmessage = (message) => {
  const { type, data } = message.data
  
  if (type === 'compute') {
    const result = data.reduce((a, b) => a + b)
    parentPort.postMessage({ result })
  }
}
```

### 4. 异步编程增强

**async/await 优化**

```typescript
// 并行执行多个异步操作
async function fetchData() {
  try {
    const [user, orders, products] = await Promise.all([
      fetchUser(),
      fetchOrders(),
      fetchProducts()
    ])
    
    return { user, orders, products }
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}
```

**顶层 await 支持**

```typescript
// 模块级别直接使用 await
const config = await loadConfig()
const db = await connectDatabase(config)

export { db }
```

### 5. 语法糖

**可选链操作符**

```typescript
// 安全访问嵌套属性
const city = user?.address?.city ?? '未知'

// 等价于
const city = user && user.address && user.address.city 
  ? user.address.city 
  : '未知'
```

**空值合并操作符**

```typescript
// 只在 null 或 undefined 时使用默认值
const count = value ?? 0

// 不同于
const count = value || 0  // 0、''、false 都会使用默认值
```

**数值分隔符**

```typescript
// 提高大数字可读性
const million = 1_000_000
const bytes = 0xFF_FF_FF
const price = 99_99.99
```

## 🎯 装饰器系统详解

### 组件装饰器

```typescript
// @Component - 定义组件
@Component
struct CustomButton {
  @Prop text: string = ''
  @Prop onClick: () => void
  
  build() {
    Button(this.text)
      .onClick(this.onClick)
  }
}

// @Entry - 入口组件
@Entry
@Component
struct Index {
  build() {
    Column() {
      CustomButton({ 
        text: '点击我',
        onClick: () => console.log('clicked')
      })
    }
  }
}
```

### 状态装饰器

```typescript
@Entry
@Component
struct StatePage {
  // @State - 组件内部状态
  @State message: string = 'Hello'
  
  // @Prop - 父组件传入的只读属性
  @Prop title: string
  
  // @Link - 双向绑定
  @Link isVisible: boolean
  
  // @Provide/@Consume - 跨组件状态共享
  @Provide('theme') theme: string = 'light'
  
  // @Watch - 监听状态变化
  @State @Watch('onCountChange') count: number = 0
  
  onCountChange() {
    console.log('Count 变化:', this.count)
  }
  
  build() {
    Column() {
      Text(this.message)
      Button(`Count: ${this.count}`)
        .onClick(() => this.count++)
    }
  }
}
```

### 自定义装饰器

```typescript
// 定义装饰器
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  
  descriptor.value = function (...args: any[]) {
    console.log(`调用方法: ${propertyKey}`, args)
    const result = originalMethod.apply(this, args)
    console.log(`返回结果:`, result)
    return result
  }
  
  return descriptor
}

// 使用装饰器
class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b
  }
}
```

## 💾 内存管理

### 垃圾回收优化

```typescript
// ✅ 好的实践
@Entry
@Component
struct GoodPractice {
  @State largeArray: number[] = []
  
  aboutToDisappear() {
    // 组件销毁时清理大对象
    this.largeArray = []
  }
}

// ❌ 避免内存泄漏
let timer: number

@Entry
@Component
struct BadPractice {
  aboutToAppear() {
    // 忘记清理定时器
    timer = setInterval(() => {
      console.log('tick')
    }, 1000)
  }
}
```

### 对象池模式

```typescript
// 复用对象减少 GC 压力
class ObjectPool<T> {
  private pool: T[] = []
  private factory: () => T
  
  constructor(factory: () => T, initialSize: number = 10) {
    this.factory = factory
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory())
    }
  }
  
  acquire(): T {
    return this.pool.pop() || this.factory()
  }
  
  release(obj: T): void {
    this.pool.push(obj)
  }
}
```

## 🚀 性能优化技巧

### 1. 使用 const/let 而非 var

```typescript
// ✅ 推荐
const MAX_SIZE = 100
let count = 0

// ❌ 避免
var size = 100  // 函数作用域，容易出错
```

### 2. 解构赋值

```typescript
// ✅ 高效
const { name, age } = user
const [first, second] = array

// ❌ 低效
const name = user.name
const age = user.age
```

### 3. 模板字符串

```typescript
// ✅ 可读性好
const message = `Hello ${name}, you are ${age} years old`

// ❌ 繁琐
const message = 'Hello ' + name + ', you are ' + age + ' years old'
```

### 4. 箭头函数

```typescript
// ✅ 简洁且不绑定 this
const double = (x: number) => x * 2

// 等价于
function double(x: number): number {
  return x * 2
}
```

## 📦 模块化

### ES6 模块

```typescript
// utils.ts - 导出
export function formatDate(date: Date): string {
  return date.toISOString()
}

export class Logger {
  log(message: string) {
    console.log(message)
  }
}

export default class Config {
  // 默认导出
}

// main.ts - 导入
import Config, { formatDate, Logger } from './utils'

const config = new Config()
const logger = new Logger()
logger.log(formatDate(new Date()))
```

### 动态导入

```typescript
// 按需加载模块
async function loadModule() {
  if (needFeature) {
    const module = await import('./feature')
    module.default.init()
  }
}
```

## 🎓 最佳实践

### 1. 类型优先

```typescript
// ✅ 明确类型
interface User {
  id: number
  name: string
  email: string
}

function getUser(id: number): User {
  // 实现
}

// ❌ 避免 any
function getUser(id: any): any {
  // 失去类型检查
}
```

### 2. 不可变数据

```typescript
// ✅ 使用展开运算符
const newArray = [...oldArray, newItem]
const newObject = { ...oldObject, key: newValue }

// ❌ 直接修改
oldArray.push(newItem)
oldObject.key = newValue
```

### 3. 错误处理

```typescript
// ✅ 完整的错误处理
async function fetchData() {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('获取数据失败:', error)
    throw error  // 向上传递错误
  }
}
```

## 📚 参考资源

- [ArkTS 语言基础](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-get-started-0000001820999613-V5)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)

---

**下一节** → [TypeScript 高级特性](02-TypeScript高级特性.md)
