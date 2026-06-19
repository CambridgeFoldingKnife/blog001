# Skills v1 Demo 执行手册：博客分类功能

## 前置条件

- 已安装 `skills v1`：
  ```bash
  npx skills@latest add mattpocock/skills
  ```
- 已在项目中运行过 `/setup-matt-pocock-skills` 并完成配置
- 项目技术栈：Node.js + TypeScript + Express + Prisma + Jest + supertest
- 已有 `Post` 模型：`id`, `title`, `content`, `createdAt`, `updatedAt`

---

## Step 1：需求对齐 `/grill-with-docs`

**操作**：在对话中输入
```markdown
/grill-with-docs

我想给博客加一个分类功能。大概就是一个文章可以属于一个分类，比如"技术""生活"这种。
```

**预期行为**：AI 向你提出 3-5 个澄清问题，例如：
1. 一篇文章只能一个分类还是多个？
2. 分类是否支持层级？
3. 已有文章怎么处理？
4. 是否只改后端？
5. 分类用 name 还是 slug 做唯一标识？

**你的回答**（复制粘贴）：
```markdown
1. 只能属于一个分类（Many-to-One）
2. 不需要层级，扁平结构
3. 允许没有分类，categoryId 可为 null
4. 先只改后端，前端不动
5. 加 slug，name 和 slug 都唯一
```

**验证点**：检查项目根目录是否生成/更新了 `CONTEXT.md`，内容应包含：
- Category 定义（扁平、无层级）
- Post 与 Category 的关系（Many-to-One）
- 命名规范（kebab-case 端点、camelCase 请求体）

---

## Step 2：生成 PRD `/to-prd`

**操作**：在对话中输入
```markdown
/to-prd
```

**预期行为**：AI 自动生成 PRD 文件，检查是否包含：
- Data Model（Prisma schema 片段）
- API 端点设计（GET/POST /categories、GET/POST /posts 更新）
- Validation 规则（slug 唯一、categoryId 存在性校验）
- Acceptance Criteria（复选框列表）
- Non-Goals（明确不做层级、不做前端）

**验证点**：项目 `docs/` 或配置的目标目录下出现新的 PRD 文件，标题为 `category-feature.md` 或类似名称。

---

## Step 3：拆解 Issue `/to-issues`

**操作**：在对话中输入
```markdown
/to-issues
```

**预期行为**：AI 将 PRD 拆分为 3 个独立 Issue：
1. **Issue #1**：数据库迁移（schema 变更 + migrate）
2. **Issue #2**：Category CRUD API（TDD）
3. **Issue #3**：Post 关联 Category（TDD）

**验证点**：`docs/issues/` 目录下出现 3 个 markdown 文件，每个文件包含：
- Description
- Acceptance Criteria（复选框）
- Dependencies（如 #2 blocked by #1）
- Estimated Effort

---

## Step 4：执行 Issue #1（数据库迁移）

**目标**：更新 Prisma Schema，创建 Category 表。

### 4.1 修改 `prisma/schema.prisma`

在 `Post` 模型上方添加 `Category` 模型，并修改 `Post`：

```prisma
model Category {
  id        String   @id @default(uuid())
  name      String   @unique
  slug      String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id         String    @id @default(uuid())
  title      String
  content    String
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

### 4.2 执行迁移命令

```bash
npx prisma migrate dev --name add_category
npx prisma generate
```

**验证点**：数据库中出现 `Category` 表，且 `Post` 表新增了 `categoryId` 字段。

---

## Step 5：执行 Issue #2（Category CRUD API）

**目标**：用 TDD 实现 `GET /categories` 和 `POST /categories`。

**操作**：在对话中输入
```markdown
/tdd

Start Issue #2: Category CRUD API
```

### 5.1 Red：创建测试文件

创建 `src/routes/categories.test.ts`：

```typescript
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';

describe('Category API', () => {
  beforeEach(async () => {
    await prisma.category.deleteMany();
  });

  describe('POST /categories', () => {
    it('should create a category with valid data', async () => {
      const res = await request(app)
        .post('/categories')
        .send({ name: 'Technology', slug: 'technology' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        name: 'Technology',
        slug: 'technology',
      });
    });

    it('should return 400 when name is missing', async () => {
      const res = await request(app)
        .post('/categories')
        .send({ slug: 'tech' });

      expect(res.status).toBe(400);
    });

    it('should return 409 when slug already exists', async () => {
      await prisma.category.create({
        data: { name: 'Tech', slug: 'tech' },
      });

      const res = await request(app)
        .post('/categories')
        .send({ name: 'Technology', slug: 'tech' });

      expect(res.status).toBe(409);
    });
  });

  describe('GET /categories', () => {
    it('should return all categories', async () => {
      await prisma.category.createMany({
        data: [
          { name: 'Tech', slug: 'tech' },
          { name: 'Life', slug: 'life' },
        ],
      });

      const res = await request(app).get('/categories');
      expect(res.status).toBe(200);
      expect(res.body.categories).toHaveLength(2);
    });
  });
});
```

**运行测试**（应失败）：
```bash
npm test -- categories.test.ts
```

### 5.2 Green：实现路由让测试通过

创建 `src/routes/categories.ts`：

```typescript
import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json({ categories });
});

router.post('/', async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ error: 'Name and slug are required' });
  }

  try {
    const category = await prisma.category.create({
      data: { name, slug },
    });
    res.status(201).json(category);
  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(409).json({ error: 'Slug already exists' });
    }
    throw e;
  }
});

export { router as categoryRouter };
```

在 `src/app.ts` 中注册路由（追加）：

```typescript
import { categoryRouter } from './routes/categories';
app.use('/categories', categoryRouter);
```

**运行测试**（应通过）：
```bash
npm test -- categories.test.ts
```

### 5.3 Refactor：提取校验中间件

创建 `src/middleware/validateCategory.ts`：

```typescript
import { Request, Response, NextFunction } from 'express';

export function validateCategory(req: Request, res: Response, next: NextFunction) {
  const { name, slug } = req.body;
  if (!name || !slug || typeof name !== 'string' || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid input', fields: ['name', 'slug'] });
  }
  next();
}
```

修改 `src/routes/categories.ts`，将校验逻辑替换为中间件：

```typescript
import { Router } from 'express';
import { prisma } from '../db';
import { validateCategory } from '../middleware/validateCategory';

const router = Router();

router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ categories });
});

router.post('/', validateCategory, async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json(category);
  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(409).json({ error: 'Conflict', message: 'Slug already exists' });
    }
    throw e;
  }
});

export { router as categoryRouter };
```

**运行测试**（重构后仍应通过）：
```bash
npm test -- categories.test.ts
```

**验证点**：Issue #2 的 Acceptance Criteria 全部勾选完成。

---

## Step 6：执行 Issue #3（Post 关联 Category）

**目标**：让 Post 支持 `categoryId`，并支持按分类筛选。

**操作**：在对话中输入
```markdown
/tdd

Start Issue #3: Link Post to Category
```

### 6.1 Red：写测试

创建 `src/routes/posts.category.test.ts`：

```typescript
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';

describe('Post with Category', () => {
  beforeEach(async () => {
    await prisma.post.deleteMany();
    await prisma.category.deleteMany();
  });

  it('should create post with categoryId', async () => {
    const category = await prisma.category.create({
      data: { name: 'Tech', slug: 'tech' },
    });

    const res = await request(app)
      .post('/posts')
      .send({ title: 'Hello', content: 'World', categoryId: category.id });

    expect(res.status).toBe(201);
    expect(res.body.categoryId).toBe(category.id);
  });

  it('should return 400 for invalid categoryId', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'Hello', content: 'World', categoryId: 'non-existent-id' });

    expect(res.status).toBe(400);
  });

  it('should filter posts by categoryId', async () => {
    const cat = await prisma.category.create({
      data: { name: 'Tech', slug: 'tech' },
    });
    await prisma.post.create({
      data: { title: 'A', content: 'a', categoryId: cat.id },
    });
    await prisma.post.create({
      data: { title: 'B', content: 'b' },
    });

    const res = await request(app).get(`/posts?categoryId=${cat.id}`);
    expect(res.status).toBe(200);
    expect(res.body.posts).toHaveLength(1);
    expect(res.body.posts[0].title).toBe('A');
  });
});
```

**运行测试**（应失败）。

### 6.2 Green：修改 Post 路由

修改现有 `src/routes/posts.ts`（假设已有）：

```typescript
// POST /posts 增加 categoryId 处理
router.post('/', async (req, res) => {
  const { title, content, categoryId } = req.body;

  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }
  }

  const post = await prisma.post.create({
    data: { title, content, categoryId },
  });
  res.status(201).json(post);
});

// GET /posts 增加筛选
router.get('/', async (req, res) => {
  const { categoryId } = req.query;
  const posts = await prisma.post.findMany({
    where: categoryId ? { categoryId: String(categoryId) } : undefined,
    orderBy: { createdAt: 'desc' },
  });
  res.json({ posts });
});
```

**运行测试**（应通过）。

### 6.3 Refactor（可选）

若 `POST /posts` 的校验逻辑与 Category 存在性检查可复用，可提取为 `validateCategoryExists` 中间件。本次改动较小，可不重构。

**验证点**：Issue #3 的 Acceptance Criteria 全部勾选完成。

---

## Step 7：收尾

**操作**：在对话中输入
```markdown
/tdd

Finish Issue #2 and Issue #3, all tests green. Mark as done.
```

**预期行为**：AI 更新对应 Issue 文件，状态改为 `Done`。

---

## 最终验证清单

| 检查项 | 命令/操作 | 预期结果 |
|--------|----------|----------|
| 数据库结构正确 | `npx prisma studio` | 能看到 Category 表和 Post.categoryId 外键 |
| Category 创建成功 | `curl -X POST /categories -d '{"name":"Tech","slug":"tech"}'` | 返回 201 + category 对象 |
| 重复 slug 被拒绝 | 再次执行上一条 | 返回 409 |
| Post 可关联 Category | `curl -X POST /posts -d '{"title":"T","content":"C","categoryId":"xxx"}'` | 返回 201，categoryId 正确 |
| 可按分类筛选 | `curl /posts?categoryId=xxx` | 只返回该分类下的文章 |
| 全部测试通过 | `npm test` | 所有测试套件通过 |

---

## 常见问题

**Q：/tdd 没有自动生成测试？**
A：`/tdd` 是引导性 skill，它提供流程和约束。若 AI 没有直接输出测试代码，你可以明确说："Write the failing test first for POST /categories"。

**Q：Prisma 的 P2002 错误是什么？**
A：唯一键冲突。`prisma.category.create()` 在 name 或 slug 重复时会抛出此错误，我们在 catch 中将其转为 HTTP 409。

**Q：需要先写 Issue #1 才能做 Issue #2 吗？**
A：是的。Issue #2 和 #3 都依赖数据库表存在。`to-issues` 已在文件中标注 `Blocked by #1`。
