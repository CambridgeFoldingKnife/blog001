# Skills v1 极简体验 Demo：CLI Todo 工具

**目标**：在 15 分钟内，用 Skills 方法论完成一个零依赖的 CLI 待办工具。
**代码总量**：核心业务逻辑 < 30 行，测试 < 30 行。
**技术栈**：Node.js + TypeScript + Vitest（轻量快速）

---

## 前置准备

```bash
mkdir mini-todo-cli && cd mini-todo-cli
npm init -y
npm install -D typescript vitest @types/node
npx tsc --init
```

修改 `tsconfig.json`：
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

修改 `package.json` 添加 scripts：
```json
{
  "scripts": {
    "build": "tsc",
    "test": "vitest"
  }
}
```

---

## Step 1：需求对齐（模拟 `/grill-with-docs`）

**你对 AI 说**：
```markdown
我想做一个极简的命令行待办工具，支持添加任务、列出任务、标记完成。数据存在本地 JSON 文件里。
```

**AI 预期会问你**（若没问，你主动声明）：
1. 标记完成后是删除还是显示为完成状态？→ **显示为完成状态 `[x]`**
2. 任务编号是固定还是动态？→ **固定编号，按创建顺序**
3. JSON 文件不存在时怎么办？→ **自动创建空文件**
4. 是否支持删除任务？→ **不支持**
5. 是否支持多个待办列表？→ **不支持，单用户单列表**

**生成 `CONTEXT.md`**（复制到项目根目录）：
```markdown
# Context

## Domain Model

- **Todo**: 待办事项
  - id: number（从 1 递增，固定不变）
  - text: string（任务内容）
  - done: boolean（是否完成）
- **Storage**: 本地 JSON 文件（todos.json）
  - 格式：`{ todos: Todo[] }`
  - 行为：文件不存在时自动初始化为 `{ todos: [] }`

## CLI Interface

- `add <text>` → 创建新 Todo，id 自动递增
- `list` → 按 id 升序列出，格式：`[ ] 1. 买牛奶` / `[x] 2. 写作业`
- `done <id>` → 将指定 id 标记为 done=true

## Constraints

- 不删除、不编辑、不排序、不分类
- 单用户单列表
- 纯本地文件，无网络请求
```

---

## Step 2：生成 PRD（模拟 `/to-prd`）

**你对 AI 说**：
```markdown
基于上面的需求，生成一个极简 PRD。只需要包含数据模型、三个命令的输入输出、错误处理、以及明确不做什么。
```

**预期生成 `docs/prd.md`**（可直接复制）：
```markdown
# PRD: Mini Todo CLI

## Goals
实现一个零依赖（除测试外）的本地 CLI 待办工具。

## Data Model
```typescript
interface Todo {
  id: number;
  text: string;
  done: boolean;
}
```

## Internal API
- `addTodo(todos, text): Todo` —— 追加并返回新任务
- `markDone(todos, id): Todo | null` —— 标记完成，找不到返回 null

## CLI Commands
- `node dist/cli.js add "买牛奶"` → `Added: [ ] 1. 买牛奶`
- `node dist/cli.js list` → 多行输出 `[ ] 1. 买牛奶`
- `node dist/cli.js done 1` → `Done: [x] 1. 买牛奶` 或 `Todo #1 not found`

## Error Handling
- 文件不存在 → 自动创建
- done 传入无效 id → 输出 `Todo #{id} not found`
- 无子命令 → 输出 Usage

## Non-Goals
- 删除、编辑任务
- 多列表/多用户
- 截止日期、优先级
- 数据库或网络存储
```

---

## Step 3：拆 Issue（模拟 `/to-issues`）

**你对 AI 说**：
```markdown
把这个 PRD 拆成 2 个独立 Issue，第一个做文件存储，第二个做业务逻辑和 CLI。
```

**预期生成**（直接创建两个文件）：

### `docs/issue-1-storage.md`
```markdown
# Issue #1: Storage Layer

## Description
实现 JSON 文件的读写，文件不存在时自动初始化。

## Acceptance Criteria
- [ ] `readTodos(path)`：文件不存在返回 `[]`
- [ ] `writeTodos(path, todos)`：写入 `{ todos }` 格式
- [ ] Vitest 测试覆盖上述场景
```

### `docs/issue-2-cli.md`
```markdown
# Issue #2: CLI Logic

## Description
实现 Todo 业务逻辑和命令行解析。

## Acceptance Criteria
- [ ] `addTodo`：id 从 1 递增，追加到数组
- [ ] `markDone`：按 id 查找，标记 done=true，找不到返回 null
- [ ] `cli.ts`：解析 `add/list/done` 三个子命令
- [ ] Vitest 测试覆盖业务逻辑（不测试 CLI 输出，只测纯函数）

## Dependencies
Blocked by #1
```

---

## Step 4：TDD Issue #1（Storage）

### Red：写测试

创建 `src/storage.test.ts`：
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { readTodos, writeTodos } from './storage';

const TEST_FILE = path.join(__dirname, '../../test-todos.json');

beforeEach(() => {
  if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
});

describe('storage', () => {
  it('returns empty array when file missing', () => {
    expect(readTodos(TEST_FILE)).toEqual([]);
  });

  it('writes and reads todos', () => {
    writeTodos(TEST_FILE, [{ id: 1, text: 'test', done: false }]);
    expect(readTodos(TEST_FILE)).toHaveLength(1);
    expect(readTodos(TEST_FILE)[0].text).toBe('test');
  });
});
```

运行（应失败）：
```bash
npx vitest run
```

### Green：最小实现

创建 `src/storage.ts`：
```typescript
import fs from 'fs';

export function readTodos(filePath: string) {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')).todos;
}

export function writeTodos(filePath: string, todos: any[]) {
  fs.writeFileSync(filePath, JSON.stringify({ todos }, null, 2));
}
```

运行（应通过）：
```bash
npx vitest run
```

---

## Step 5：TDD Issue #2（业务逻辑）

### Red：写测试

创建 `src/todo.test.ts`：
```typescript
import { describe, it, expect } from 'vitest';
import { addTodo, markDone } from './todo';

describe('todo logic', () => {
  it('addTodo creates with incrementing id', () => {
    const todos: any[] = [];
    const t1 = addTodo(todos, 'a');
    const t2 = addTodo(todos, 'b');
    expect(t1.id).toBe(1);
    expect(t2.id).toBe(2);
    expect(todos).toHaveLength(2);
  });

  it('markDone marks todo as done', () => {
    const todos = [{ id: 1, text: 'x', done: false }];
    const result = markDone(todos, 1);
    expect(result?.done).toBe(true);
  });

  it('markDone returns null for missing id', () => {
    const todos = [{ id: 1, text: 'x', done: false }];
    expect(markDone(todos, 999)).toBeNull();
  });
});
```

运行（应失败）。

### Green：实现业务逻辑

创建 `src/todo.ts`：
```typescript
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export function addTodo(todos: Todo[], text: string): Todo {
  const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const todo: Todo = { id, text, done: false };
  todos.push(todo);
  return todo;
}

export function markDone(todos: Todo[], id: number): Todo | null {
  const todo = todos.find(t => t.id === id);
  if (!todo) return null;
  todo.done = true;
  return todo;
}
```

运行（应通过）：
```bash
npx vitest run
```

---

## Step 6：CLI 入口（无测试，直接实现）

创建 `src/cli.ts`：
```typescript
import { readTodos, writeTodos } from './storage';
import { addTodo, markDone } from './todo';
import path from 'path';

const FILE = path.join(process.cwd(), 'todos.json');
const [, , cmd, ...args] = process.argv;
const todos = readTodos(FILE);

if (cmd === 'add') {
  const text = args.join(' ');
  const todo = addTodo(todos, text);
  writeTodos(FILE, todos);
  console.log(`Added: [ ] ${todo.id}. ${todo.text}`);
} else if (cmd === 'list') {
  if (todos.length === 0) {
    console.log('No todos.');
  } else {
    todos.forEach(t => {
      const mark = t.done ? 'x' : ' ';
      console.log(`[${mark}] ${t.id}. ${t.text}`);
    });
  }
} else if (cmd === 'done') {
  const id = parseInt(args[0], 10);
  const todo = markDone(todos, id);
  if (!todo) {
    console.log(`Todo #${id} not found`);
  } else {
    writeTodos(FILE, todos);
    console.log(`Done: [x] ${todo.id}. ${todo.text}`);
  }
} else {
  console.log('Usage: node dist/cli.js <add|list|done> [args]');
}
```

---

## Step 7：运行体验

```bash
npm run build

node dist/cli.js add "买牛奶"
# Added: [ ] 1. 买牛奶

node dist/cli.js add "写博客"
# Added: [ ] 2. 写博客

node dist/cli.js list
# [ ] 1. 买牛奶
# [ ] 2. 写博客

node dist/cli.js done 1
# Done: [x] 1. 买牛奶

node dist/cli.js list
# [x] 1. 买牛奶
# [ ] 2. 写博客

node dist/cli.js done 999
# Todo #999 not found
```

---

## 最终目录结构

```
mini-todo-cli/
├── CONTEXT.md              # Step 1 生成
├── docs/
│   ├── prd.md              # Step 2 生成
│   ├── issue-1-storage.md  # Step 3 生成
│   └── issue-2-cli.md      # Step 3 生成
├── src/
│   ├── storage.ts          # Issue #1 实现
│   ├── storage.test.ts     # Issue #1 测试
│   ├── todo.ts             # Issue #2 实现
│   ├── todo.test.ts        # Issue #2 测试
│   └── cli.ts              # 入口文件
├── todos.json              # 运行后自动生成
├── package.json
├── tsconfig.json
└── dist/                   # 编译输出
```

---

## 体验要点总结

| 阶段 | Skills 原则 | 本次体现 |
|------|------------|---------|
| 需求对齐 | 先 grilling，再动手 | 5 个问题澄清了边界 |
| PRD | 明确 Goals + Non-Goals | 明确不做删除/编辑/多用户 |
| Issue 拆分 | 垂直切片、可独立执行 | Storage 和 Logic 分开 |
| TDD | Red → Green → Refactor | 每个函数先写测试再实现 |
| CONTEXT.md | 共享语言 | `Todo`、`Storage`、`done` 术语统一 |

整个流程代码极少，但能完整体验到 Skills 方法论的**纪律性**——不是直接开写，而是先对齐、再文档、再拆分、再测试驱动。
