<template>
  <div class="bagu-container">
    <h1 class="page-title">📔 今日八股</h1>
    <p class="page-description">记录我秋招八股学习日志 · 共 {{ posts.length }} 篇</p>

    <div v-if="posts.length" class="posts-grid">
      <RouterLink
        v-for="item in posts"
        :key="item.path"
        :to="item.path"
        class="post-card"
      >
        <div class="card-content">
          <div class="num-wrapper">{{ item.num }}</div>
          <div class="post-info">
            <h3 class="post-title">{{ item.title }}</h3>
            <p v-if="item.desc" class="post-desc">{{ item.desc }}</p>
            <div class="post-meta">
              <span v-for="tag in item.tags" :key="tag" class="post-tag">{{ tag }}</span>
              <span class="post-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div v-else class="bagu-empty">
      还没有八股记录，去 <code>docs/bagu/posts/</code> 写下第一篇吧。
    </div>
  </div>
</template>

<script setup lang="ts">
// 数据由 .vuepress/config.ts 中的 baguPostsPlugin 在构建时扫描 /bagu/posts/ 生成。
// 新增文章后重新构建（dev 下重启）即可自动收录，无需手动维护列表。
// @ts-ignore - 该模块由插件在构建时写入 .temp
import posts from '../.temp/bagu/posts.js'
</script>

<style scoped>
.bagu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.bagu-container .page-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 1rem 0;
  border: none;
  padding: 0;
  color: #1a1a1a;
}

.bagu-container .page-description {
  text-align: center;
  color: var(--text-color-secondary, #6a737d);
  font-size: 1.1rem;
  margin: 0 0 3rem 0;
}

.bagu-container .posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  animation: baguFadeInUp 0.6s ease-out;
}

@media (max-width: 768px) {
  .bagu-container .posts-grid {
    grid-template-columns: 1fr;
  }
}

@keyframes baguFadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bagu-container .post-card {
  display: block;
  background: var(--bg-color-secondary, #f6f8fa);
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
}

.bagu-container .post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border-color: #1a1a1a;
}

.bagu-container .card-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.bagu-container .num-wrapper {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'SF Mono', 'Cascadia Code', Consolas, 'Roboto Mono', monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a1a;
}

.bagu-container .post-info {
  flex: 1;
  min-width: 0;
}

.bagu-container .post-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color, #2c3e50);
  margin: 0 0 0.5rem 0;
  border: none;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bagu-container .post-desc {
  font-size: 0.9rem;
  color: var(--text-color-secondary, #6a737d);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bagu-container .post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.bagu-container .post-tag {
  font-size: 0.75rem;
  line-height: 1.6;
  padding: 1px 8px;
  border-radius: 999px;
  color: #1a1a1a;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.bagu-container .post-date {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-color-secondary, #6a737d);
  font-family: 'SF Mono', 'Cascadia Code', Consolas, 'Roboto Mono', monospace;
  white-space: nowrap;
}

.bagu-container .bagu-empty {
  padding: 40px 0;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color-secondary, #6a737d);
}

.bagu-container .bagu-empty code {
  font-family: 'SF Mono', 'Cascadia Code', Consolas, 'Roboto Mono', monospace;
  background: rgba(0, 0, 0, 0.05);
  padding: 1px 6px;
  border-radius: 4px;
}

</style>

<style>
/* 暗色主题适配（theme-reco 通过 html.dark 切换）
   使用非 scoped 全局样式块，确保 html.dark 前缀选择器能正确编译生效 */
html.dark .bagu-container .post-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .bagu-container .post-card:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
  border-color: rgba(255, 255, 255, 0.35);
}

html.dark .bagu-container .num-wrapper {
  background: rgba(255, 255, 255, 0.9);
}

html.dark .bagu-container .post-title {
  color: rgba(255, 255, 255, 0.92);
}

html.dark .bagu-container .post-desc,
html.dark .bagu-container .page-description,
html.dark .bagu-container .post-date {
  color: rgba(255, 255, 255, 0.6);
}

html.dark .bagu-container .page-title {
  color: rgba(255, 255, 255, 0.92);
}

html.dark .bagu-container .post-tag {
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
}

html.dark .bagu-container .bagu-empty code {
  background: rgba(255, 255, 255, 0.08);
}
</style>
