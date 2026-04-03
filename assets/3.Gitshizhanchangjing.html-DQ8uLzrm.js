import{_ as n,c as a,d as e,o as l}from"./app-Y56IYxhu.js";const i={};function p(c,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="git实战场景" tabindex="-1"><a class="header-anchor" href="#git实战场景"><span>Git实战场景</span></a></h1><h2 id="一、日常开发场景" tabindex="-1"><a class="header-anchor" href="#一、日常开发场景"><span>一、日常开发场景</span></a></h2><h3 id="_1-1-开始新的一天工作" tabindex="-1"><a class="header-anchor" href="#_1-1-开始新的一天工作"><span>1.1 开始新的一天工作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 切换到主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 拉取最新代码</span></span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 创建今天的工作分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/user-dashboard</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 开始编码</span></span>
<span class="line"><span class="token comment"># ... 开发 ...</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-临时切换任务" tabindex="-1"><a class="header-anchor" href="#_1-2-临时切换任务"><span>1.2 临时切换任务</span></a></h3><p>**场景：**正在开发功能A，突然需要紧急修复bug。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 暂存当前工作</span></span>
<span class="line"><span class="token function">git</span> stash save <span class="token string">&quot;功能A开发到一半&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 切换到主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 创建修复分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix/critical-bug</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 修复bug</span></span>
<span class="line"><span class="token comment"># ... 修复代码 ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 修复关键bug&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 合并到主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge hotfix/critical-bug</span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 回到原来的工作</span></span>
<span class="line"><span class="token function">git</span> checkout feature/user-dashboard</span>
<span class="line"><span class="token function">git</span> stash pop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-多人协作开发同一功能" tabindex="-1"><a class="header-anchor" href="#_1-3-多人协作开发同一功能"><span>1.3 多人协作开发同一功能</span></a></h3><p>**场景：**两个人同时开发一个大功能的不同部分。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 开发者A</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/payment-system</span>
<span class="line"><span class="token comment"># ... 开发支付模块 ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 实现支付核心逻辑&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin feature/payment-system</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 开发者B</span></span>
<span class="line"><span class="token function">git</span> checkout feature/payment-system</span>
<span class="line"><span class="token function">git</span> pull origin feature/payment-system</span>
<span class="line"><span class="token comment"># ... 开发支付UI ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 实现支付界面&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin feature/payment-system</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 定期同步主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"><span class="token function">git</span> checkout feature/payment-system</span>
<span class="line"><span class="token function">git</span> merge master</span>
<span class="line"><span class="token comment"># 解决冲突（如果有）</span></span>
<span class="line"><span class="token function">git</span> push origin feature/payment-system</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-代码审查流程" tabindex="-1"><a class="header-anchor" href="#_1-4-代码审查流程"><span>1.4 代码审查流程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 推送功能分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin feature/new-feature</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 在GitHub/GitLab创建Pull Request</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 审查者提出修改意见后</span></span>
<span class="line"><span class="token function">git</span> checkout feature/new-feature</span>
<span class="line"><span class="token comment"># ... 修改代码 ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;refactor: 根据审查意见优化代码&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin feature/new-feature</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 审查通过，合并到主分支</span></span>
<span class="line"><span class="token comment"># 在Web界面点击Merge按钮</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 本地同步并删除分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature/new-feature</span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> feature/new-feature</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="二、版本发布场景" tabindex="-1"><a class="header-anchor" href="#二、版本发布场景"><span>二、版本发布场景</span></a></h2><h3 id="_2-1-准备发布新版本" tabindex="-1"><a class="header-anchor" href="#_2-1-准备发布新版本"><span>2.1 准备发布新版本</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 从develop分支创建发布分支</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> pull origin develop</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> release/v1.2.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 更新版本号</span></span>
<span class="line"><span class="token comment"># 编辑package.json、version.txt等文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;chore: 更新版本号为1.2.0&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 修复发现的小bug</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 修复发布前发现的bug&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 合并到master并打标签</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge release/v1.2.0</span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.2.0 <span class="token parameter variable">-m</span> <span class="token string">&quot;版本1.2.0发布&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin master <span class="token parameter variable">--tags</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 合并回develop</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge release/v1.2.0</span>
<span class="line"><span class="token function">git</span> push origin develop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 删除发布分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> release/v1.2.0</span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> release/v1.2.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-回滚到上一个版本" tabindex="-1"><a class="header-anchor" href="#_2-2-回滚到上一个版本"><span>2.2 回滚到上一个版本</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方式一：使用revert（推荐，保留历史）</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式二：使用reset（危险，重写历史）</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> v1.1.0</span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式三：创建回滚分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> rollback/v1.1.0 v1.1.0</span>
<span class="line"><span class="token function">git</span> push origin rollback/v1.1.0</span>
<span class="line"><span class="token comment"># 然后部署这个分支</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-热修复生产环境bug" tabindex="-1"><a class="header-anchor" href="#_2-3-热修复生产环境bug"><span>2.3 热修复生产环境bug</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 从master创建热修复分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix/v1.2.1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 修复bug</span></span>
<span class="line"><span class="token comment"># ... 修改代码 ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 修复生产环境关键bug&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 测试修复</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 合并到master</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge hotfix/v1.2.1</span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.2.1 <span class="token parameter variable">-m</span> <span class="token string">&quot;热修复版本1.2.1&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin master <span class="token parameter variable">--tags</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 合并到develop</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge hotfix/v1.2.1</span>
<span class="line"><span class="token function">git</span> push origin develop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 删除热修复分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> hotfix/v1.2.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、冲突解决场景" tabindex="-1"><a class="header-anchor" href="#三、冲突解决场景"><span>三、冲突解决场景</span></a></h2><h3 id="_3-1-合并冲突" tabindex="-1"><a class="header-anchor" href="#_3-1-合并冲突"><span>3.1 合并冲突</span></a></h3><p>**场景：**合并分支时出现冲突。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 尝试合并</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge feature-branch</span>
<span class="line"><span class="token comment"># Auto-merging file.txt</span></span>
<span class="line"><span class="token comment"># CONFLICT (content): Merge conflict in file.txt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 查看冲突文件</span></span>
<span class="line"><span class="token function">git</span> status</span>
<span class="line"><span class="token comment"># Unmerged paths:</span></span>
<span class="line"><span class="token comment">#   both modified:   file.txt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 打开冲突文件</span></span>
<span class="line"><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;</span> HEAD</span>
<span class="line">这是master分支的内容</span>
<span class="line"><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span></span>
<span class="line">这是feature分支的内容</span>
<span class="line"><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> feature-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 手动解决冲突，保留需要的内容</span></span>
<span class="line">这是合并后的最终内容</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 标记为已解决</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 完成合并</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;merge: 合并feature-branch，解决冲突&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-rebase冲突" tabindex="-1"><a class="header-anchor" href="#_3-2-rebase冲突"><span>3.2 Rebase冲突</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 开始rebase</span></span>
<span class="line"><span class="token function">git</span> checkout feature</span>
<span class="line"><span class="token function">git</span> rebase master</span>
<span class="line"><span class="token comment"># CONFLICT (content): Merge conflict in file.txt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 解决冲突</span></span>
<span class="line"><span class="token comment"># 编辑冲突文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 添加已解决的文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 继续rebase</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--continue</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果想放弃rebase</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--abort</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-pull冲突" tabindex="-1"><a class="header-anchor" href="#_3-3-pull冲突"><span>3.3 Pull冲突</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 拉取时出现冲突</span></span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"><span class="token comment"># CONFLICT (content): Merge conflict in file.txt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 解决冲突</span></span>
<span class="line"><span class="token comment"># 编辑冲突文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 添加并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file.txt</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;resolve: 解决pull冲突&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 推送</span></span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-使用工具解决冲突" tabindex="-1"><a class="header-anchor" href="#_3-4-使用工具解决冲突"><span>3.4 使用工具解决冲突</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 配置合并工具（VS Code）</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> merge.tool vscode</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> mergetool.vscode.cmd <span class="token string">&quot;code --wait <span class="token variable">$MERGED</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用工具解决冲突</span></span>
<span class="line"><span class="token function">git</span> mergetool</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 完成后提交</span></span>
<span class="line"><span class="token function">git</span> commit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、错误恢复场景" tabindex="-1"><a class="header-anchor" href="#四、错误恢复场景"><span>四、错误恢复场景</span></a></h2><h3 id="_4-1-撤销未提交的修改" tabindex="-1"><a class="header-anchor" href="#_4-1-撤销未提交的修改"><span>4.1 撤销未提交的修改</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 撤销工作区的修改（未add）</span></span>
<span class="line"><span class="token function">git</span> checkout -- file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销所有工作区修改</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销暂存区的修改（已add未commit）</span></span>
<span class="line"><span class="token function">git</span> reset HEAD file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销所有暂存区修改</span></span>
<span class="line"><span class="token function">git</span> reset HEAD <span class="token builtin class-name">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-修改最后一次提交" tabindex="-1"><a class="header-anchor" href="#_4-2-修改最后一次提交"><span>4.2 修改最后一次提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改提交信息</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;新的提交信息&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加遗漏的文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> forgotten-file.txt</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> --no-edit</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改提交内容</span></span>
<span class="line"><span class="token comment"># 编辑文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-撤销已提交但未推送的提交" tabindex="-1"><a class="header-anchor" href="#_4-3-撤销已提交但未推送的提交"><span>4.3 撤销已提交但未推送的提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方式一：保留修改</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式二：不保留修改</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销多个提交</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-撤销已推送的提交" tabindex="-1"><a class="header-anchor" href="#_4-4-撤销已推送的提交"><span>4.4 撤销已推送的提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方式一：使用revert（推荐）</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式二：使用reset（需要force push）</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> origin master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-恢复删除的文件" tabindex="-1"><a class="header-anchor" href="#_4-5-恢复删除的文件"><span>4.5 恢复删除的文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 恢复工作区删除的文件</span></span>
<span class="line"><span class="token function">git</span> checkout -- deleted-file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复已提交删除的文件</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span> -- deleted-file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查找文件被删除的提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--all</span> --full-history -- deleted-file.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-恢复删除的分支" tabindex="-1"><a class="header-anchor" href="#_4-6-恢复删除的分支"><span>4.6 恢复删除的分支</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 查找分支最后的提交</span></span>
<span class="line"><span class="token function">git</span> reflog</span>
<span class="line"><span class="token comment"># 找到类似这样的记录：</span></span>
<span class="line"><span class="token comment"># abc1234 HEAD@{2}: commit: 最后一次提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 恢复分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> recovered-branch abc1234</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7-恢复删除的提交" tabindex="-1"><a class="header-anchor" href="#_4-7-恢复删除的提交"><span>4.7 恢复删除的提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 查看reflog</span></span>
<span class="line"><span class="token function">git</span> reflog</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 找到要恢复的提交ID</span></span>
<span class="line"><span class="token comment"># abc1234 HEAD@{5}: commit: 被删除的提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 恢复提交</span></span>
<span class="line"><span class="token function">git</span> cherry-pick abc1234</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或者重置到该提交</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> abc1234</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、大型项目管理场景" tabindex="-1"><a class="header-anchor" href="#五、大型项目管理场景"><span>五、大型项目管理场景</span></a></h2><h3 id="_5-1-管理大型仓库" tabindex="-1"><a class="header-anchor" href="#_5-1-管理大型仓库"><span>5.1 管理大型仓库</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 使用浅克隆</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--depth</span> <span class="token number">1</span> https://github.com/large/project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 只克隆单个分支</span></span>
<span class="line"><span class="token function">git</span> clone --single-branch <span class="token parameter variable">--branch</span> master https://github.com/large/project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 使用稀疏检出</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--filter</span><span class="token operator">=</span>blob:none <span class="token parameter variable">--sparse</span> https://github.com/large/project.git</span>
<span class="line"><span class="token builtin class-name">cd</span> project</span>
<span class="line"><span class="token function">git</span> sparse-checkout init <span class="token parameter variable">--cone</span></span>
<span class="line"><span class="token function">git</span> sparse-checkout <span class="token builtin class-name">set</span> src/main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 定期清理</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--aggressive</span></span>
<span class="line"><span class="token function">git</span> prune</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-处理大文件" tabindex="-1"><a class="header-anchor" href="#_5-2-处理大文件"><span>5.2 处理大文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 安装Git LFS</span></span>
<span class="line"><span class="token function">git</span> lfs <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 跟踪大文件类型</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.psd&quot;</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.mp4&quot;</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.zip&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 提交.gitattributes</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> .gitattributes</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;chore: 配置Git LFS&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 正常提交大文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> large-file.psd</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;add: 添加设计文件&quot;</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-拆分大型提交" tabindex="-1"><a class="header-anchor" href="#_5-3-拆分大型提交"><span>5.3 拆分大型提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 重置到上一个提交，保留修改</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 分批添加文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file1.txt file2.txt</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 实现功能A&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file3.txt file4.txt</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 实现功能B&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 推送</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-清理历史中的大文件" tabindex="-1"><a class="header-anchor" href="#_5-4-清理历史中的大文件"><span>5.4 清理历史中的大文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用BFG Repo-Cleaner</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> bfg.jar --strip-blobs-bigger-than 50M repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用filter-branch</span></span>
<span class="line"><span class="token function">git</span> filter-branch --tree-filter <span class="token string">&#39;rm -f large-file.zip&#39;</span> HEAD</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理</span></span>
<span class="line"><span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now <span class="token parameter variable">--aggressive</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、多仓库管理场景" tabindex="-1"><a class="header-anchor" href="#六、多仓库管理场景"><span>六、多仓库管理场景</span></a></h2><h3 id="_6-1-使用子模块" tabindex="-1"><a class="header-anchor" href="#_6-1-使用子模块"><span>6.1 使用子模块</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 添加子模块</span></span>
<span class="line"><span class="token function">git</span> submodule <span class="token function">add</span> https://github.com/user/library.git libs/library</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 克隆包含子模块的项目</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--recursive</span> https://github.com/user/project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 更新子模块</span></span>
<span class="line"><span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 在子模块中工作</span></span>
<span class="line"><span class="token builtin class-name">cd</span> libs/library</span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token comment"># ... 修改代码 ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;update library&quot;</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 更新主项目</span></span>
<span class="line"><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/<span class="token punctuation">..</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> libs/library</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;chore: 更新library子模块&quot;</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-使用git-subtree" tabindex="-1"><a class="header-anchor" href="#_6-2-使用git-subtree"><span>6.2 使用Git Subtree</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 添加subtree</span></span>
<span class="line"><span class="token function">git</span> subtree <span class="token function">add</span> <span class="token parameter variable">--prefix</span><span class="token operator">=</span>libs/library https://github.com/user/library.git master <span class="token parameter variable">--squash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 拉取subtree更新</span></span>
<span class="line"><span class="token function">git</span> subtree pull <span class="token parameter variable">--prefix</span><span class="token operator">=</span>libs/library https://github.com/user/library.git master <span class="token parameter variable">--squash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 推送subtree修改</span></span>
<span class="line"><span class="token function">git</span> subtree push <span class="token parameter variable">--prefix</span><span class="token operator">=</span>libs/library https://github.com/user/library.git master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-monorepo管理" tabindex="-1"><a class="header-anchor" href="#_6-3-monorepo管理"><span>6.3 Monorepo管理</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 项目结构</span></span>
<span class="line">monorepo/</span>
<span class="line">├── packages/</span>
<span class="line">│   ├── app1/</span>
<span class="line">│   ├── app2/</span>
<span class="line">│   └── shared/</span>
<span class="line">└── .git/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只构建修改的包</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> --name-only HEAD~1 <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;packages/app1&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> run build:app1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用工具（如Lerna）</span></span>
<span class="line">npx lerna init</span>
<span class="line">npx lerna bootstrap</span>
<span class="line">npx lerna publish</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、ci-cd集成场景" tabindex="-1"><a class="header-anchor" href="#七、ci-cd集成场景"><span>七、CI/CD集成场景</span></a></h2><h3 id="_7-1-github-actions示例" tabindex="-1"><a class="header-anchor" href="#_7-1-github-actions示例"><span>7.1 GitHub Actions示例</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># .github/workflows/ci.yml</span></span>
<span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CI</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> master<span class="token punctuation">,</span> develop <span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> master <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    </span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;16&#39;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm ci</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run tests</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm test</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run build</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy</span>
<span class="line">      <span class="token key atrule">if</span><span class="token punctuation">:</span> github.ref == &#39;refs/heads/master&#39;</span>
<span class="line">      <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run deploy</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-自动化版本发布" tabindex="-1"><a class="header-anchor" href="#_7-2-自动化版本发布"><span>7.2 自动化版本发布</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用semantic-release</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> --save-dev semantic-release</span>
<span class="line"></span>
<span class="line"><span class="token comment"># .releaserc.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;branches&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;master&quot;</span><span class="token punctuation">]</span>,</span>
<span class="line">  <span class="token string">&quot;plugins&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;@semantic-release/commit-analyzer&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;@semantic-release/release-notes-generator&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;@semantic-release/changelog&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;@semantic-release/npm&quot;</span>,</span>
<span class="line">    <span class="token string">&quot;@semantic-release/git&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提交格式触发自动发布</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 添加新功能&quot;</span>  <span class="token comment"># 触发minor版本</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 修复bug&quot;</span>      <span class="token comment"># 触发patch版本</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat!: 破坏性更新&quot;</span> <span class="token comment"># 触发major版本</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-自动化测试" tabindex="-1"><a class="header-anchor" href="#_7-3-自动化测试"><span>7.3 自动化测试</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># pre-commit hook</span></span>
<span class="line"><span class="token comment">#!/bin/sh</span></span>
<span class="line"><span class="token function">npm</span> run lint</span>
<span class="line"><span class="token function">npm</span> run <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;测试失败，请修复后再提交&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="八、安全和权限场景" tabindex="-1"><a class="header-anchor" href="#八、安全和权限场景"><span>八、安全和权限场景</span></a></h2><h3 id="_8-1-保护敏感信息" tabindex="-1"><a class="header-anchor" href="#_8-1-保护敏感信息"><span>8.1 保护敏感信息</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 创建.env文件存储敏感信息</span></span>
<span class="line"><span class="token assign-left variable">DATABASE_PASSWORD</span><span class="token operator">=</span>secret123</span>
<span class="line"><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span>abc123xyz</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 添加到.gitignore</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;.env&quot;</span> <span class="token operator">&gt;&gt;</span> .gitignore</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 创建.env.example作为模板</span></span>
<span class="line"><span class="token assign-left variable">DATABASE_PASSWORD</span><span class="token operator">=</span>your_password_here</span>
<span class="line"><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span>your_api_key_here</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> .gitignore .env.example</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;chore: 添加环境变量配置&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-从历史中删除敏感信息" tabindex="-1"><a class="header-anchor" href="#_8-2-从历史中删除敏感信息"><span>8.2 从历史中删除敏感信息</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用BFG</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> bfg.jar --delete-files passwords.txt repo.git</span>
<span class="line"><span class="token builtin class-name">cd</span> repo.git</span>
<span class="line"><span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now <span class="token parameter variable">--aggressive</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用filter-branch</span></span>
<span class="line"><span class="token function">git</span> filter-branch <span class="token parameter variable">--force</span> --index-filter <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token string">&quot;git rm --cached --ignore-unmatch config/secrets.yml&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">  --prune-empty --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制推送</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--force</span> <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--force</span> <span class="token parameter variable">--tags</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-签名提交" tabindex="-1"><a class="header-anchor" href="#_8-3-签名提交"><span>8.3 签名提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 生成GPG密钥</span></span>
<span class="line">gpg --full-generate-key</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 查看密钥ID</span></span>
<span class="line">gpg --list-secret-keys --keyid-format LONG</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 配置Git</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.signingkey <span class="token operator">&lt;</span>key-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> commit.gpgsign <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 导出公钥添加到GitHub</span></span>
<span class="line">gpg <span class="token parameter variable">--armor</span> <span class="token parameter variable">--export</span> <span class="token operator">&lt;</span>key-id<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 签名提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-S</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;签名提交&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="九、性能优化场景" tabindex="-1"><a class="header-anchor" href="#九、性能优化场景"><span>九、性能优化场景</span></a></h2><h3 id="_9-1-加速克隆" tabindex="-1"><a class="header-anchor" href="#_9-1-加速克隆"><span>9.1 加速克隆</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 浅克隆</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--depth</span> <span class="token number">1</span> https://github.com/large/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 单分支克隆</span></span>
<span class="line"><span class="token function">git</span> clone --single-branch <span class="token parameter variable">--branch</span> master https://github.com/large/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用镜像</span></span>
<span class="line"><span class="token function">git</span> clone https://gitee.com/mirrors/repo.git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-优化仓库大小" tabindex="-1"><a class="header-anchor" href="#_9-2-优化仓库大小"><span>9.2 优化仓库大小</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 查看仓库大小</span></span>
<span class="line"><span class="token function">git</span> count-objects <span class="token parameter variable">-vH</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 找出大文件</span></span>
<span class="line"><span class="token function">git</span> rev-list <span class="token parameter variable">--objects</span> <span class="token parameter variable">--all</span> <span class="token operator">|</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token function">git</span> cat-file --batch-check<span class="token operator">=</span><span class="token string">&#39;%(objecttype) %(objectname) %(objectsize) %(rest)&#39;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;s/^blob //p&#39;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token function">sort</span> --numeric-sort <span class="token parameter variable">--key</span><span class="token operator">=</span><span class="token number">2</span> <span class="token operator">|</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token function">tail</span> <span class="token parameter variable">-n</span> <span class="token number">10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 清理大文件</span></span>
<span class="line"><span class="token function">git</span> filter-branch --tree-filter <span class="token string">&#39;rm -f large-file.zip&#39;</span> HEAD</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 清理和优化</span></span>
<span class="line"><span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now <span class="token parameter variable">--aggressive</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-加速日常操作" tabindex="-1"><a class="header-anchor" href="#_9-3-加速日常操作"><span>9.3 加速日常操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启用文件系统监控</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> core.fsmonitor <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启用并行处理</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> submodule.fetchJobs <span class="token number">8</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用增量repack</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> repack.useDeltaBaseOffset <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启用commit graph</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> core.commitGraph <span class="token boolean">true</span></span>
<span class="line"><span class="token function">git</span> commit-graph <span class="token function">write</span> <span class="token parameter variable">--reachable</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="十、故障排查场景" tabindex="-1"><a class="header-anchor" href="#十、故障排查场景"><span>十、故障排查场景</span></a></h2><h3 id="_10-1-找出引入bug的提交" tabindex="-1"><a class="header-anchor" href="#_10-1-找出引入bug的提交"><span>10.1 找出引入bug的提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用git bisect</span></span>
<span class="line"><span class="token function">git</span> bisect start</span>
<span class="line"><span class="token function">git</span> bisect bad                    <span class="token comment"># 当前版本有bug</span></span>
<span class="line"><span class="token function">git</span> bisect good v1.0.0           <span class="token comment"># v1.0.0版本正常</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Git会自动切换到中间版本</span></span>
<span class="line"><span class="token comment"># 测试后标记</span></span>
<span class="line"><span class="token function">git</span> bisect good  <span class="token comment"># 或 git bisect bad</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重复直到找到问题提交</span></span>
<span class="line"><span class="token comment"># 找到后</span></span>
<span class="line"><span class="token function">git</span> bisect reset</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-查找丢失的提交" tabindex="-1"><a class="header-anchor" href="#_10-2-查找丢失的提交"><span>10.2 查找丢失的提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看reflog</span></span>
<span class="line"><span class="token function">git</span> reflog</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复丢失的提交</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> recovery <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或cherry-pick</span></span>
<span class="line"><span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-3-修复损坏的仓库" tabindex="-1"><a class="header-anchor" href="#_10-3-修复损坏的仓库"><span>10.3 修复损坏的仓库</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 检查仓库完整性</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">fsck</span> <span class="token parameter variable">--full</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复损坏的对象</span></span>
<span class="line"><span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从远程重新克隆</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/user/repo.git repo-backup</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-4-解决推送被拒绝" tabindex="-1"><a class="header-anchor" href="#_10-4-解决推送被拒绝"><span>10.4 解决推送被拒绝</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 场景：推送时提示&quot;Updates were rejected&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式一：拉取后推送</span></span>
<span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span> origin master</span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式二：强制推送（慎用）</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式三：创建新分支</span></span>
<span class="line"><span class="token function">git</span> push origin HEAD:new-branch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="十一、团队协作最佳实践" tabindex="-1"><a class="header-anchor" href="#十一、团队协作最佳实践"><span>十一、团队协作最佳实践</span></a></h2><h3 id="_11-1-代码审查清单" tabindex="-1"><a class="header-anchor" href="#_11-1-代码审查清单"><span>11.1 代码审查清单</span></a></h3><p><strong>提交前检查：</strong></p><ul class="contains-task-list"><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 代码是否通过所有测试</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 是否遵循代码规范</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 是否添加了必要的注释</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 是否更新了文档</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 提交信息是否清晰</li></ul><p><strong>审查时检查：</strong></p><ul class="contains-task-list"><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 代码逻辑是否正确</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 是否有潜在的性能问题</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 是否有安全隐患</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 是否可以简化</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 测试覆盖是否充分</li></ul><h3 id="_11-2-分支命名规范" tabindex="-1"><a class="header-anchor" href="#_11-2-分支命名规范"><span>11.2 分支命名规范</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 功能分支</span></span>
<span class="line">feature/user-authentication</span>
<span class="line">feature/payment-integration</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修复分支</span></span>
<span class="line">fix/login-error</span>
<span class="line">fix/memory-leak</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 热修复分支</span></span>
<span class="line">hotfix/critical-security-issue</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布分支</span></span>
<span class="line">release/v1.2.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 文档分支</span></span>
<span class="line">docs/api-documentation</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-3-提交信息规范" tabindex="-1"><a class="header-anchor" href="#_11-3-提交信息规范"><span>11.3 提交信息规范</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 格式</span></span>
<span class="line"><span class="token operator">&lt;</span>type<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>scope<span class="token operator">&gt;</span><span class="token punctuation">)</span>: <span class="token operator">&lt;</span>subject<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;</span>body<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;</span>footer<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 示例</span></span>
<span class="line">feat<span class="token punctuation">(</span>auth<span class="token punctuation">)</span>: 添加JWT认证功能</span>
<span class="line"></span>
<span class="line">实现了基于JWT的用户认证系统，包括：</span>
<span class="line">- 用户登录接口</span>
<span class="line">- Token验证中间件</span>
<span class="line">- Token刷新机制</span>
<span class="line"></span>
<span class="line">Closes <span class="token comment">#123</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类型说明：</strong></p><ul><li><code>feat</code>: 新功能</li><li><code>fix</code>: 修复bug</li><li><code>docs</code>: 文档更新</li><li><code>style</code>: 代码格式</li><li><code>refactor</code>: 重构</li><li><code>perf</code>: 性能优化</li><li><code>test</code>: 测试相关</li><li><code>chore</code>: 构建/工具</li></ul><hr><h2 id="十二、实用技巧汇总" tabindex="-1"><a class="header-anchor" href="#十二、实用技巧汇总"><span>十二、实用技巧汇总</span></a></h2><h3 id="_12-1-快捷命令" tabindex="-1"><a class="header-anchor" href="#_12-1-快捷命令"><span>12.1 快捷命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 快速提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;快速提交&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 快速推送</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 快速拉取</span></span>
<span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看简洁日志</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--graph</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看文件修改</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> HEAD</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看暂存区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-2-别名配置" tabindex="-1"><a class="header-anchor" href="#_12-2-别名配置"><span>12.2 别名配置</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加到~/.gitconfig</span></span>
<span class="line"><span class="token punctuation">[</span>alias<span class="token punctuation">]</span></span>
<span class="line">    st <span class="token operator">=</span> status</span>
<span class="line">    co <span class="token operator">=</span> checkout</span>
<span class="line">    br <span class="token operator">=</span> branch</span>
<span class="line">    ci <span class="token operator">=</span> commit</span>
<span class="line">    unstage <span class="token operator">=</span> reset HEAD --</span>
<span class="line">    last <span class="token operator">=</span> log <span class="token parameter variable">-1</span> HEAD</span>
<span class="line">    visual <span class="token operator">=</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span></span>
<span class="line">    amend <span class="token operator">=</span> commit <span class="token parameter variable">--amend</span> --no-edit</span>
<span class="line">    undo <span class="token operator">=</span> reset <span class="token parameter variable">--soft</span> HEAD^</span>
<span class="line">    save <span class="token operator">=</span> stash save</span>
<span class="line">    load <span class="token operator">=</span> stash pop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-3-工作流模板" tabindex="-1"><a class="header-anchor" href="#_12-3-工作流模板"><span>12.3 工作流模板</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 每日工作流</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/today-work</span>
<span class="line"><span class="token comment"># ... 开发 ...</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: 完成今日工作&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin feature/today-work</span>
<span class="line"><span class="token comment"># 创建PR</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 每周同步</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge master</span>
<span class="line"><span class="token function">git</span> push origin develop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>通过这些实战场景，你应该能够：</p><ul><li>✅ 处理日常开发中的各种情况</li><li>✅ 解决常见的Git问题</li><li>✅ 优化团队协作流程</li><li>✅ 提高开发效率</li></ul><p><strong>记住：</strong></p><ol><li>频繁提交，小步快跑</li><li>写清晰的提交信息</li><li>定期同步远程仓库</li><li>遇到问题先查reflog</li><li>重要操作前先备份</li></ol><p><strong>持续实践，不断总结，你会越来越熟练！</strong> 🎯</p>`,127)])])}const r=n(i,[["render",p]]),o=JSON.parse('{"path":"/tutorials/development-tools/git/3.Gitshizhanchangjing.html","title":"Git实战场景","lang":"zh-CN","frontmatter":{"title":"Git实战场景"},"headers":[{"level":2,"title":"一、日常开发场景","slug":"一、日常开发场景","link":"#一、日常开发场景","children":[{"level":3,"title":"1.1 开始新的一天工作","slug":"_1-1-开始新的一天工作","link":"#_1-1-开始新的一天工作","children":[]},{"level":3,"title":"1.2 临时切换任务","slug":"_1-2-临时切换任务","link":"#_1-2-临时切换任务","children":[]},{"level":3,"title":"1.3 多人协作开发同一功能","slug":"_1-3-多人协作开发同一功能","link":"#_1-3-多人协作开发同一功能","children":[]},{"level":3,"title":"1.4 代码审查流程","slug":"_1-4-代码审查流程","link":"#_1-4-代码审查流程","children":[]}]},{"level":2,"title":"二、版本发布场景","slug":"二、版本发布场景","link":"#二、版本发布场景","children":[{"level":3,"title":"2.1 准备发布新版本","slug":"_2-1-准备发布新版本","link":"#_2-1-准备发布新版本","children":[]},{"level":3,"title":"2.2 回滚到上一个版本","slug":"_2-2-回滚到上一个版本","link":"#_2-2-回滚到上一个版本","children":[]},{"level":3,"title":"2.3 热修复生产环境bug","slug":"_2-3-热修复生产环境bug","link":"#_2-3-热修复生产环境bug","children":[]}]},{"level":2,"title":"三、冲突解决场景","slug":"三、冲突解决场景","link":"#三、冲突解决场景","children":[{"level":3,"title":"3.1 合并冲突","slug":"_3-1-合并冲突","link":"#_3-1-合并冲突","children":[]},{"level":3,"title":"3.2 Rebase冲突","slug":"_3-2-rebase冲突","link":"#_3-2-rebase冲突","children":[]},{"level":3,"title":"3.3 Pull冲突","slug":"_3-3-pull冲突","link":"#_3-3-pull冲突","children":[]},{"level":3,"title":"3.4 使用工具解决冲突","slug":"_3-4-使用工具解决冲突","link":"#_3-4-使用工具解决冲突","children":[]}]},{"level":2,"title":"四、错误恢复场景","slug":"四、错误恢复场景","link":"#四、错误恢复场景","children":[{"level":3,"title":"4.1 撤销未提交的修改","slug":"_4-1-撤销未提交的修改","link":"#_4-1-撤销未提交的修改","children":[]},{"level":3,"title":"4.2 修改最后一次提交","slug":"_4-2-修改最后一次提交","link":"#_4-2-修改最后一次提交","children":[]},{"level":3,"title":"4.3 撤销已提交但未推送的提交","slug":"_4-3-撤销已提交但未推送的提交","link":"#_4-3-撤销已提交但未推送的提交","children":[]},{"level":3,"title":"4.4 撤销已推送的提交","slug":"_4-4-撤销已推送的提交","link":"#_4-4-撤销已推送的提交","children":[]},{"level":3,"title":"4.5 恢复删除的文件","slug":"_4-5-恢复删除的文件","link":"#_4-5-恢复删除的文件","children":[]},{"level":3,"title":"4.6 恢复删除的分支","slug":"_4-6-恢复删除的分支","link":"#_4-6-恢复删除的分支","children":[]},{"level":3,"title":"4.7 恢复删除的提交","slug":"_4-7-恢复删除的提交","link":"#_4-7-恢复删除的提交","children":[]}]},{"level":2,"title":"五、大型项目管理场景","slug":"五、大型项目管理场景","link":"#五、大型项目管理场景","children":[{"level":3,"title":"5.1 管理大型仓库","slug":"_5-1-管理大型仓库","link":"#_5-1-管理大型仓库","children":[]},{"level":3,"title":"5.2 处理大文件","slug":"_5-2-处理大文件","link":"#_5-2-处理大文件","children":[]},{"level":3,"title":"5.3 拆分大型提交","slug":"_5-3-拆分大型提交","link":"#_5-3-拆分大型提交","children":[]},{"level":3,"title":"5.4 清理历史中的大文件","slug":"_5-4-清理历史中的大文件","link":"#_5-4-清理历史中的大文件","children":[]}]},{"level":2,"title":"六、多仓库管理场景","slug":"六、多仓库管理场景","link":"#六、多仓库管理场景","children":[{"level":3,"title":"6.1 使用子模块","slug":"_6-1-使用子模块","link":"#_6-1-使用子模块","children":[]},{"level":3,"title":"6.2 使用Git Subtree","slug":"_6-2-使用git-subtree","link":"#_6-2-使用git-subtree","children":[]},{"level":3,"title":"6.3 Monorepo管理","slug":"_6-3-monorepo管理","link":"#_6-3-monorepo管理","children":[]}]},{"level":2,"title":"七、CI/CD集成场景","slug":"七、ci-cd集成场景","link":"#七、ci-cd集成场景","children":[{"level":3,"title":"7.1 GitHub Actions示例","slug":"_7-1-github-actions示例","link":"#_7-1-github-actions示例","children":[]},{"level":3,"title":"7.2 自动化版本发布","slug":"_7-2-自动化版本发布","link":"#_7-2-自动化版本发布","children":[]},{"level":3,"title":"7.3 自动化测试","slug":"_7-3-自动化测试","link":"#_7-3-自动化测试","children":[]}]},{"level":2,"title":"八、安全和权限场景","slug":"八、安全和权限场景","link":"#八、安全和权限场景","children":[{"level":3,"title":"8.1 保护敏感信息","slug":"_8-1-保护敏感信息","link":"#_8-1-保护敏感信息","children":[]},{"level":3,"title":"8.2 从历史中删除敏感信息","slug":"_8-2-从历史中删除敏感信息","link":"#_8-2-从历史中删除敏感信息","children":[]},{"level":3,"title":"8.3 签名提交","slug":"_8-3-签名提交","link":"#_8-3-签名提交","children":[]}]},{"level":2,"title":"九、性能优化场景","slug":"九、性能优化场景","link":"#九、性能优化场景","children":[{"level":3,"title":"9.1 加速克隆","slug":"_9-1-加速克隆","link":"#_9-1-加速克隆","children":[]},{"level":3,"title":"9.2 优化仓库大小","slug":"_9-2-优化仓库大小","link":"#_9-2-优化仓库大小","children":[]},{"level":3,"title":"9.3 加速日常操作","slug":"_9-3-加速日常操作","link":"#_9-3-加速日常操作","children":[]}]},{"level":2,"title":"十、故障排查场景","slug":"十、故障排查场景","link":"#十、故障排查场景","children":[{"level":3,"title":"10.1 找出引入bug的提交","slug":"_10-1-找出引入bug的提交","link":"#_10-1-找出引入bug的提交","children":[]},{"level":3,"title":"10.2 查找丢失的提交","slug":"_10-2-查找丢失的提交","link":"#_10-2-查找丢失的提交","children":[]},{"level":3,"title":"10.3 修复损坏的仓库","slug":"_10-3-修复损坏的仓库","link":"#_10-3-修复损坏的仓库","children":[]},{"level":3,"title":"10.4 解决推送被拒绝","slug":"_10-4-解决推送被拒绝","link":"#_10-4-解决推送被拒绝","children":[]}]},{"level":2,"title":"十一、团队协作最佳实践","slug":"十一、团队协作最佳实践","link":"#十一、团队协作最佳实践","children":[{"level":3,"title":"11.1 代码审查清单","slug":"_11-1-代码审查清单","link":"#_11-1-代码审查清单","children":[]},{"level":3,"title":"11.2 分支命名规范","slug":"_11-2-分支命名规范","link":"#_11-2-分支命名规范","children":[]},{"level":3,"title":"11.3 提交信息规范","slug":"_11-3-提交信息规范","link":"#_11-3-提交信息规范","children":[]}]},{"level":2,"title":"十二、实用技巧汇总","slug":"十二、实用技巧汇总","link":"#十二、实用技巧汇总","children":[{"level":3,"title":"12.1 快捷命令","slug":"_12-1-快捷命令","link":"#_12-1-快捷命令","children":[]},{"level":3,"title":"12.2 别名配置","slug":"_12-2-别名配置","link":"#_12-2-别名配置","children":[]},{"level":3,"title":"12.3 工作流模板","slug":"_12-3-工作流模板","link":"#_12-3-工作流模板","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/development-tools/git/3.Git实战场景.md"}');export{r as comp,o as data};
