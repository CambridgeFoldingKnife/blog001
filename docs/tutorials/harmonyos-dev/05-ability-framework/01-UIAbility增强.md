---
title: UIAbility 增强
date: 2025-01-22
---

# UIAbility 增强

> HarmonyOS 应用的基础能力单元

## 🎯 UIAbility 概述

### 什么是 UIAbility

UIAbility 是包含用户界面的应用组件，为用户提供可交互的界面。

```
应用组成
├─ UIAbility（用户界面）
│   ├─ 主界面
│   ├─ 详情页面
│   └─ 设置页面
└─ ExtensionAbility（无界面扩展）
    ├─ 服务卡片
    └─ 后台服务
```

## 📝 创建 UIAbility

### 基础结构

```typescript
import UIAbility from '@ohos.app.ability.UIAbility'
import window from '@ohos.window'

export default class EntryAbility extends UIAbility {
  // 创建时调用
  onCreate(want, launchParam) {
    console.log('UIAbility onCreate')
  }
  
  // 销毁时调用
  onDestroy() {
    console.log('UIAbility onDestroy')
  }
  
  // 前台时调用
  onForeground() {
    console.log('UIAbility onForeground')
  }
  
  // 后台时调用
  onBackground() {
    console.log('UIAbility onBackground')
  }
  
  // 窗口阶段
  onWindowStageCreate(windowStage: window.WindowStage) {
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        console.error('加载页面失败')
        return
      }
      console.log('加载页面成功')
    })
  }
  
  onWindowStageDestroy() {
    console.log('WindowStage 销毁')
  }
}
```

## 🚀 启动模式

### 1. singleton（单实例）

```json5
// module.json5
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        "launchType": "singleton"  // 单实例模式
      }
    ]
  }
}
```

**特点：**
- 整个应用只有一个实例
- 再次启动会复用已有实例
- 适用场景：主页、设置页

### 2. multiton（多实例）

```json5
{
  "abilities": [
    {
      "name": "DetailAbility",
      "launchType": "multiton"  // 多实例模式
    }
  ]
}
```

**特点：**
- 每次启动创建新实例
- 适用场景：详情页、编辑页

### 3. specified（指定实例）

```json5
{
  "abilities": [
    {
      "name": "DocumentAbility",
      "launchType": "specified"  // 指定实例模式
    }
  ]
}
```

**特点：**
- 可以自定义实例创建逻辑
- 适用场景：文档编辑器

## 🔗 UIAbility 启动

### 同应用内启动

```typescript
import common from '@ohos.app.ability.common'

@Entry
@Component
struct Index {
  private context = getContext(this) as common.UIAbilityContext
  
  startAbility() {
    const want = {
      deviceId: '',  // 默认本设备
      bundleName: 'com.example.myapp',
      abilityName: 'DetailAbility',
      parameters: {
        id: 123,
        title: '详情页'
      }
    }
    
    this.context.startAbility(want)
      .then(() => {
        console.log('启动成功')
      })
      .catch((err) => {
        console.error('启动失败:', err)
      })
  }
  
  build() {
    Column() {
      Button('跳转到详情')
        .onClick(() => {
          this.startAbility()
        })
    }
  }
}
```

### 跨应用启动

```typescript
startOtherApp() {
  const want = {
    bundleName: 'com.other.app',  // 其他应用包名
    abilityName: 'MainAbility',
    parameters: {
      data: 'shared data'
    }
  }
  
  this.context.startAbility(want)
    .then(() => {
      console.log('启动其他应用成功')
    })
    .catch((err) => {
      console.error('启动失败:', err)
    })
}
```

### 带结果启动

```typescript
async startAbilityForResult() {
  const want = {
    bundleName: 'com.example.myapp',
    abilityName: 'SelectAbility',
    parameters: {
      type: 'image'
    }
  }
  
  try {
    const result = await this.context.startAbilityForResult(want)
    console.log('返回结果:', result.resultCode, result.want)
    
    if (result.resultCode === 0) {
      const selectedImage = result.want?.parameters?.image
      console.log('选择的图片:', selectedImage)
    }
  } catch (err) {
    console.error('启动失败:', err)
  }
}
```

### 返回结果

```typescript
// SelectAbility.ets
import UIAbility from '@ohos.app.ability.UIAbility'

export default class SelectAbility extends UIAbility {
  onWindowStageCreate(windowStage) {
    windowStage.loadContent('pages/Select', (err, data) => {
      // 选择完成后返回
    })
  }
  
  // 返回结果
  returnResult(image: string) {
    const abilityResult = {
      resultCode: 0,
      want: {
        parameters: {
          image: image
        }
      }
    }
    
    this.context.terminateSelfWithResult(abilityResult)
      .then(() => {
        console.log('返回结果成功')
      })
  }
}
```

## 📦 数据传递

### 通过 Want 传递

```typescript
// 传递简单数据
const want = {
  bundleName: 'com.example.myapp',
  abilityName: 'DetailAbility',
  parameters: {
    id: 123,
    title: '商品详情',
    price: 99.99,
    tags: ['热销', '新品']
  }
}

this.context.startAbility(want)

// 接收数据
export default class DetailAbility extends UIAbility {
  onCreate(want, launchParam) {
    const id = want.parameters?.id
    const title = want.parameters?.title
    const price = want.parameters?.price
    const tags = want.parameters?.tags
    
    console.log('接收到:', id, title, price, tags)
  }
}
```

### 通过 AppStorage 共享

```typescript
// 页面 A - 设置数据
AppStorage.SetOrCreate('sharedData', {
  user: { name: 'Alice', age: 25 },
  settings: { theme: 'dark' }
})

// 页面 B - 读取数据
@Entry
@Component
struct PageB {
  @StorageLink('sharedData') sharedData: any
  
  build() {
    Column() {
      Text(`用户: ${this.sharedData.user.name}`)
      Text(`主题: ${this.sharedData.settings.theme}`)
    }
  }
}
```

## 🎯 实战案例

### 商品详情页

```typescript
// 商品列表页
@Entry
@Component
struct ProductList {
  private context = getContext(this) as common.UIAbilityContext
  @State products: Product[] = []
  
  openDetail(product: Product) {
    const want = {
      bundleName: 'com.example.shop',
      abilityName: 'ProductDetailAbility',
      parameters: {
        productId: product.id,
        productName: product.name,
        productPrice: product.price
      }
    }
    
    this.context.startAbility(want)
  }
  
  build() {
    List() {
      ForEach(this.products, (product: Product) => {
        ListItem() {
          Row() {
            Text(product.name)
              .layoutWeight(1)
            Text(`¥${product.price}`)
            Button('查看')
              .onClick(() => {
                this.openDetail(product)
              })
          }
          .padding(15)
        }
      })
    }
  }
}

// 商品详情 Ability
export default class ProductDetailAbility extends UIAbility {
  private productId: number = 0
  
  onCreate(want, launchParam) {
    this.productId = want.parameters?.productId || 0
    
    // 保存到全局存储
    AppStorage.SetOrCreate('currentProductId', this.productId)
  }
  
  onWindowStageCreate(windowStage) {
    windowStage.loadContent('pages/ProductDetail')
  }
}

// 商品详情页面
@Entry
@Component
struct ProductDetail {
  @StorageLink('currentProductId') productId: number = 0
  @State product: Product = null
  
  async aboutToAppear() {
    // 根据 ID 加载商品详情
    this.product = await loadProduct(this.productId)
  }
  
  build() {
    Column() {
      Image(this.product?.image)
        .width('100%')
        .height(300)
      
      Text(this.product?.name)
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
      
      Text(`¥${this.product?.price}`)
        .fontSize(20)
        .fontColor(Color.Red)
      
      Text(this.product?.description)
        .margin({ top: 20 })
    }
  }
}
```

## 💡 最佳实践

### 1. 合理选择启动模式

```typescript
// ✅ 主页使用 singleton
{
  "name": "MainAbility",
  "launchType": "singleton"
}

// ✅ 详情页使用 multiton
{
  "name": "DetailAbility",
  "launchType": "multiton"
}
```

### 2. 处理启动错误

```typescript
try {
  await this.context.startAbility(want)
} catch (err) {
  if (err.code === 16000001) {
    console.error('Ability 不存在')
  } else if (err.code === 16000002) {
    console.error('参数错误')
  }
}
```

### 3. 及时清理资源

```typescript
onDestroy() {
  // 清理定时器
  clearInterval(this.timer)
  
  // 清理监听器
  this.unsubscribe()
  
  // 释放资源
  this.releaseResources()
}
```

## 📚 参考资源

- [UIAbility 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/uiability-overview-0000001820999489-V5)

---

**下一节** → [ExtensionAbility 新类型](02-ExtensionAbility新类型.md)
