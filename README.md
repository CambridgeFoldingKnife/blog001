# 剑桥折刀的个人博客 | Cambridge Folding Knife's Blog

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![VuePress](https://img.shields.io/badge/VuePress-2.x-green.svg)
![Theme](https://img.shields.io/badge/theme-vuepress--reco-brightgreen.svg)

## ✨ 特性

- 🎨 **美观主题** - 支持卡片式布局、动画过渡、响应式设计
- 🌐 **多语言支持** - 中文 / 英文 自动切换（可扩展更多语言）
- 🔍 **全局搜索** - 内置搜索，支持关键词高亮
- 🌙 **暗黑模式** - 自动跟随系统，支持手动切换
- 📱 **移动友好** - 完美适配手机、平板、桌面
- 📈 **SEO 优化** - 自动生成 sitemap、meta 标签、RSS 支持
- 🖼️ **图片懒加载** - 提升加载速度
- 📊 **统计分析** - 可选集成Umami（自托管）
- 🧩 **插件丰富** - 代码复制、阅读进度、页面滚动效果等

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:8080` 查看效果

### 构建部署

```bash
npm run build
```

生成的静态文件在 `docs/.vuepress/dist` 目录

## 📂 项目结构

```
CambridgeFoldingKnife-Blog/
├── docs/
│   ├── .vuepress/
│   │   ├── config.ts          # VuePress 配置文件
│   │   ├── public/            # 静态资源（图片、视频等，位于站点根路径）
│   │   ├── styles/            # 自定义样式
│   │   └── client.ts          # 客户端逻辑（含视频居中播放键等）
│   ├── blogs/                 # 博客文章
│   ├── tutorials/             # 教程中心
│   ├── diary/                 # 日常随笔
│   ├── about/                 # 关于页面
│   └── README.md              # 首页
├── package.json
└── README.md
```

## 📝 内容管理

### 添加文章

在对应目录下创建 Markdown 文件，例如：

```markdown
---
title: 文章标题
date: 2025-01-01
categories:
  - 分类
tags:
  - 标签1
  - 标签2
---

文章内容...
```

### 添加教程

在 `docs/tutorials/` 目录下创建对应的教程分类文件夹。

### 在文章中插入视频

写博客时想加演示视频，按下面三步即可：

1. **放视频**：把 `.mp4` 文件放到 `docs/.vuepress/public/videos/`（全站视频统一放这里）。
2. **写标签**：在 Markdown 原文位置写入如下 HTML（项目已开启 `markdown.html: true`）：

   ```html
   <video controls src="/videos/你的文件名.mp4" style="width:100%"></video>
   ```

   - `/videos/文件名.mp4` 中的文件名必须和第一步放的**完全一致**（含大小写、后缀）。
   - 项目已内置全局脚本，`<video>` 会自动加上**居中深色播放键**，无需额外配置。
3. **构建推送**：

   ```bash
   npm run dev       # 先本地预览（http://localhost:8080）确认能播放
   npm run build     # 生成 dist
   git add . && git commit -m "xxx"
   git push origin main
   ```

   > 若直连 GitHub 超时，走本地代理：`git -c http.proxy=http://127.0.0.1:7897 push origin main`

   ⚠️ **视频文件必须被 git 跟踪并推送**，线上才能加载到。若放在 `public/videos/` 下，默认会被正常提交，无需改 `.gitignore`。

**一句话口诀**：视频放 `public/videos/` → 文章写 `<video src="/videos/文件名.mp4">` → `build` + `push` 即上线。

## 🌐 部署

### Vercel（预留，当前未使用）

> ⚠️ `vercel.json` 已预留但**并非当前部署方式**。实际部署走下方的 GitHub Pages。以下保留供将来切换参考：

1. **导入 GitHub 仓库**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "Import Project"
   - 选择此 GitHub 仓库

2. **配置项目**（已自动配置，无需修改）
   - Framework Preset: `VuePress`
   - Output Directory: `docs/.vuepress/dist`
   - Install Command: `npm install --legacy-peer-deps`

3. **部署**
   - 每次推送到 main 分支会自动重新部署

### GitHub Pages（当前实际部署）

项目当前通过 **GitHub Actions 自动构建**，推送 `main` 分支即自动部署，无需手动操作。

```bash
npm run build      # 本地验证构建
git push origin main  # 触发自动部署
```

- **自定义域名**：`camknife.me`（配置在 `docs/.vuepress/public/CNAME`）
- **base 路径**：`/`（见 `docs/.vuepress/config.ts`，适配自定义域名）
- **静态资源**：`docs/.vuepress/public/` 下的文件（含 `videos/`）构建后位于站点根路径 `/videos/...`
- **加速**：域名走 Cloudflare 免费 CDN，国内可访问（首访延迟约 2~3 秒，属正常）

> 代理提示：如果 push 时直连 GitHub 超时，走本地代理即可（如你的代理端口 7897）：
> ```bash
> git -c http.proxy=http://127.0.0.1:7897 push origin main
> ```


## 👤 作者

**剑桥折刀 (Cambridge Folding Knife)**

- 📧 Email: 3144253125@qq.com
- 🐙 GitHub: [@CambridgeFoldingKnife](https://github.com/CambridgeFoldingKnife)

## 📄 许可证

[MIT](LICENSE) © 剑桥折刀


