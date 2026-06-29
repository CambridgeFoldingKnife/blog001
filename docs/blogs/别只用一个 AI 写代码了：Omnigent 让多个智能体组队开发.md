---
title: 别只用一个 AI 写代码了：Omnigent 让多个 Agent 像团队一样协作
date: 2026-06-26
categories:
  - AI工具
  - 开发效率
tags:
  - Omnigent
  - Claude Code
  - Codex
  - Pi
  - 多Agent协作
  - Meta-harness
author: 剑桥折刀
---

# 别只用一个 AI 写代码了：Omnigent 让多个 Agent 像团队一样协作

## 一、你是不是也在多个 AI 工具之间反复横跳？

写前端用 Claude Code，写后端用 Codex，做重构又切到 Cursor——这是不是你的日常？

更难受的是，**这些 Agent 各自为战**。你在不同窗口之间复制粘贴代码，自己当项目经理协调进度，还得手动同步上下文。单个 Agent 也很容易"钻牛角尖"：让它重构模块，它可能改着改着把别的地方搞崩，因为没人帮它 review。

最近发现了一个项目 **Omnigent**（[github.com/omnigent-ai/omnigent](https://github.com/omnigent-ai/omnigent)），它的官方定位是 **"A meta-harness for all your AI agents"**——也就是**多个 AI 智能体的元编排层**。

简单说：Omnigent 自己不写代码，它是一个**"AI 团队的项目经理"，把 Claude Code、Codex、Pi 这些 Agent 当成**可互换的 worker\*\*，在同一个 orchestrator 下协同工作。

> **特别注意**
> Omnigent 由 **Omnigent AI** 团队开源，目前还在快速迭代。本文基于 [官方 README](https://github.com/omnigent-ai/omnigent) 整理，实际使用请以仓库最新版本为准。

## 二、Omnigent 到底是什么？

Omnigent 是一个 **meta-harness（元编排层）**：你提供模型和基础设施，Omnigent 在上面**运行并协调多个 AI 智能体**。

它的核心架构是 **"一个 orchestrator + 多个可互换 worker"**：

| 角色                    | 职责                                     |
| --------------------- | -------------------------------------- |
| **Orchestrator（编排器）** | 决定任务分给谁、谁 review 谁、结果如何汇总              |
| **Worker（执行者）**       | Claude Code / Codex / Pi / 你自定义的 Agent |

Worker 之间是**可互换的**——同一个任务可以让 Claude 写、Codex 写、Pi 写，Omnigent 不绑定具体厂商。

## 三、Omnigent 能做的 6 件事

官方 README 列出了六大能力，**多 Agent 协作只是其中一项**。这一节我们逐个拆解。

### 3.1 📱 跨设备同步：终端、浏览器、手机随时切

会话是跟着你走的：

- 在**本地终端**起一个 session
- 切到**浏览器**的 Web UI（`http://localhost:6767`）继续
- 在**手机**上打开同个 URL 接着聊
- 用 macOS 桌面 App（[下载地址](https://omnigent.ai/download/mac)）获得原生体验

消息、子 Agent、终端、文件**实时同步**。通勤路上用手机看 Agent 干活，到公司打开电脑直接接着写。

### 3.2 🤖 监督多个 Agent：让 AI 自己协作、互相 review

这是最核心的能力。你可以在**同一个会话**里同时跑多个 Agent：

- **Claude Code**：架构设计、复杂逻辑
- **Codex**：长上下文理解、批量重构
- **Pi**：轻量任务
- **自定义 Agent**：你自己用 YAML 定义的（比如专门跑测试的）

而且 Omnigent 支持**让一个 Agent 审查另一个 Agent 的工作**——比如让 Claude 写的代码，交给 Codex 跨厂商 review，避免"自审自查"的盲区。

### 3.3 🔌 任意模型：API、订阅、网关都行

Omnigent 不绑死任何模型来源，`omnigent setup` 里支持 4 种凭证：

| 类型                      | 说明                                                                        |
| ----------------------- | ------------------------------------------------------------------------- |
| 🔑 **API key**          | Anthropic、OpenAI 等厂商的直连 key                                               |
| 🎟️ **Subscription 订阅** | Claude Pro/Max、ChatGPT 订阅（通过 `claude` / `codex` CLI 登录）                   |
| 🌐 **Gateway 网关**       | 任何 OpenAI / Anthropic 兼容的 base\_url（OpenRouter、LiteLLM、Ollama、vLLM、Azure） |
| 🧱 **Databricks**       | Databricks workspace 配置文件（需要 `databricks` 扩展）                             |

不同 Agent 可以有**不同的默认模型**，Claude 默认和 Codex 默认可以共存。还能在会话中途用 `/model` 命令切换。

> **特别注意**
> 用 OpenRouter 当网关时，Claude Code 用 `https://openrouter.ai/api`（不带 `/v1`），Codex / OpenAI agents 用 `https://openrouter.ai/api/v1`。**这个细节 README 专门强调了，千万别搞反。**

### 3.4 ☁️ 云沙箱执行：笔记本都不用开

Omnigent 支持把 session 跑在**云端沙箱**里：

- [Modal](https://modal.com/) 沙箱
- [Daytona](https://www.daytona.io/) 沙箱
- 其他厂商持续接入

这叫 **managed hosts**——服务器在每次 session 启动时自动分配一个干净的沙箱环境，**你不用一直开着笔记本**。

### 3.5 🛡️ Policy 治理：高危操作前先问你

Omnigent 的 Policy 系统决定一个 Agent **能做什么**：

- 跑 shell 命令？
- 编辑文件？
- 花多少 token / 美元？

每个 action 都会被检查，三种结果：**放行 / 拒绝 / 暂停问你**。

Policy 在三个层级叠加生效，**更严格的先生效**：

| 层级              | 谁配置 | 作用范围     |
| --------------- | --- | -------- |
| **server-wide** | 管理员 | 整个服务器    |
| **per-agent**   | 开发者 | 单个 Agent |
| **per-session** | 你自己 | 单次会话     |

内置的常用 policy 有：

- `ask_on_os_tools`：跑 shell / 写文件前先问你
- `max_tool_calls_per_session`：限制一次会话最多调用几次工具
- `cost_budget`：硬性花销上限 + 软性提醒阈值

### 3.6 👥 团队协作：邀请队友、分享会话、co-drive、fork

Omnigent 是个**多用户系统**（启动时设 `OMNIGENT_AUTH_ENABLED=1` 开启），支持：

- **Share**：分享 live session 链接，队友能围观你的 Agent 工作并实时聊天
- **Co-drive**：队友"附身"到你的 session，**命令在你的机器上执行**——适合配对编程
- **Fork**：把会话克隆一份到自己的机器上，从分叉点继续走自己的路

还支持 OIDC 登录（Google / GitHub / Okta / Microsoft），不用单独维护用户表。

## 四、快速上手

### 4.1 安装

Omnigent 需要 **Python 3.12+**。三种安装方式任选：

```Bash
# 方式 1：推荐的一键安装（最省事）
curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh

# 方式 2：用 uv 装（你已经有 uv 的话）
uv tool install omnigent

# 方式 3：用 Homebrew（macOS / Linux）
brew install omnigent-ai/tap/omnigent

# 方式 4：直接 pip
pip install "omnigent"
```

> **特别注意**
> 装完 PATH 里会有两个名字：**`omnigent`** 和 **`omni`**，完全等价，挑顺手的用。

### 4.2 启动第一个 Agent

直接跑：

```Bash
omnigent
```

它会引导你选模型、启动 session，并自动打开本地 Web UI（`http://localhost:6767`），你能在浏览器里看到同样的会话。

也可以指定具体的 Agent runtime：

```Bash
omnigent claude   # Claude Code
omnigent codex    # Codex
omnigent run path/to/agent.yaml   # 你自己的 Agent
```

> **特别注意**
> 首次运行会自动识别环境里的凭证：`ANTHROPIC_API_KEY` / `OPENAI_API_KEY`，或者已经登录的 `claude` / `codex` CLI，会问你想用哪个做默认。

### 4.3 官方案例：Polly 和 Debby

仓库里自带两个超好用的示例 Agent：

#### 🐙 Polly——多 Agent 编码编排

```Bash
omnigent run examples/polly/
```

Polly 是个**多 Agent 编码的 tech lead**，她自己**不写代码**，只做三件事：

1. 规划任务
2. 并行委派给 Claude Code / Codex / Pi（在不同 git worktree 里干活）
3. 把每个 diff 路由给**不同厂商的 reviewer** 做 review

最后合并由你决定。这就是 README 里说的"cross-vendor review"。

#### 🟠🔵 Debby——双脑辩论

```Bash
omnigent run examples/debby/
```

Debby 是**两个脑袋**的头脑风暴伙伴：一个 Claude + 一个 GPT。

- 你问个问题，两边各自回答
- 输入 `/debate`，两个脑袋会**互相质疑对方几个回合**，最后收敛

需要同时配 Claude 和 OpenAI 凭证。

### 4.4 写自己的 Agent

Agent 本质上是个**简短的 YAML 文件**：

```yaml
name: my_agent
prompt: You are a helpful data analyst.

executor:
  harness: claude-sdk   # 可选：claude-sdk / codex / codex-native / claude-native / openai-agents / pi

tools:
  # 一个本地 Python 函数（自动从签名生成 schema）
  word_count:
    type: function
    callable: mypackage.mymodule.word_count

  # 一个子 Agent，supervisor 可以委派给它
  researcher:
    type: agent
    prompt: Search for relevant information and summarize it.
    tools:
      word_count: inherit
```

跑起来：

```Bash
omnigent run path/to/my_agent.yaml
```

完整的 schema 见 [Agent YAML Spec](https://github.com/omnigent-ai/omnigent/blob/main/docs/AGENT_YAML_SPEC.md)。

> **特别注意**
> 你不用手写 YAML——**Agent 也能生成 Agent**。在任意 Omnigent 会话里说"帮我写一个 XXX 的 agent"，它会自己把 YAML 文件编出来。

### 4.5 部署到服务器（手机也能用）

跑在有公网 IP 的服务器上，会话就能从任何地方访问：

```Bash
# 在服务器上
omnigent server start

# 在你的笔记本上
omnigent login https://your-host
omnigent host https://your-host
```

部署选项 README 里覆盖得很全：

| 部署方式                                           | 说明                 |
| ---------------------------------------------- | ------------------ |
| `docker compose up`                            | 一行起服务（VPS、家庭服务器都行） |
| Render                                         | 一键部署               |
| Fly.io / Railway / Hugging Face Spaces / Modal | 都有现成模板             |

部署细节见 [deploy/README.md](https://github.com/omnigent-ai/omnigent/blob/main/deploy/README.md)。

> **特别注意**
> 在自己家里跑、不部署到公网也没问题——同个局域网下用手机打开 `http://192.168.x.x:6767` 就行。

## 五、真实场景示例

### 5.1 场景一：跨厂商 review 解决"自审盲区"

单个 Agent 最大的问题是**自己写的代码自己 review，盲区看不到**。用 Omnigent 配置：

- **Worker**：Claude Code 写实现
- **Reviewer**：Codex（不同厂商）做 review

Omnigent 自动把 diff 路由过去，避免 Claude 自己审自己的盲区。

### 5.2 场景二：多个独立任务并行

重构一个老项目，拆成三个独立子任务（用户模块、订单模块、支付模块），分别交给三个 Agent **在不同 git worktree 里并行**：

- Worker A：Claude Code 处理用户模块
- Worker B：Codex 处理订单模块
- Worker C：Pi 处理支付模块

最后由 reviewer 逐个 review，你合并。比自己串行做快几倍。

### 5.3 场景三：Debby 拿来头脑风暴

设计一个新功能时，不用纠结"用策略模式还是状态机"。让 Debby 上：

- 让 Claude 答一遍
- 让 GPT 答一遍
- `/debate` 让两边互相质疑几个回合
- 最后拿到收敛后的方案

比单个 Agent 的"一句话回答"靠谱得多。

### 5.4 场景四：用 Policy 控制风险

```yaml
policies:
  approve_shell:
    type: function
    handler: omnigent.policies.builtins.safety.ask_on_os_tools  # 跑 shell / 写文件前先问我

  cap_calls:
    type: function
    handler: omnigent.policies.builtins.safety.max_tool_calls_per_session
    factory_params:
      limit: 50  # 一个 session 最多调 50 次工具

  budget:
    type: function
    handler: omnigent.policies.builtins.cost.cost_budget
    factory_params:
      max_cost_usd: 5.00         # 硬性上限 5 美元
      ask_thresholds_usd: [3.00] # 软性提醒：到 3 美元时问一次
```

把这段加到 Agent YAML 里，Agent 就**自动遵守**：跑命令前问你、单 session 调用不超 50 次、花销不超过 5 美元。

## 六、和"单 Agent + 多窗口"的对比

| 维度         | 自己切窗口用多个 Agent | Omnigent 多 Agent               |
| ---------- | -------------- | ------------------------------ |
| 上下文同步      | 手动复制粘贴         | 同一个 session 自动共享               |
| 跨厂商 review | 需要自己复制 diff    | 内置路由机制                         |
| 跨设备        | 不支持            | 终端 / 浏览器 / 手机 / 桌面 App 实时同步    |
| 云端执行       | 不支持            | Modal / Daytona 沙箱             |
| 风险控制       | 自己盯着           | Policy 系统（询问、限额、限工具）           |
| 团队协作       | 截屏分享           | 分享链接 / co-drive / fork         |
| 模型选择       | 受限于工具          | API / 订阅 / 网关 / Databricks 全支持 |
| Token 消耗   | 较低             | 较高（多 Agent 同时跑）                |

## 七、目前的局限和建议

虽然 Omnigent 思路很领先，但实际用下来还是要注意几个点：

1. **还在快速迭代**：仓库目前只有 3 个 commit，功能边界可能很快变化。生产环境用建议锁定版本。
2. **Token 消耗偏高**：多个 Agent 同时跑 + 跨厂商 review，成本是单 Agent 的几倍。建议**便宜模型做实现、贵的模型做架构/review**。
3. **Policy 学习曲线**：内置 policy 不多，复杂需求要自己写。
4. **必须 Python 3.12+**：老系统可能要折腾一下。

> **特别注意**
> 建议从**两个示例**（Polly 和 Debby）开始跑，对架构有体感后再写自己的 Agent。

## 八、总结

Omnigent 解决的不是"怎么让 AI 写代码"——这件事 Claude Code / Codex 自己已经做得很好了。它解决的是 **"怎么让多个 AI 像一个团队一样协作"**。

核心能力一句话概括：**Omnigent 是多个 AI 智能体的"项目经理"，让你能在同一个会话里用不同厂商的 Agent、互相 review、跨设备同步、用 Policy 控制风险、和队友协作。**

如果你的痛点是"在 Claude Code、Codex、Cursor 之间反复横跳"或者"单个 Agent 自审有盲区"，Omnigent 值得一玩。

- 仓库：[github.com/omnigent-ai/omnigent](https://github.com/omnigent-ai/omnigent)
- 官方站：[omnigent.ai](https://omnigent.ai/)
- macOS 桌面 App：[omnigent.ai/download/mac](https://omnigent.ai/download/mac)

> 安装一行命令：
>
> ```Bash
> curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh
> ```

如果在配置过程中遇到问题，欢迎在评论区留言，我会持续更新这篇指南。
