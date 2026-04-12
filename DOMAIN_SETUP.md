# 自定义域名配置说明

## 📋 已完成的配置

### 1. GitHub Actions 工作流配置
已更新 `.github/workflows/deploy.yml`，添加了自定义域名：
```yaml
cname: camknife.me
```

### 2. CNAME 文件
已在 `docs/.vuepress/public/CNAME` 创建域名配置文件，内容为：
```
camknife.me
```

## 🚀 部署步骤

### 步骤 1：提交并推送配置
```bash
# 在本地项目根目录执行
git add .
git commit -m "配置自定义域名 camknife.me"
git push origin main
```

### 步骤 2：等待自动部署
推送后，GitHub Actions 会自动执行以下操作：
1. 安装依赖
2. 构建项目（`npm run build`）
3. 将构建产物部署到 `gh-pages` 分支
4. **自动添加 CNAME 文件到构建输出目录**

### 步骤 3：验证部署
等待 2-5 分钟，然后访问：
- https://camknife.me
- https://www.camknife.me

## ⚙️ GitHub Pages 设置检查

### 1. 进入仓库设置
访问：`https://github.com/CambridgeFoldingKnife/YIXUAN-Blog/settings/pages`

### 2. 检查自定义域名
在 **Custom domain** 部分应该显示：
```
camknife.me
```

### 3. 启用 HTTPS
勾选 **Enforce HTTPS** 选项（在 DNS 配置生效后会出现）

## 🌐 DNS 配置验证

### 需要的 DNS 记录

#### 方案 A：使用 A 记录（推荐）
```
类型    主机记录    记录值
A       @          185.199.108.153
A       @          185.199.109.153
A       @          185.199.110.153
A       @          185.199.111.153
```

#### 方案 B：使用 CNAME 记录
```
类型    主机记录    记录值
CNAME   www       CambridgeFoldingKnife.github.io
```

### DNS 配置检查
在你的域名服务商处检查：
1. DNS 记录是否正确添加
2. DNS 是否已生效（通常需要几分钟到几小时）

#### 检查 DNS 是否生效的方法：
```bash
# Windows PowerShell
nslookup camknife.me
nslookup www.camknife.me

# 或使用在线工具
# https://dnschecker.org/
```

## 🔧 故障排查

### 问题 1：访问域名显示 404
**原因**：CNAME 文件未正确部署

**解决方案**：
1. 检查 `gh-pages` 分支是否包含 CNAME 文件
2. 手动在 `gh-pages` 分支根目录添加 CNAME 文件
3. 重新运行 GitHub Actions 部署

### 问题 2：资源文件 404（JS/CSS/图片）
**原因**：VuePress 的 base 路径配置不正确

**解决方案**：
检查 `docs/.vuepress/config.ts` 中的 `base` 配置：

**使用自定义域名时（推荐）**：
```typescript
export default defineUserConfig({
  base: '/',  // ✅ 自定义域名使用根路径
  // ... 其他配置
})
```

**使用 GitHub 默认域名时**：
```typescript
export default defineUserConfig({
  base: '/blog001/',  // ⚠️ 默认域名需要使用仓库名
  // ... 其他配置
})
```

**当前配置**：你的项目使用自定义域名 `camknife.me`，所以 `base: '/'` 是正确的 ✅
```

### 问题 3：DNS 未生效
**原因**：DNS 传播需要时间

**解决方案**：
1. 等待 10 分钟到 48 小时
2. 清除本地 DNS 缓存：
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   ```

### 问题 4：HTTPS 证书问题
**原因**：GitHub Pages 正在生成 SSL 证书

**解决方案**：
1. 等待 15-30 分钟
2. 确保已启用 **Enforce HTTPS**

## 📝 完整配置清单

- [x] 更新 GitHub Actions 工作流（`cname: camknife.me`）
- [x] 创建 CNAME 文件（`docs/.vuepress/public/CNAME`）
- [ ] 提交并推送更改到 GitHub
- [ ] 等待 GitHub Actions 自动部署
- [ ] 检查 GitHub Pages 设置
- [ ] 验证 DNS 配置
- [ ] 启用 HTTPS
- [ ] 测试访问 https://camknife.me

## 🎯 快速验证命令

```bash
# 1. 本地构建测试
npm run build

# 2. 检查构建输出
ls docs/.vuepress/dist/

# 3. 验证 CNAME 文件
cat docs/.vuepress/dist/CNAME

# 4. 本地预览
npm run serve
```

## 💡 注意事项

1. **不要手动修改 gh-pages 分支**：每次推送都会自动重建
2. **CNAME 文件必须小写**：域名必须全部小写
3. **不要包含协议**：CNAME 文件只写域名，不要写 `http://` 或 `https://`
4. **同时支持 www**：建议配置 www 子域名重定向

## 🔗 相关资源

- [GitHub Pages 自定义域名文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [VuePress 2.0 部署文档](https://vuepress.vuejs.org/zh/guide/deploy.html)
- [DNS 检查工具](https://dnschecker.org/)

---

**配置完成时间**：2026-04-08  
**域名**：camknife.me  
**GitHub 仓库**：CambridgeFoldingKnife/blog001  
**框架**：VuePress 2.0 + vuepress-theme-reco