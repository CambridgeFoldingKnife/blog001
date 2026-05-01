import{_ as n,c as a,d as e,o as l}from"./app-1Coc8Pre.js";const i={};function p(t,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="git进阶技巧" tabindex="-1"><a class="header-anchor" href="#git进阶技巧"><span>Git进阶技巧</span></a></h1><h2 id="一、高级分支操作" tabindex="-1"><a class="header-anchor" href="#一、高级分支操作"><span>一、高级分支操作</span></a></h2><h3 id="_1-1-变基-rebase" tabindex="-1"><a class="header-anchor" href="#_1-1-变基-rebase"><span>1.1 变基（Rebase）</span></a></h3><p><strong>什么是Rebase？</strong></p><p>Rebase可以让提交历史更加整洁，将分支的提交&quot;移动&quot;到另一个分支上。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 在feature分支上执行</span></span>
<span class="line"><span class="token function">git</span> checkout feature</span>
<span class="line"><span class="token function">git</span> rebase master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 等同于将feature分支的提交重新应用到master最新提交之后</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Merge vs Rebase：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># Merge方式</span>
<span class="line">master:    A---B---C---F</span>
<span class="line">                    /</span>
<span class="line">feature:       D---E</span>
<span class="line"></span>
<span class="line"># Rebase方式</span>
<span class="line">master:    A---B---C</span>
<span class="line">                    \\</span>
<span class="line">feature:             D&#39;---E&#39;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>交互式Rebase：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改最近3次提交</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在编辑器中可以：</span></span>
<span class="line"><span class="token comment"># pick: 保留提交</span></span>
<span class="line"><span class="token comment"># reword: 修改提交信息</span></span>
<span class="line"><span class="token comment"># edit: 修改提交内容</span></span>
<span class="line"><span class="token comment"># squash: 合并到上一个提交</span></span>
<span class="line"><span class="token comment"># drop: 删除提交</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-cherry-pick" tabindex="-1"><a class="header-anchor" href="#_1-2-cherry-pick"><span>1.2 Cherry-pick</span></a></h3><p>选择特定的提交应用到当前分支：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 应用某个提交</span></span>
<span class="line"><span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 应用多个提交</span></span>
<span class="line"><span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commit-id<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token operator">&lt;</span>commit-id<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 应用提交但不自动提交</span></span>
<span class="line"><span class="token function">git</span> cherry-pick <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-分支策略详解" tabindex="-1"><a class="header-anchor" href="#_1-3-分支策略详解"><span>1.3 分支策略详解</span></a></h3><p><strong>Git Flow完整流程：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 初始化Git Flow</span></span>
<span class="line"><span class="token function">git</span> flow init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 开始新功能</span></span>
<span class="line"><span class="token function">git</span> flow feature start user-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 完成功能</span></span>
<span class="line"><span class="token function">git</span> flow feature finish user-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 开始发布</span></span>
<span class="line"><span class="token function">git</span> flow release start <span class="token number">1.0</span>.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 完成发布</span></span>
<span class="line"><span class="token function">git</span> flow release finish <span class="token number">1.0</span>.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 紧急修复</span></span>
<span class="line"><span class="token function">git</span> flow hotfix start critical-bug</span>
<span class="line"><span class="token function">git</span> flow hotfix finish critical-bug</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="二、标签管理" tabindex="-1"><a class="header-anchor" href="#二、标签管理"><span>二、标签管理</span></a></h2><h3 id="_2-1-创建标签" tabindex="-1"><a class="header-anchor" href="#_2-1-创建标签"><span>2.1 创建标签</span></a></h3><p><strong>轻量标签：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> tag v1.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>附注标签（推荐）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.0.0 <span class="token parameter variable">-m</span> <span class="token string">&quot;版本1.0.0发布&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>为历史提交打标签：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v0.9.0 <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;版本0.9.0&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-2-查看标签" tabindex="-1"><a class="header-anchor" href="#_2-2-查看标签"><span>2.2 查看标签</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看所有标签</span></span>
<span class="line"><span class="token function">git</span> tag</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看标签详情</span></span>
<span class="line"><span class="token function">git</span> show v1.0.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看符合模式的标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-l</span> <span class="token string">&quot;v1.*&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-推送标签" tabindex="-1"><a class="header-anchor" href="#_2-3-推送标签"><span>2.3 推送标签</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 推送单个标签</span></span>
<span class="line"><span class="token function">git</span> push origin v1.0.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送所有标签</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--tags</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除本地标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-d</span> v1.0.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除远程标签</span></span>
<span class="line"><span class="token function">git</span> push origin :refs/tags/v1.0.0</span>
<span class="line"><span class="token comment"># 或</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> v1.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、子模块-submodule" tabindex="-1"><a class="header-anchor" href="#三、子模块-submodule"><span>三、子模块（Submodule）</span></a></h2><h3 id="_3-1-添加子模块" tabindex="-1"><a class="header-anchor" href="#_3-1-添加子模块"><span>3.1 添加子模块</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加子模块</span></span>
<span class="line"><span class="token function">git</span> submodule <span class="token function">add</span> https://github.com/user/library.git libs/library</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 初始化子模块</span></span>
<span class="line"><span class="token function">git</span> submodule init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新子模块</span></span>
<span class="line"><span class="token function">git</span> submodule update</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-克隆包含子模块的项目" tabindex="-1"><a class="header-anchor" href="#_3-2-克隆包含子模块的项目"><span>3.2 克隆包含子模块的项目</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方式一：克隆后初始化</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/user/project.git</span>
<span class="line"><span class="token builtin class-name">cd</span> project</span>
<span class="line"><span class="token function">git</span> submodule init</span>
<span class="line"><span class="token function">git</span> submodule update</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式二：克隆时自动初始化</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--recursive</span> https://github.com/user/project.git</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-更新子模块" tabindex="-1"><a class="header-anchor" href="#_3-3-更新子模块"><span>3.3 更新子模块</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 更新所有子模块</span></span>
<span class="line"><span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新特定子模块</span></span>
<span class="line"><span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span> libs/library</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、git工作流" tabindex="-1"><a class="header-anchor" href="#四、git工作流"><span>四、Git工作流</span></a></h2><h3 id="_4-1-集中式工作流" tabindex="-1"><a class="header-anchor" href="#_4-1-集中式工作流"><span>4.1 集中式工作流</span></a></h3><p>适合小团队，所有人都在master分支上工作。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 克隆仓库</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 修改代码</span></span>
<span class="line"><span class="token comment"># ... 编写代码 ...</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;完成功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 拉取最新代码</span></span>
<span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 推送</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-功能分支工作流" tabindex="-1"><a class="header-anchor" href="#_4-2-功能分支工作流"><span>4.2 功能分支工作流</span></a></h3><p>每个功能都在独立分支上开发。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/user-profile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 开发功能</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;实现用户资料页面&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin feature/user-profile</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 创建Pull Request</span></span>
<span class="line"><span class="token comment"># 在GitHub/GitLab上操作</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 代码审查后合并</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"><span class="token function">git</span> merge feature/user-profile</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-gitflow工作流" tabindex="-1"><a class="header-anchor" href="#_4-3-gitflow工作流"><span>4.3 Gitflow工作流</span></a></h3><p>适合有计划发布周期的项目。</p><p><strong>分支说明：</strong></p><ul><li><code>master</code>: 生产环境代码</li><li><code>develop</code>: 开发环境代码</li><li><code>feature/*</code>: 功能分支</li><li><code>release/*</code>: 发布分支</li><li><code>hotfix/*</code>: 紧急修复分支</li></ul><p><strong>完整流程：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 开发新功能</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/shopping-cart</span>
<span class="line"><span class="token comment"># ... 开发 ...</span></span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge feature/shopping-cart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 准备发布</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> release/1.2.0 develop</span>
<span class="line"><span class="token comment"># ... 修复bug ...</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge release/1.2.0</span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.2.0</span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge release/1.2.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 紧急修复</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix/critical-bug master</span>
<span class="line"><span class="token comment"># ... 修复 ...</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge hotfix/critical-bug</span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.2.1</span>
<span class="line"><span class="token function">git</span> checkout develop</span>
<span class="line"><span class="token function">git</span> merge hotfix/critical-bug</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-forking工作流" tabindex="-1"><a class="header-anchor" href="#_4-4-forking工作流"><span>4.4 Forking工作流</span></a></h3><p>适合开源项目。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. Fork项目到自己账号</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 克隆自己的仓库</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/yourname/project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 添加上游仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> upstream https://github.com/original/project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/new-feature</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 开发并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;添加新功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 推送到自己的仓库</span></span>
<span class="line"><span class="token function">git</span> push origin feature/new-feature</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 创建Pull Request到原仓库</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 8. 同步上游更新</span></span>
<span class="line"><span class="token function">git</span> fetch upstream</span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge upstream/master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、高级技巧" tabindex="-1"><a class="header-anchor" href="#五、高级技巧"><span>五、高级技巧</span></a></h2><h3 id="_5-1-stash进阶" tabindex="-1"><a class="header-anchor" href="#_5-1-stash进阶"><span>5.1 Stash进阶</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 暂存包括未跟踪的文件</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token parameter variable">-u</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 暂存所有文件（包括忽略的）</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token parameter variable">-a</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 暂存时添加说明</span></span>
<span class="line"><span class="token function">git</span> stash save <span class="token string">&quot;工作进行到一半&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看stash内容</span></span>
<span class="line"><span class="token function">git</span> stash show <span class="token parameter variable">-p</span> stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从stash创建分支</span></span>
<span class="line"><span class="token function">git</span> stash branch new-branch stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清空所有stash</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token function">clear</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-搜索和查找" tabindex="-1"><a class="header-anchor" href="#_5-2-搜索和查找"><span>5.2 搜索和查找</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 在提交历史中搜索</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--grep</span><span class="token operator">=</span><span class="token string">&quot;关键词&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 搜索代码</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">grep</span> <span class="token string">&quot;function_name&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查找引入bug的提交</span></span>
<span class="line"><span class="token function">git</span> bisect start</span>
<span class="line"><span class="token function">git</span> bisect bad                 <span class="token comment"># 当前版本有bug</span></span>
<span class="line"><span class="token function">git</span> bisect good <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span>    <span class="token comment"># 某个版本没有bug</span></span>
<span class="line"><span class="token comment"># Git会自动二分查找，测试后标记</span></span>
<span class="line"><span class="token function">git</span> bisect good/bad</span>
<span class="line"><span class="token comment"># 找到后</span></span>
<span class="line"><span class="token function">git</span> bisect reset</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-重写历史" tabindex="-1"><a class="header-anchor" href="#_5-3-重写历史"><span>5.3 重写历史</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改最近的提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 合并多个提交</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拆分提交</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3</span>
<span class="line"><span class="token comment"># 标记为edit</span></span>
<span class="line"><span class="token function">git</span> reset HEAD^</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file1</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;提交1&quot;</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file2</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;提交2&quot;</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--continue</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改作者信息</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token string">&quot;Name &lt;email@example.com&gt;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-清理和维护" tabindex="-1"><a class="header-anchor" href="#_5-4-清理和维护"><span>5.4 清理和维护</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 清理未跟踪的文件</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-n</span>    <span class="token comment"># 预览</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-f</span>    <span class="token comment"># 删除文件</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-fd</span>   <span class="token comment"># 删除文件和目录</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 垃圾回收</span></span>
<span class="line"><span class="token function">git</span> gc</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 优化仓库</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--aggressive</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查仓库完整性</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">fsck</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看仓库大小</span></span>
<span class="line"><span class="token function">git</span> count-objects <span class="token parameter variable">-vH</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、git-hooks" tabindex="-1"><a class="header-anchor" href="#六、git-hooks"><span>六、Git Hooks</span></a></h2><h3 id="_6-1-什么是git-hooks" tabindex="-1"><a class="header-anchor" href="#_6-1-什么是git-hooks"><span>6.1 什么是Git Hooks？</span></a></h3><p>Git Hooks是在特定事件发生时自动执行的脚本。</p><p><strong>常用Hooks：</strong></p><ul><li><code>pre-commit</code>: 提交前执行</li><li><code>commit-msg</code>: 提交信息验证</li><li><code>pre-push</code>: 推送前执行</li><li><code>post-merge</code>: 合并后执行</li></ul><h3 id="_6-2-创建hook示例" tabindex="-1"><a class="header-anchor" href="#_6-2-创建hook示例"><span>6.2 创建Hook示例</span></a></h3><p><strong>pre-commit（代码检查）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token comment"># .git/hooks/pre-commit</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行代码检查</span></span>
<span class="line"><span class="token function">npm</span> run lint</span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;代码检查失败，请修复后再提交&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>commit-msg（提交信息验证）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token comment"># .git/hooks/commit-msg</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">commit_msg</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> $1<span class="token variable">)</span></span></span>
<span class="line"><span class="token assign-left variable">pattern</span><span class="token operator">=</span><span class="token string">&quot;^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token operator">!</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$commit_msg</span>&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-qE</span> <span class="token string">&quot;<span class="token variable">$pattern</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;提交信息格式错误！&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;格式：&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-使用husky管理hooks" tabindex="-1"><a class="header-anchor" href="#_6-3-使用husky管理hooks"><span>6.3 使用Husky管理Hooks</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装husky</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> husky --save-dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 初始化</span></span>
<span class="line">npx husky <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加pre-commit hook</span></span>
<span class="line">npx husky <span class="token function">add</span> .husky/pre-commit <span class="token string">&quot;npm test&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加commit-msg hook</span></span>
<span class="line">npx husky <span class="token function">add</span> .husky/commit-msg <span class="token string">&#39;npx --no -- commitlint --edit &quot;$1&quot;&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、性能优化" tabindex="-1"><a class="header-anchor" href="#七、性能优化"><span>七、性能优化</span></a></h2><h3 id="_7-1-大文件处理" tabindex="-1"><a class="header-anchor" href="#_7-1-大文件处理"><span>7.1 大文件处理</span></a></h3><p><strong>使用Git LFS（Large File Storage）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 安装Git LFS</span></span>
<span class="line"><span class="token function">git</span> lfs <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跟踪大文件</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.psd&quot;</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.mp4&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看跟踪的文件</span></span>
<span class="line"><span class="token function">git</span> lfs ls-files</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提交.gitattributes</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> .gitattributes</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;配置Git LFS&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-浅克隆" tabindex="-1"><a class="header-anchor" href="#_7-2-浅克隆"><span>7.2 浅克隆</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 只克隆最近的提交</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--depth</span> <span class="token number">1</span> <span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 克隆单个分支</span></span>
<span class="line"><span class="token function">git</span> clone --single-branch <span class="token parameter variable">--branch</span> master <span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后续获取完整历史</span></span>
<span class="line"><span class="token function">git</span> fetch <span class="token parameter variable">--unshallow</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-稀疏检出" tabindex="-1"><a class="header-anchor" href="#_7-3-稀疏检出"><span>7.3 稀疏检出</span></a></h3><p>只检出部分文件：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--filter</span><span class="token operator">=</span>blob:none <span class="token parameter variable">--sparse</span> <span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span></span>
<span class="line"><span class="token builtin class-name">cd</span> repository</span>
<span class="line"><span class="token function">git</span> sparse-checkout init <span class="token parameter variable">--cone</span></span>
<span class="line"><span class="token function">git</span> sparse-checkout <span class="token builtin class-name">set</span> src/main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="八、团队协作技巧" tabindex="-1"><a class="header-anchor" href="#八、团队协作技巧"><span>八、团队协作技巧</span></a></h2><h3 id="_8-1-代码审查流程" tabindex="-1"><a class="header-anchor" href="#_8-1-代码审查流程"><span>8.1 代码审查流程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/new-api</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 开发并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat(api): 添加新API接口&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin feature/new-api</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 创建Pull Request</span></span>
<span class="line"><span class="token comment"># 在GitHub/GitLab上操作</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 代码审查</span></span>
<span class="line"><span class="token comment"># 审查者在PR中评论</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 修改代码</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix: 根据审查意见修改&quot;</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 审查通过后合并</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-解决合并冲突" tabindex="-1"><a class="header-anchor" href="#_8-2-解决合并冲突"><span>8.2 解决合并冲突</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 拉取最新代码</span></span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 出现冲突</span></span>
<span class="line"><span class="token comment"># CONFLICT (content): Merge conflict in file.txt</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 查看冲突文件</span></span>
<span class="line"><span class="token function">git</span> status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 编辑冲突文件</span></span>
<span class="line"><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;</span> HEAD</span>
<span class="line">当前分支的内容</span>
<span class="line"><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span></span>
<span class="line">要合并分支的内容</span>
<span class="line"><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> branch-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 解决后标记</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 完成合并</span></span>
<span class="line"><span class="token function">git</span> commit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用合并工具：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 配置合并工具</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> merge.tool vimdiff</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用工具解决冲突</span></span>
<span class="line"><span class="token function">git</span> mergetool</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-保持分支同步" tabindex="-1"><a class="header-anchor" href="#_8-3-保持分支同步"><span>8.3 保持分支同步</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 定期同步主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将主分支合并到功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout feature-branch</span>
<span class="line"><span class="token function">git</span> merge master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用rebase保持历史整洁</span></span>
<span class="line"><span class="token function">git</span> rebase master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="九、安全和权限" tabindex="-1"><a class="header-anchor" href="#九、安全和权限"><span>九、安全和权限</span></a></h2><h3 id="_9-1-签名提交" tabindex="-1"><a class="header-anchor" href="#_9-1-签名提交"><span>9.1 签名提交</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 生成GPG密钥</span></span>
<span class="line">gpg --gen-key</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看密钥</span></span>
<span class="line">gpg --list-keys</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置Git使用GPG</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.signingkey <span class="token operator">&lt;</span>key-id<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 签名提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-S</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;签名提交&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 默认签名所有提交</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> commit.gpgsign <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证签名</span></span>
<span class="line"><span class="token function">git</span> log --show-signature</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-保护敏感信息" tabindex="-1"><a class="header-anchor" href="#_9-2-保护敏感信息"><span>9.2 保护敏感信息</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用git-secrets防止提交敏感信息</span></span>
<span class="line"><span class="token function">git</span> secrets <span class="token parameter variable">--install</span></span>
<span class="line"><span class="token function">git</span> secrets --register-aws</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 扫描历史</span></span>
<span class="line"><span class="token function">git</span> secrets --scan-history</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从历史中删除敏感文件</span></span>
<span class="line"><span class="token function">git</span> filter-branch <span class="token parameter variable">--force</span> --index-filter <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token string">&quot;git rm --cached --ignore-unmatch path/to/secret.txt&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">  --prune-empty --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用BFG Repo-Cleaner：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除大文件</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> bfg.jar --strip-blobs-bigger-than 100M repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除敏感文件</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> bfg.jar --delete-files passwords.txt repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理</span></span>
<span class="line"><span class="token builtin class-name">cd</span> repo.git</span>
<span class="line"><span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now <span class="token parameter variable">--aggressive</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="十、故障排查" tabindex="-1"><a class="header-anchor" href="#十、故障排查"><span>十、故障排查</span></a></h2><h3 id="_10-1-常见问题" tabindex="-1"><a class="header-anchor" href="#_10-1-常见问题"><span>10.1 常见问题</span></a></h3><p><strong>问题1：提交到错误的分支</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 撤销最后一次提交，保留修改</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换到正确的分支</span></span>
<span class="line"><span class="token function">git</span> checkout correct-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重新提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;提交信息&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题2：需要撤销已推送的提交</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用revert（推荐）</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用reset（危险）</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题3：恢复删除的分支</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查找分支的最后一次提交</span></span>
<span class="line"><span class="token function">git</span> reflog</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> recovered-branch <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题4：合并后想撤销</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 如果还没推送</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果已经推送</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token parameter variable">-m</span> <span class="token number">1</span> <span class="token operator">&lt;</span>merge-commit-id<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-调试技巧" tabindex="-1"><a class="header-anchor" href="#_10-2-调试技巧"><span>10.2 调试技巧</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看引用日志</span></span>
<span class="line"><span class="token function">git</span> reflog</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看对象信息</span></span>
<span class="line"><span class="token function">git</span> cat-file <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>object-id<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看文件历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--follow</span> -- filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看谁修改了某一行</span></span>
<span class="line"><span class="token function">git</span> blame filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看两个提交的差异</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> commit1 commit2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看分支差异</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> master<span class="token punctuation">..</span>feature</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="十一、git配置优化" tabindex="-1"><a class="header-anchor" href="#十一、git配置优化"><span>十一、Git配置优化</span></a></h2><h3 id="_11-1-全局配置" tabindex="-1"><a class="header-anchor" href="#_11-1-全局配置"><span>11.1 全局配置</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置默认编辑器</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> core.editor <span class="token string">&quot;code --wait&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置差异工具</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> diff.tool vscode</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> difftool.vscode.cmd <span class="token string">&quot;code --wait --diff <span class="token variable">$LOCAL</span> <span class="token variable">$REMOTE</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置合并工具</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> merge.tool vscode</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> mergetool.vscode.cmd <span class="token string">&quot;code --wait <span class="token variable">$MERGED</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 自动纠正命令</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> help.autocorrect <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置默认分支名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> init.defaultBranch main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置推送策略</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> push.default current</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置拉取策略</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> pull.rebase <span class="token boolean">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-2-别名配置" tabindex="-1"><a class="header-anchor" href="#_11-2-别名配置"><span>11.2 别名配置</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 常用别名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.st status</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.co checkout</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.br branch</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.ci commit</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.unstage <span class="token string">&#39;reset HEAD --&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.last <span class="token string">&#39;log -1 HEAD&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.visual <span class="token string">&#39;log --graph --oneline --all&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.amend <span class="token string">&#39;commit --amend --no-edit&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-3-gitconfig示例" tabindex="-1"><a class="header-anchor" href="#_11-3-gitconfig示例"><span>11.3 .gitconfig示例</span></a></h3><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">user</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">name</span> <span class="token punctuation">=</span> <span class="token value attr-value">Your Name</span></span>
<span class="line">    <span class="token key attr-name">email</span> <span class="token punctuation">=</span> <span class="token value attr-value">your.email@example.com</span></span>
<span class="line">    <span class="token key attr-name">signingkey</span> <span class="token punctuation">=</span> <span class="token value attr-value">GPG_KEY_ID</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">core</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">editor</span> <span class="token punctuation">=</span> <span class="token value attr-value">code --wait</span></span>
<span class="line">    <span class="token key attr-name">autocrlf</span> <span class="token punctuation">=</span> <span class="token value attr-value">input</span></span>
<span class="line">    <span class="token key attr-name">ignorecase</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">color</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">ui</span> <span class="token punctuation">=</span> <span class="token value attr-value">auto</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">alias</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">st</span> <span class="token punctuation">=</span> <span class="token value attr-value">status</span></span>
<span class="line">    <span class="token key attr-name">co</span> <span class="token punctuation">=</span> <span class="token value attr-value">checkout</span></span>
<span class="line">    <span class="token key attr-name">br</span> <span class="token punctuation">=</span> <span class="token value attr-value">branch</span></span>
<span class="line">    <span class="token key attr-name">ci</span> <span class="token punctuation">=</span> <span class="token value attr-value">commit</span></span>
<span class="line">    <span class="token key attr-name">lg</span> <span class="token punctuation">=</span> <span class="token value attr-value">log --graph --pretty=format:&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">push</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">default</span> <span class="token punctuation">=</span> <span class="token value attr-value">current</span></span>
<span class="line">    <span class="token key attr-name">followTags</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">pull</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">rebase</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">merge</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">tool</span> <span class="token punctuation">=</span> <span class="token value attr-value">vscode</span></span>
<span class="line">    <span class="token key attr-name">conflictstyle</span> <span class="token punctuation">=</span> <span class="token value attr-value">diff3</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">diff</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">tool</span> <span class="token punctuation">=</span> <span class="token value attr-value">vscode</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">commit</span><span class="token punctuation">]</span></span></span>
<span class="line">    <span class="token key attr-name">gpgsign</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="十二、最佳实践总结" tabindex="-1"><a class="header-anchor" href="#十二、最佳实践总结"><span>十二、最佳实践总结</span></a></h2><h3 id="_12-1-提交规范" tabindex="-1"><a class="header-anchor" href="#_12-1-提交规范"><span>12.1 提交规范</span></a></h3><p>✅ <strong>DO（推荐）：</strong></p><ul><li>频繁提交，每次提交只做一件事</li><li>写清晰的提交信息</li><li>提交前进行代码审查</li><li>使用规范的提交格式</li></ul><p>❌ <strong>DON&#39;T（避免）：</strong></p><ul><li>提交未测试的代码</li><li>提交包含多个功能的大提交</li><li>使用模糊的提交信息（如&quot;fix bug&quot;）</li><li>提交敏感信息</li></ul><h3 id="_12-2-分支管理" tabindex="-1"><a class="header-anchor" href="#_12-2-分支管理"><span>12.2 分支管理</span></a></h3><p>✅ <strong>DO（推荐）：</strong></p><ul><li>使用有意义的分支名</li><li>及时删除已合并的分支</li><li>保持主分支稳定</li><li>定期同步远程分支</li></ul><p>❌ <strong>DON&#39;T（避免）：</strong></p><ul><li>直接在主分支上开发</li><li>长期不合并的功能分支</li><li>随意使用force push</li><li>忽略分支命名规范</li></ul><h3 id="_12-3-团队协作" tabindex="-1"><a class="header-anchor" href="#_12-3-团队协作"><span>12.3 团队协作</span></a></h3><p>✅ <strong>DO（推荐）：</strong></p><ul><li>使用Pull Request进行代码审查</li><li>及时响应审查意见</li><li>保持代码风格一致</li><li>编写清晰的文档</li></ul><p>❌ <strong>DON&#39;T（避免）：</strong></p><ul><li>跳过代码审查直接合并</li><li>忽略CI/CD检查</li><li>不沟通就修改公共代码</li><li>提交未解决的冲突</li></ul><hr><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>掌握Git进阶技巧能够：</p><ul><li>🚀 提高开发效率</li><li>🛡️ 保证代码质量</li><li>🤝 促进团队协作</li><li>📊 优化项目管理</li></ul><p><strong>持续学习建议：</strong></p><ol><li>深入理解Git内部原理</li><li>实践各种工作流模型</li><li>学习团队最佳实践</li><li>关注Git新特性</li><li>分享经验和技巧</li></ol><p>记住：<strong>工具只是手段，规范和协作才是关键！</strong> 💪</p>`,150)])])}const r=n(i,[["render",p]]),o=JSON.parse('{"path":"/tutorials/development-tools/git/2.Gitjinjiejiqiao.html","title":"Git进阶技巧","lang":"zh-CN","frontmatter":{"title":"Git进阶技巧"},"headers":[{"level":2,"title":"一、高级分支操作","slug":"一、高级分支操作","link":"#一、高级分支操作","children":[{"level":3,"title":"1.1 变基（Rebase）","slug":"_1-1-变基-rebase","link":"#_1-1-变基-rebase","children":[]},{"level":3,"title":"1.2 Cherry-pick","slug":"_1-2-cherry-pick","link":"#_1-2-cherry-pick","children":[]},{"level":3,"title":"1.3 分支策略详解","slug":"_1-3-分支策略详解","link":"#_1-3-分支策略详解","children":[]}]},{"level":2,"title":"二、标签管理","slug":"二、标签管理","link":"#二、标签管理","children":[{"level":3,"title":"2.1 创建标签","slug":"_2-1-创建标签","link":"#_2-1-创建标签","children":[]},{"level":3,"title":"2.2 查看标签","slug":"_2-2-查看标签","link":"#_2-2-查看标签","children":[]},{"level":3,"title":"2.3 推送标签","slug":"_2-3-推送标签","link":"#_2-3-推送标签","children":[]}]},{"level":2,"title":"三、子模块（Submodule）","slug":"三、子模块-submodule","link":"#三、子模块-submodule","children":[{"level":3,"title":"3.1 添加子模块","slug":"_3-1-添加子模块","link":"#_3-1-添加子模块","children":[]},{"level":3,"title":"3.2 克隆包含子模块的项目","slug":"_3-2-克隆包含子模块的项目","link":"#_3-2-克隆包含子模块的项目","children":[]},{"level":3,"title":"3.3 更新子模块","slug":"_3-3-更新子模块","link":"#_3-3-更新子模块","children":[]}]},{"level":2,"title":"四、Git工作流","slug":"四、git工作流","link":"#四、git工作流","children":[{"level":3,"title":"4.1 集中式工作流","slug":"_4-1-集中式工作流","link":"#_4-1-集中式工作流","children":[]},{"level":3,"title":"4.2 功能分支工作流","slug":"_4-2-功能分支工作流","link":"#_4-2-功能分支工作流","children":[]},{"level":3,"title":"4.3 Gitflow工作流","slug":"_4-3-gitflow工作流","link":"#_4-3-gitflow工作流","children":[]},{"level":3,"title":"4.4 Forking工作流","slug":"_4-4-forking工作流","link":"#_4-4-forking工作流","children":[]}]},{"level":2,"title":"五、高级技巧","slug":"五、高级技巧","link":"#五、高级技巧","children":[{"level":3,"title":"5.1 Stash进阶","slug":"_5-1-stash进阶","link":"#_5-1-stash进阶","children":[]},{"level":3,"title":"5.2 搜索和查找","slug":"_5-2-搜索和查找","link":"#_5-2-搜索和查找","children":[]},{"level":3,"title":"5.3 重写历史","slug":"_5-3-重写历史","link":"#_5-3-重写历史","children":[]},{"level":3,"title":"5.4 清理和维护","slug":"_5-4-清理和维护","link":"#_5-4-清理和维护","children":[]}]},{"level":2,"title":"六、Git Hooks","slug":"六、git-hooks","link":"#六、git-hooks","children":[{"level":3,"title":"6.1 什么是Git Hooks？","slug":"_6-1-什么是git-hooks","link":"#_6-1-什么是git-hooks","children":[]},{"level":3,"title":"6.2 创建Hook示例","slug":"_6-2-创建hook示例","link":"#_6-2-创建hook示例","children":[]},{"level":3,"title":"6.3 使用Husky管理Hooks","slug":"_6-3-使用husky管理hooks","link":"#_6-3-使用husky管理hooks","children":[]}]},{"level":2,"title":"七、性能优化","slug":"七、性能优化","link":"#七、性能优化","children":[{"level":3,"title":"7.1 大文件处理","slug":"_7-1-大文件处理","link":"#_7-1-大文件处理","children":[]},{"level":3,"title":"7.2 浅克隆","slug":"_7-2-浅克隆","link":"#_7-2-浅克隆","children":[]},{"level":3,"title":"7.3 稀疏检出","slug":"_7-3-稀疏检出","link":"#_7-3-稀疏检出","children":[]}]},{"level":2,"title":"八、团队协作技巧","slug":"八、团队协作技巧","link":"#八、团队协作技巧","children":[{"level":3,"title":"8.1 代码审查流程","slug":"_8-1-代码审查流程","link":"#_8-1-代码审查流程","children":[]},{"level":3,"title":"8.2 解决合并冲突","slug":"_8-2-解决合并冲突","link":"#_8-2-解决合并冲突","children":[]},{"level":3,"title":"8.3 保持分支同步","slug":"_8-3-保持分支同步","link":"#_8-3-保持分支同步","children":[]}]},{"level":2,"title":"九、安全和权限","slug":"九、安全和权限","link":"#九、安全和权限","children":[{"level":3,"title":"9.1 签名提交","slug":"_9-1-签名提交","link":"#_9-1-签名提交","children":[]},{"level":3,"title":"9.2 保护敏感信息","slug":"_9-2-保护敏感信息","link":"#_9-2-保护敏感信息","children":[]}]},{"level":2,"title":"十、故障排查","slug":"十、故障排查","link":"#十、故障排查","children":[{"level":3,"title":"10.1 常见问题","slug":"_10-1-常见问题","link":"#_10-1-常见问题","children":[]},{"level":3,"title":"10.2 调试技巧","slug":"_10-2-调试技巧","link":"#_10-2-调试技巧","children":[]}]},{"level":2,"title":"十一、Git配置优化","slug":"十一、git配置优化","link":"#十一、git配置优化","children":[{"level":3,"title":"11.1 全局配置","slug":"_11-1-全局配置","link":"#_11-1-全局配置","children":[]},{"level":3,"title":"11.2 别名配置","slug":"_11-2-别名配置","link":"#_11-2-别名配置","children":[]},{"level":3,"title":"11.3 .gitconfig示例","slug":"_11-3-gitconfig示例","link":"#_11-3-gitconfig示例","children":[]}]},{"level":2,"title":"十二、最佳实践总结","slug":"十二、最佳实践总结","link":"#十二、最佳实践总结","children":[{"level":3,"title":"12.1 提交规范","slug":"_12-1-提交规范","link":"#_12-1-提交规范","children":[]},{"level":3,"title":"12.2 分支管理","slug":"_12-2-分支管理","link":"#_12-2-分支管理","children":[]},{"level":3,"title":"12.3 团队协作","slug":"_12-3-团队协作","link":"#_12-3-团队协作","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/development-tools/git/2.Git进阶技巧.md"}');export{r as comp,o as data};
