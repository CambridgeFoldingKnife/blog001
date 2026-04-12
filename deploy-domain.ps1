# 自定义域名部署脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  部署自定义域名 camknife.me" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Git 状态
Write-Host "[1/4] 检查 Git 状态..." -ForegroundColor Yellow
git status

# 2. 添加更改
Write-Host ""
Write-Host "[2/4] 添加更改到暂存区..." -ForegroundColor Yellow
git add .

# 3. 提交更改
Write-Host ""
Write-Host "[3/4] 提交更改..." -ForegroundColor Yellow
git commit -m "配置自定义域名 camknife.me"

# 4. 推送到 GitHub
Write-Host ""
Write-Host "[4/4] 推送到 GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ 部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 等待 GitHub Actions 自动部署（约 2-5 分钟）" -ForegroundColor White
Write-Host "2. 访问 https://github.com/CambridgeFoldingKnife/YIXUAN-Blog/actions 查看部署进度" -ForegroundColor White
Write-Host "3. 部署完成后访问 https://camknife.me 验证" -ForegroundColor White
Write-Host ""
Write-Host "如果遇到问题，请查看 DOMAIN_SETUP.md 文档进行故障排查" -ForegroundColor Yellow
Write-Host ""