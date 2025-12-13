---
title: TypeScript 高级特性
date: 2025-01-22
---

# TypeScript 高级特性

> 深入掌握 TypeScript 类型系统

## 🎯 高级类型

### 1. 联合类型（Union Types）

```typescript
// 基础联合类型
type Status = 'success' | 'error' | 'pending'

function handleStatus(status: Status) {
  if (status === 'success') {
    console.log('成功')
  } else if (status === 'error') {
    console.log('错误')
  }
}

// 联合类型与类型守卫
type User = {
  type: 'user'
  name: string
  age: number
}

type Admin = {
  type: 'admin'
  name: string
  permissions: string[]
}

type Person = User | Admin

function getPerson(person: Person) {
  // 类型守卫
  if (person.type === 'user') {
    console.log(person.age)  // TypeScript 知道这里是 User
  } else {
    console.log(person.permissions)  // 这里是 Admin
  }
}
```

### 2. 交叉类型（Intersection Types）

```typescript
// 组合多个类型
interface Colorful {
  color: string
}

interface Circle {
  radius: number
}

type ColorfulCircle = Colorful & Circle

const cc: ColorfulCircle = {
  color: 'red',
  radius: 10
}

// 实用示例：Mixin 模式
interface Timestamped {
  timestamp: number
}

interface Tagged {
  tags: string[]
}

type Entity<T> = T & Timestamped & Tagged

const article: Entity<{ title: string; content: string }> = {
  title: '标题',
  content: '内容',
  timestamp: Date.now(),
  tags: ['tech', 'tutorial']
}
```

### 3. 类型别名 vs 接口

```typescript
// 类型别名 - 更灵活
type Point = {
  x: number
  y: number
}

type ID = string | number

type Shape = Circle | Rectangle

// 接口 - 可扩展
interface User {
  name: string
  age: number
}

// 接口可以扩展
interface Employee extends User {
  employeeId: string
}

// 接口可以合并
interface User {
  email: string  // 自动合并到 User
}

// ✅ 推荐使用场景
// 对象类型 → 优先使用 interface
interface Product {
  id: number
  name: string
}

// 联合、交叉、工具类型 → 使用 type
type Status = 'active' | 'inactive'
type Nullable<T> = T | null
```

## 🔧 泛型编程

### 1. 基础泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

const num = identity<number>(42)
const str = identity<string>('hello')
const auto = identity(true)  // 自动推导为 boolean

// 泛型数组
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

const first = getFirst([1, 2, 3])  // number
const firstStr = getFirst(['a', 'b'])  // string
```

### 2. 泛型接口

```typescript
// 泛型接口
interface Response<T> {
  code: number
  message: string
  data: T
}

interface User {
  id: number
  name: string
}

const userResponse: Response<User> = {
  code: 200,
  message: 'success',
  data: {
    id: 1,
    name: 'Alice'
  }
}

const listResponse: Response<User[]> = {
  code: 200,
  message: 'success',
  data: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
}
```

### 3. 泛型类

```typescript
// 泛型类
class Stack<T> {
  private items: T[] = []
  
  push(item: T): void {
    this.items.push(item)
  }
  
  pop(): T | undefined {
    return this.items.pop()
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }
  
  get size(): number {
    return this.items.length
  }
}

const numberStack = new Stack<number>()
numberStack.push(1)
numberStack.push(2)
console.log(numberStack.pop())  // 2

const stringStack = new Stack<string>()
stringStack.push('hello')
```

### 4. 泛型约束

```typescript
// 约束泛型类型
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

logLength('hello')  // ✅ string 有 length
logLength([1, 2, 3])  // ✅ array 有 length
// logLength(42)  // ❌ number 没有 length

// keyof 约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person = {
  name: 'Alice',
  age: 25
}

const name = getProperty(person, 'name')  // ✅ string
// const invalid = getProperty(person, 'invalid')  // ❌ 编译错误
```

## 🛡️ 类型守卫

### 1. typeof 类型守卫

```typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript 知道这里 value 是 string
    return value.toUpperCase()
  } else {
    // 这里 value 是 number
    return value.toFixed(2)
  }
}
```

### 2. instanceof 类型守卫

```typescript
class Dog {
  bark() {
    console.log('Woof!')
  }
}

class Cat {
  meow() {
    console.log('Meow!')
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark()
  } else {
    animal.meow()
  }
}
```

### 3. 自定义类型守卫

```typescript
// 使用 is 关键字
interface Fish {
  swim(): void
}

interface Bird {
  fly(): void
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim()
  } else {
    pet.fly()
  }
}
```

### 4. in 操作符

```typescript
type Shape = Circle | Rectangle

interface Circle {
  kind: 'circle'
  radius: number
}

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

function getArea(shape: Shape): number {
  if ('radius' in shape) {
    // Circle
    return Math.PI * shape.radius ** 2
  } else {
    // Rectangle
    return shape.width * shape.height
  }
}
```

## 🎨 实用工具类型

### 1. Partial - 所有属性可选

```typescript
interface User {
  id: number
  name: string
  email: string
}

// 所有属性变为可选
type PartialUser = Partial<User>
// 等价于
// {
//   id?: number
//   name?: string
//   email?: string
// }

function updateUser(id: number, updates: Partial<User>) {
  // 可以只传部分字段
}

updateUser(1, { name: 'Alice' })
updateUser(2, { email: 'bob@example.com' })
```

### 2. Required - 所有属性必填

```typescript
interface Config {
  host?: string
  port?: number
  timeout?: number
}

// 所有属性变为必填
type RequiredConfig = Required<Config>
// 等价于
// {
//   host: string
//   port: number
//   timeout: number
// }
```

### 3. Readonly - 所有属性只读

```typescript
interface Point {
  x: number
  y: number
}

const point: Readonly<Point> = {
  x: 10,
  y: 20
}

// point.x = 30  // ❌ 编译错误：只读属性
```

### 4. Pick - 选择部分属性

```typescript
interface User {
  id: number
  name: string
  email: string
  age: number
}

// 只选择 id 和 name
type UserPreview = Pick<User, 'id' | 'name'>
// 等价于
// {
//   id: number
//   name: string
// }
```

### 5. Omit - 排除部分属性

```typescript
interface User {
  id: number
  name: string
  password: string
  email: string
}

// 排除敏感字段
type SafeUser = Omit<User, 'password'>
// 等价于
// {
//   id: number
//   name: string
//   email: string
// }
```

### 6. Record - 构造对象类型

```typescript
// 创建映射类型
type PageInfo = {
  title: string
  url: string
}

type Pages = 'home' | 'about' | 'contact'

const pages: Record<Pages, PageInfo> = {
  home: { title: '首页', url: '/' },
  about: { title: '关于', url: '/about' },
  contact: { title: '联系', url: '/contact' }
}
```

### 7. Exclude 和 Extract

```typescript
type T1 = Exclude<'a' | 'b' | 'c', 'a'>  // 'b' | 'c'
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'f'>  // 'a'
```

### 8. NonNullable - 排除 null 和 undefined

```typescript
type T1 = NonNullable<string | number | undefined>  // string | number
type T2 = NonNullable<string[] | null | undefined>  // string[]
```

## 🎯 实战案例

### API 响应类型设计

```typescript
// 基础响应类型
interface BaseResponse {
  code: number
  message: string
}

// 成功响应
interface SuccessResponse<T> extends BaseResponse {
  code: 200
  data: T
}

// 错误响应
interface ErrorResponse extends BaseResponse {
  code: 400 | 404 | 500
  error: string
}

// 联合类型
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

// 类型守卫
function isSuccess<T>(response: ApiResponse<T>): response is SuccessResponse<T> {
  return response.code === 200
}

// 使用示例
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`)
  return await response.json()
}

// 处理响应
async function getUser(id: number) {
  const response = await fetchUser(id)
  
  if (isSuccess(response)) {
    console.log(response.data.name)  // TypeScript 知道这里有 data
  } else {
    console.error(response.error)  // 这里有 error
  }
}
```

### 状态机类型设计

```typescript
// 状态定义
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }

// 类型安全的状态处理
function handleState(state: State) {
  switch (state.status) {
    case 'idle':
      return '空闲'
    case 'loading':
      return '加载中...'
    case 'success':
      return state.data  // TypeScript 知道这里有 data
    case 'error':
      return state.error.message  // 这里有 error
  }
}
```

### 表单验证器

```typescript
// 验证器类型
type Validator<T> = (value: T) => string | null

// 表单字段配置
interface Field<T> {
  value: T
  validators: Validator<T>[]
}

// 表单类型
type Form<T> = {
  [K in keyof T]: Field<T[K]>
}

// 使用示例
interface UserForm {
  username: string
  email: string
  age: number
}

const form: Form<UserForm> = {
  username: {
    value: '',
    validators: [
      (v) => v.length < 3 ? '用户名至少3个字符' : null,
      (v) => /^[a-zA-Z0-9]+$/.test(v) ? null : '只能包含字母和数字'
    ]
  },
  email: {
    value: '',
    validators: [
      (v) => /\S+@\S+\.\S+/.test(v) ? null : '邮箱格式不正确'
    ]
  },
  age: {
    value: 0,
    validators: [
      (v) => v >= 18 ? null : '必须年满18岁'
    ]
  }
}

// 验证函数
function validateForm<T>(form: Form<T>): Record<keyof T, string | null> {
  const errors = {} as Record<keyof T, string | null>
  
  for (const key in form) {
    const field = form[key]
    for (const validator of field.validators) {
      const error = validator(field.value)
      if (error) {
        errors[key] = error
        break
      }
    }
  }
  
  return errors
}
```

## 💡 最佳实践

### 1. 优先使用类型推导

```typescript
// ❌ 避免不必要的类型注解
const name: string = 'Alice'
const age: number = 25

// ✅ 让 TypeScript 推导
const name = 'Alice'
const age = 25
```

### 2. 使用严格模式

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### 3. 避免使用 any

```typescript
// ❌ 避免
function process(data: any) {
  return data
}

// ✅ 使用泛型
function process<T>(data: T): T {
  return data
}

// ✅ 或使用 unknown
function process(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}
```

### 4. 合理使用类型断言

```typescript
// ❌ 过度使用
const value = getData() as string

// ✅ 配合类型守卫
const value = getData()
if (typeof value === 'string') {
  console.log(value.toUpperCase())
}
```

## 📚 参考资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 高级类型](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

---

**下一节** → [装饰器系统升级](03-装饰器系统升级.md)
