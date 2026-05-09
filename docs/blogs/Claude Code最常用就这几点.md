---
title: Claude-Code使用 -最常用的就这几点
date: 2026-05-08
categories:
  - AI工具
  - 开发效率
tags:
  - Claude Code
  - AI编程
  - 终端工具
author: 剑桥折刀
---

# Claude-Code使用 -最常用的就这几点

> 从入门-管理-扩展的全流程经验。让你花钱少踩坑快速熟悉最常用的几种。

***

## 一、入门篇：基础使用与配置

### 1.1 Agent 工作流方式

<img src="/blogs/0508images/001.jpg" alt="图1" style="width:70%;" />

- **Claude Code** 是更完整、更强的 Harness（工具框架）
- 可替换的 Agent：TRAE、Codex、Coder 等编辑器，替换 Agent 本质上我认为就是在替换 Harness

<img src="/blogs/0508images/002.jpg" alt="图2" style="width:70%;" />

<br />

### 1.2 Claude 的 4 种使用方式

| 使用方式   | 说明        |
| ------ | --------- |
| 桌面 IDE | 桌面端集成开发环境 |
| 终端     | 原生功能最全    |
| IDE 插件 | 编辑器插件形式   |
| 网页端    | 浏览器访问官网   |

这里给大家分享我使用最多的就是终端。我们可以使用 TRAE 终端 + Claude。或者直接命令行终端。

<img src="/blogs/0508images/TRAE终端.png" alt="图3" style="width:70%;" />

### 1.3 Claude Code 安装方式

1. **官网命令行运行**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
   <img src="/blogs/0508images/安装Claude.png" alt="图4" style="width:70%;" />
2. **给智能体终端下命令** - 例如：
   ```bash
   # 帮我安装 Node环境 并用 npm 命令安装最新 Claude
   ```
   <img src="/blogs/0508images/003.png" alt="图5" style="width:70%;" />
3. **基于 Claude 源码 进行反编译破解**（CCB）

   [claude-code-best/claude-code: 原汁原昧 Claude Code 可运行,可构建, 可调试版; 生产级工程化, 企业级可靠性; 安全无毒, 内存泄露修复](https://github.com/claude-code-best/claude-code)

### 1.4 Agent 配置大脑

下载好之后我们就要给我们 Agent 配置大脑。

- 国产大模型。这里以 deepseek v4-pro 为例子：

  Windows 用户执行：
  ```powershell
  $env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
  $env:ANTHROPIC_AUTH_TOKEN="<你的 DeepSeek API Key>"
  $env:ANTHROPIC_MODEL="deepseek-v4-pro"
  $env:ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro"
  $env:ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro"
  $env:ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash"
  $env:CLAUDE_CODE_SUBAGENT_MODEL="deepseek-v4-flash"
  $env:CLAUDE_CODE_EFFORT_LEVEL="max"
  ```
- 中转 API Key 需要下载 cc switch 进行配置

  [farion1231/cc-switch: A cross-platform desktop All-in-One assistant tool for Claude Code, Codex, OpenCode, openclaw & Gemini CLI.](https://github.com/farion1231/cc-switch)

  <img src="/blogs/0508images/cc-switch.png" alt="图6" style="width:70%;" />

### 1.5 CC（Claude Code）三种模式

Shift + Tab 键切换模式

| 模式         | 说明        |
| ---------- | --------- |
| **Plan**   | 计划 → 执行   |
| **默认**     | 自主判断 → 执行 |
| **自动编辑模式** | 自动执行代码编辑 |

> 注：以上三种模式都有一定权限限制

### 1.6 无限制模式（开绿灯）

```bash
dangerously-skip-permissions
```

### 1.7 终端命令运行

- 在 Claude 中运行终端命令时加 `!`：会阻塞与 Claude 交互
- `Ctrl + B`：Bash 命令进入后台运行，可以继续与 agent 交流

### 1.8 三种交互方式

1. **自然语言文字交互**
2. **@ 文件** - Claude 不会将所有文件加载到上下文中，需要主动 @ 文件
3. **图片处理** - 多模态处理 --直接复制粘贴即可

### 1.9 快捷键

- `Ctrl + 回车`：换行

### 1.10 项目开发建议

- 当项目开发文档 prompts 很长，建议新建一个文件存需求文档
- `/btw`：开启一个与项目无关的对话。用于临时查资料询问问题。但我平常都是另开一个终端进行交流。

### 1.11 /Simplify 内置的 Skill

从代码质量、运行效率、可重用性三个角度分析代码 -- 进行代码审查与优化规划

***

## 二、管理篇：版本控制与会话管理

### 2.1 最常见问题

1. 代码修改坏了怎么办？
2. 使用多了，Claude 变笨怎么办？

### 2.2 解决方案

#### 2.2.1 Git 版本控制

- 在 Claude 中直接输入连接 GitHub
- 每完成较满意的一版，推送一版。
  可以直接使用自然语言进行版本控制。

  <img src="/blogs/0508images/github.png" alt="图7" style="width:70%;" />

#### 2.2.2 Claude 自带 `/rewind`

- 双击 ESC 键，回退修改

  但这个操作只能回退 Claude 写的代码，不能撤退以及安装的包资源。

### 2.3 最常用的命令

| 命令         | 功能               |
| ---------- | ---------------- |
| `/compact` | 上下文压缩            |
| `/clear`   | 清空会话             |
| `/context` | 查看当前上下文使用量       |
| `/resume`  | 会话列表，可选择上次未完成的会话 |

> 进入 Claude 时加 `-c`：恢复最近会话

***

## 三、扩展篇：个性化服务与高级功能

### 3.1 个性化服务 - 让 Claude 记住你

#### 3.1.1 系统级配置（CLAUDE.md）

**全局性**：`~/.claude/`

- 我一般配置：永远用中文回答，高危命令询问用户手动操作等

**项目级**：

- 技术架构
- 开发规范

**子文件夹下**：

- 个人习惯 + 代码风格

**命令**：

- `/init`：初始化项目命令，自动创建一个 CLAUDE.md 文件
- `/memory`：修改 Claude 记忆

> 参考：Karpathy 的 Claude 代码指南 skill（积累使用经验，Claude 犯错更少）
> <img src="/blogs/0508images/memory.png" alt="图8" style="width:70%;" />

#### 3.1.2 Auto-memory（自动记忆）

在 `/memory` 下选择打开自动记忆文件夹

**存储内容**：

1. 用户身份
2. 反馈 - 你给的禁止操作
3. 项目进度
4. 外部资料

> 只作用于当前项目

### 3.2 如何干更多的事

#### 3.2.1 拓展方式

| 方式           | 说明                                         |
| ------------ | ------------------------------------------ |
| **Skill**    | 技能扩展，写 pdf，写 ppt，                            |
| **MCP**      | 模型上下文协议。调用 mysql，superbase、github、Chrome浏览器 |
| **CLI**      | 命令行接口                                      |
| **SubAgent** | 子代理                                        |

skills 我用的最多也最方便。
这里推荐几个 skills 技能仓库

<img src="/blogs/0508images/baoyuskills.png" alt="图9" style="width:70%;" />

<img src="/blogs/0508images/anthropics-skills.png" alt="图10" style="width:70%;" />

**SubAgent 分身**：

- Claude 会自动判断任务类型自动开启
- 手动开启 `/Agent`
- 写代码主 Agent、进行产品调用、竞品分析、展示报告都可以使用子 Agent

**使用场景**：

- 需要产品调研
- Agent 上下文有限
- 多个子 Agent 并行，结果返给主 Agent 就行

#### 3.2.2 Hook（钩子）

当 Claude 执行特定操作时，可以触发自定义行为

> 帮我做一个 hook，自动发一个提示音，最好发到我的飞书

***

## 四、总结

### 入门 → 管理 → 扩展 全流程

```
┌─────────────────────────────────────────────────────────────┐
│                        入门篇                                │
│  安装配置 → 使用方式 → 交互模式 → 基础命令                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        管理篇                                │
│  版本控制(Git) → 回退机制 → 会话管理 → 上下文优化            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        扩展篇                                │
│  个性化记忆 → 自动记忆 → 子代理 → Hook机制                   │
└─────────────────────────────────────────────────────────────┘
```

### 核心要点

1. **入门**：掌握 Claude Code 的安装、四种使用方式、三种运行模式
2. **管理**：善用 Git 版本控制和 `/rewind` 回退，合理管理会话上下文
3. **扩展**：通过 CLAUDE.md 和 Auto-memory 实现个性化，利用 SubAgent 和 Hook 扩展能力

***
