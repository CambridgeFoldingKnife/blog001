import{_ as n,c as a,d as e,o as i}from"./app-ByoNX5Zd.js";const l={};function t(c,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="git基础入门" tabindex="-1"><a class="header-anchor" href="#git基础入门"><span>Git基础入门</span></a></h1><h2 id="一、git是什么" tabindex="-1"><a class="header-anchor" href="#一、git是什么"><span>一、Git是什么？</span></a></h2><h3 id="_1-1-版本控制系统" tabindex="-1"><a class="header-anchor" href="#_1-1-版本控制系统"><span>1.1 版本控制系统</span></a></h3><p><strong>Git</strong> 是一个分布式版本控制系统（Distributed Version Control System），由Linux之父Linus Torvalds于2005年创建。</p><p><strong>版本控制系统的作用：</strong></p><ul><li>📝 记录文件的所有修改历史</li><li>🔄 可以随时回退到任意历史版本</li><li>👥 支持多人协作开发</li><li>🔍 追踪谁在什么时候修改了什么内容</li></ul><h3 id="_1-2-集中式-vs-分布式" tabindex="-1"><a class="header-anchor" href="#_1-2-集中式-vs-分布式"><span>1.2 集中式 vs 分布式</span></a></h3><table><thead><tr><th>特性</th><th>集中式（SVN）</th><th>分布式（Git）</th></tr></thead><tbody><tr><td>版本库位置</td><td>只在中央服务器</td><td>每个开发者本地都有完整版本库</td></tr><tr><td>网络依赖</td><td>必须联网才能工作</td><td>可以离线工作</td></tr><tr><td>速度</td><td>较慢</td><td>非常快</td></tr><tr><td>安全性</td><td>中央服务器故障则丢失所有历史</td><td>任何一个克隆都是完整备份</td></tr></tbody></table><h3 id="_1-3-git的核心概念" tabindex="-1"><a class="header-anchor" href="#_1-3-git的核心概念"><span>1.3 Git的核心概念</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">工作区（Working Directory）</span>
<span class="line">    ↓ git add</span>
<span class="line">暂存区（Staging Area / Index）</span>
<span class="line">    ↓ git commit</span>
<span class="line">本地仓库（Local Repository）</span>
<span class="line">    ↓ git push</span>
<span class="line">远程仓库（Remote Repository）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="二、git能做什么" tabindex="-1"><a class="header-anchor" href="#二、git能做什么"><span>二、Git能做什么？</span></a></h2><h3 id="_2-1-主要功能" tabindex="-1"><a class="header-anchor" href="#_2-1-主要功能"><span>2.1 主要功能</span></a></h3><ol><li><p><strong>版本管理</strong></p><ul><li>保存项目的每一个版本</li><li>随时查看历史记录</li><li>回退到任意版本</li></ul></li><li><p><strong>分支管理</strong></p><ul><li>创建独立的开发分支</li><li>并行开发多个功能</li><li>合并分支</li></ul></li><li><p><strong>团队协作</strong></p><ul><li>多人同时开发</li><li>代码审查</li><li>冲突解决</li></ul></li><li><p><strong>代码备份</strong></p><ul><li>分布式存储</li><li>数据安全可靠</li></ul></li></ol><h3 id="_2-2-应用场景" tabindex="-1"><a class="header-anchor" href="#_2-2-应用场景"><span>2.2 应用场景</span></a></h3><ul><li>✅ 软件开发项目管理</li><li>✅ 文档版本控制</li><li>✅ 配置文件管理</li><li>✅ 个人笔记版本管理</li><li>✅ 团队协作开发</li></ul><hr><h2 id="三、git安装与配置" tabindex="-1"><a class="header-anchor" href="#三、git安装与配置"><span>三、Git安装与配置</span></a></h2><h3 id="_3-1-安装git" tabindex="-1"><a class="header-anchor" href="#_3-1-安装git"><span>3.1 安装Git</span></a></h3><p><strong>Windows系统：</strong></p><ol><li>访问官网：https://git-scm.com/</li><li>下载Windows版本安装包</li><li>运行安装程序，建议使用默认选项</li></ol><p><strong>Linux系统：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># Ubuntu/Debian</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># CentOS/RedHat</span></span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Mac系统：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用Homebrew</span></span>
<span class="line">brew <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-验证安装" tabindex="-1"><a class="header-anchor" href="#_3-2-验证安装"><span>3.2 验证安装</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token parameter variable">--version</span></span>
<span class="line"><span class="token comment"># 输出：git version 2.x.x</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-基本配置" tabindex="-1"><a class="header-anchor" href="#_3-3-基本配置"><span>3.3 基本配置</span></a></h3><p><strong>配置用户信息（必须）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 配置用户名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;你的名字&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置邮箱</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;your.email@example.com&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看配置：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看所有配置</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--list</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看特定配置</span></span>
<span class="line"><span class="token function">git</span> config user.name</span>
<span class="line"><span class="token function">git</span> config user.email</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其他常用配置：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 配置默认编辑器</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> core.editor <span class="token string">&quot;vim&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置颜色显示</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> color.ui <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置别名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.st status</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.co checkout</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.br branch</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.ci commit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、git基本使用" tabindex="-1"><a class="header-anchor" href="#四、git基本使用"><span>四、Git基本使用</span></a></h2><h3 id="_4-1-创建仓库" tabindex="-1"><a class="header-anchor" href="#_4-1-创建仓库"><span>4.1 创建仓库</span></a></h3><p><strong>方式一：初始化新仓库</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建项目目录</span></span>
<span class="line"><span class="token function">mkdir</span> my-project</span>
<span class="line"><span class="token builtin class-name">cd</span> my-project</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 初始化Git仓库</span></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式二：克隆现有仓库</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 从远程克隆</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/username/repository.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 克隆到指定目录</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/username/repository.git my-folder</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-基本工作流程" tabindex="-1"><a class="header-anchor" href="#_4-2-基本工作流程"><span>4.2 基本工作流程</span></a></h3><h4 id="_1-查看状态" tabindex="-1"><a class="header-anchor" href="#_1-查看状态"><span>1. 查看状态</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> status</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="_2-添加文件到暂存区" tabindex="-1"><a class="header-anchor" href="#_2-添加文件到暂存区"><span>2. 添加文件到暂存区</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加单个文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加所有文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加所有.java文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> *.java</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-提交到本地仓库" tabindex="-1"><a class="header-anchor" href="#_3-提交到本地仓库"><span>3. 提交到本地仓库</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 提交并添加说明</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;提交说明&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加并提交（跳过git add）</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;提交说明&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-查看提交历史" tabindex="-1"><a class="header-anchor" href="#_4-查看提交历史"><span>4. 查看提交历史</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看详细历史</span></span>
<span class="line"><span class="token function">git</span> log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看简洁历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看图形化历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-文件操作" tabindex="-1"><a class="header-anchor" href="#_4-3-文件操作"><span>4.3 文件操作</span></a></h3><p><strong>删除文件：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除文件并暂存</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只从Git中删除，保留本地文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> filename.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>移动/重命名文件：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> <span class="token function">mv</span> old-name.txt new-name.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>撤销修改：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 撤销工作区的修改</span></span>
<span class="line"><span class="token function">git</span> checkout -- filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销暂存区的修改</span></span>
<span class="line"><span class="token function">git</span> reset HEAD filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回退到上一个版本</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回退到指定版本</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> commit_id</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-gitignore文件" tabindex="-1"><a class="header-anchor" href="#_4-4-gitignore文件"><span>4.4 .gitignore文件</span></a></h3><p>创建<code>.gitignore</code>文件来忽略不需要版本控制的文件：</p><div class="language-gitignore line-numbers-mode" data-highlighter="prismjs" data-ext="gitignore" data-title="gitignore"><pre><code><span class="line"><span class="token comment"># 编译文件</span></span>
<span class="line"><span class="token entry string"><span class="token operator">*</span>.class</span></span>
<span class="line"><span class="token entry string"><span class="token operator">*</span>.o</span></span>
<span class="line"><span class="token entry string"><span class="token operator">*</span>.pyc</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 日志文件</span></span>
<span class="line"><span class="token entry string"><span class="token operator">*</span>.log</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 依赖目录</span></span>
<span class="line"><span class="token entry string">node_modules<span class="token punctuation">/</span></span></span>
<span class="line"><span class="token entry string">target<span class="token punctuation">/</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># IDE配置</span></span>
<span class="line"><span class="token entry string">.idea<span class="token punctuation">/</span></span></span>
<span class="line"><span class="token entry string">.vscode<span class="token punctuation">/</span></span></span>
<span class="line"><span class="token entry string"><span class="token operator">*</span>.iml</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 系统文件</span></span>
<span class="line"><span class="token entry string">.DS_Store</span></span>
<span class="line"><span class="token entry string">Thumbs.db</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 环境配置</span></span>
<span class="line"><span class="token entry string">.env</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、分支管理" tabindex="-1"><a class="header-anchor" href="#五、分支管理"><span>五、分支管理</span></a></h2><h3 id="_5-1-分支概念" tabindex="-1"><a class="header-anchor" href="#_5-1-分支概念"><span>5.1 分支概念</span></a></h3><p>分支就像平行宇宙，可以在不影响主线的情况下进行开发。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">master/main (主分支)</span>
<span class="line">    ↓</span>
<span class="line">    ├─→ feature-login (功能分支)</span>
<span class="line">    ├─→ feature-payment (功能分支)</span>
<span class="line">    └─→ hotfix-bug (修复分支)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-分支操作" tabindex="-1"><a class="header-anchor" href="#_5-2-分支操作"><span>5.2 分支操作</span></a></h3><p><strong>查看分支：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看本地分支</span></span>
<span class="line"><span class="token function">git</span> branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有分支（包括远程）</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-a</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看远程分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-r</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建分支：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建新分支</span></span>
<span class="line"><span class="token function">git</span> branch feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建并切换到新分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用新命令</span></span>
<span class="line"><span class="token function">git</span> switch <span class="token parameter variable">-c</span> feature-login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>切换分支：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 切换分支</span></span>
<span class="line"><span class="token function">git</span> checkout feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或使用新命令</span></span>
<span class="line"><span class="token function">git</span> switch feature-login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>合并分支：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 切换到主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 合并feature-login分支</span></span>
<span class="line"><span class="token function">git</span> merge feature-login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除分支：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除已合并的分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制删除分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-D</span> feature-login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-解决冲突" tabindex="-1"><a class="header-anchor" href="#_5-3-解决冲突"><span>5.3 解决冲突</span></a></h3><p>当合并分支时出现冲突：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 查看冲突文件</span></span>
<span class="line"><span class="token function">git</span> status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 手动编辑冲突文件</span></span>
<span class="line"><span class="token comment"># 文件中会显示：</span></span>
<span class="line"><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;</span> HEAD</span>
<span class="line">当前分支的内容</span>
<span class="line"><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span></span>
<span class="line">要合并分支的内容</span>
<span class="line"><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> feature-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 解决冲突后，添加文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> conflict-file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 提交合并</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;解决冲突&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、远程仓库操作" tabindex="-1"><a class="header-anchor" href="#六、远程仓库操作"><span>六、远程仓库操作</span></a></h2><h3 id="_6-1-关联远程仓库" tabindex="-1"><a class="header-anchor" href="#_6-1-关联远程仓库"><span>6.1 关联远程仓库</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/username/repository.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除远程仓库关联</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">rm</span> origin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-推送到远程" tabindex="-1"><a class="header-anchor" href="#_6-2-推送到远程"><span>6.2 推送到远程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 首次推送</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后续推送</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送所有分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制推送（慎用）</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-从远程拉取" tabindex="-1"><a class="header-anchor" href="#_6-3-从远程拉取"><span>6.3 从远程拉取</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 拉取并合并</span></span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 等同于</span></span>
<span class="line"><span class="token function">git</span> fetch</span>
<span class="line"><span class="token function">git</span> merge</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取指定分支</span></span>
<span class="line"><span class="token function">git</span> pull origin master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-ssh密钥配置" tabindex="-1"><a class="header-anchor" href="#_6-4-ssh密钥配置"><span>6.4 SSH密钥配置</span></a></h3><p><strong>生成SSH密钥：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;your.email@example.com&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>查看公钥：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">cat</span> ~/.ssh/id_rsa.pub</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>添加到GitHub/Gitee：</strong></p><ol><li>复制公钥内容</li><li>进入GitHub设置 → SSH and GPG keys</li><li>点击New SSH key，粘贴公钥</li></ol><hr><h2 id="七、常用命令速查" tabindex="-1"><a class="header-anchor" href="#七、常用命令速查"><span>七、常用命令速查</span></a></h2><h3 id="_7-1-基础命令" tabindex="-1"><a class="header-anchor" href="#_7-1-基础命令"><span>7.1 基础命令</span></a></h3><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>git init</code></td><td>初始化仓库</td></tr><tr><td><code>git clone &lt;url&gt;</code></td><td>克隆仓库</td></tr><tr><td><code>git status</code></td><td>查看状态</td></tr><tr><td><code>git add &lt;file&gt;</code></td><td>添加到暂存区</td></tr><tr><td><code>git commit -m &quot;msg&quot;</code></td><td>提交</td></tr><tr><td><code>git log</code></td><td>查看历史</td></tr><tr><td><code>git diff</code></td><td>查看差异</td></tr></tbody></table><h3 id="_7-2-分支命令" tabindex="-1"><a class="header-anchor" href="#_7-2-分支命令"><span>7.2 分支命令</span></a></h3><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>git branch</code></td><td>查看分支</td></tr><tr><td><code>git branch &lt;name&gt;</code></td><td>创建分支</td></tr><tr><td><code>git checkout &lt;name&gt;</code></td><td>切换分支</td></tr><tr><td><code>git checkout -b &lt;name&gt;</code></td><td>创建并切换分支</td></tr><tr><td><code>git merge &lt;name&gt;</code></td><td>合并分支</td></tr><tr><td><code>git branch -d &lt;name&gt;</code></td><td>删除分支</td></tr></tbody></table><h3 id="_7-3-远程命令" tabindex="-1"><a class="header-anchor" href="#_7-3-远程命令"><span>7.3 远程命令</span></a></h3><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>git remote add origin &lt;url&gt;</code></td><td>添加远程仓库</td></tr><tr><td><code>git push -u origin master</code></td><td>首次推送</td></tr><tr><td><code>git push</code></td><td>推送</td></tr><tr><td><code>git pull</code></td><td>拉取</td></tr><tr><td><code>git fetch</code></td><td>获取远程更新</td></tr><tr><td><code>git clone &lt;url&gt;</code></td><td>克隆远程仓库</td></tr></tbody></table><h3 id="_7-4-撤销命令" tabindex="-1"><a class="header-anchor" href="#_7-4-撤销命令"><span>7.4 撤销命令</span></a></h3><table><thead><tr><th>命令</th><th>说明</th></tr></thead><tbody><tr><td><code>git checkout -- &lt;file&gt;</code></td><td>撤销工作区修改</td></tr><tr><td><code>git reset HEAD &lt;file&gt;</code></td><td>撤销暂存区修改</td></tr><tr><td><code>git reset --hard HEAD^</code></td><td>回退到上一版本</td></tr><tr><td><code>git revert &lt;commit&gt;</code></td><td>撤销某次提交</td></tr></tbody></table><hr><h2 id="八、实战案例" tabindex="-1"><a class="header-anchor" href="#八、实战案例"><span>八、实战案例</span></a></h2><h3 id="_8-1-个人项目开发流程" tabindex="-1"><a class="header-anchor" href="#_8-1-个人项目开发流程"><span>8.1 个人项目开发流程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 创建项目</span></span>
<span class="line"><span class="token function">mkdir</span> my-project</span>
<span class="line"><span class="token builtin class-name">cd</span> my-project</span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建文件</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;# My Project&quot;</span> <span class="token operator">&gt;</span> README.md</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 添加并提交</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;初始化项目&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 关联远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/username/my-project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-团队协作开发流程" tabindex="-1"><a class="header-anchor" href="#_8-2-团队协作开发流程"><span>8.2 团队协作开发流程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 克隆项目</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/team/project.git</span>
<span class="line"><span class="token builtin class-name">cd</span> project</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-user-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 开发功能</span></span>
<span class="line"><span class="token comment"># ... 编写代码 ...</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 提交代码</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;实现用户登录功能&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push origin feature-user-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 在GitHub上创建Pull Request</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 代码审查通过后，合并到主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> pull</span>
<span class="line"><span class="token function">git</span> merge feature-user-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 8. 删除功能分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature-user-login</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-紧急修复bug流程" tabindex="-1"><a class="header-anchor" href="#_8-3-紧急修复bug流程"><span>8.3 紧急修复Bug流程</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 从主分支创建修复分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix-critical-bug</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 修复bug</span></span>
<span class="line"><span class="token comment"># ... 修改代码 ...</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 提交修复</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;修复关键bug&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 合并到主分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"><span class="token function">git</span> merge hotfix-critical-bug</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 推送到远程</span></span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 删除修复分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> hotfix-critical-bug</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="九、最佳实践" tabindex="-1"><a class="header-anchor" href="#九、最佳实践"><span>九、最佳实践</span></a></h2><h3 id="_9-1-提交规范" tabindex="-1"><a class="header-anchor" href="#_9-1-提交规范"><span>9.1 提交规范</span></a></h3><p><strong>提交信息格式：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</span>
<span class="line"></span>
<span class="line">&lt;body&gt;</span>
<span class="line"></span>
<span class="line">&lt;footer&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类型（type）：</strong></p><ul><li><code>feat</code>: 新功能</li><li><code>fix</code>: 修复bug</li><li><code>docs</code>: 文档更新</li><li><code>style</code>: 代码格式调整</li><li><code>refactor</code>: 重构</li><li><code>test</code>: 测试相关</li><li><code>chore</code>: 构建/工具变动</li></ul><p><strong>示例：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat(login): 添加用户登录功能&quot;</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;fix(payment): 修复支付金额计算错误&quot;</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;docs(readme): 更新安装说明&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-分支策略" tabindex="-1"><a class="header-anchor" href="#_9-2-分支策略"><span>9.2 分支策略</span></a></h3><p><strong>Git Flow模型：</strong></p><ul><li><code>master/main</code>: 主分支，只包含稳定版本</li><li><code>develop</code>: 开发分支，最新开发代码</li><li><code>feature/*</code>: 功能分支</li><li><code>release/*</code>: 发布分支</li><li><code>hotfix/*</code>: 紧急修复分支</li></ul><h3 id="_9-3-注意事项" tabindex="-1"><a class="header-anchor" href="#_9-3-注意事项"><span>9.3 注意事项</span></a></h3><ol><li>⚠️ <strong>不要提交敏感信息</strong>（密码、密钥等）</li><li>⚠️ <strong>不要提交大文件</strong>（使用Git LFS）</li><li>⚠️ <strong>提交前先pull</strong>，避免冲突</li><li>⚠️ <strong>频繁提交</strong>，每个提交只做一件事</li><li>⚠️ <strong>写清楚提交信息</strong>，方便追踪</li></ol><hr><h2 id="十、常见问题" tabindex="-1"><a class="header-anchor" href="#十、常见问题"><span>十、常见问题</span></a></h2><h3 id="_10-1-如何撤销已推送的提交" tabindex="-1"><a class="header-anchor" href="#_10-1-如何撤销已推送的提交"><span>10.1 如何撤销已推送的提交？</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方法一：使用revert（推荐）</span></span>
<span class="line"><span class="token function">git</span> revert <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方法二：使用reset（慎用）</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-如何修改最后一次提交" tabindex="-1"><a class="header-anchor" href="#_10-2-如何修改最后一次提交"><span>10.2 如何修改最后一次提交？</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 修改提交信息</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;新的提交信息&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加遗漏的文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> forgotten-file.txt</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> --no-edit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-3-如何暂存当前工作" tabindex="-1"><a class="header-anchor" href="#_10-3-如何暂存当前工作"><span>10.3 如何暂存当前工作？</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 暂存当前修改</span></span>
<span class="line"><span class="token function">git</span> stash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看暂存列表</span></span>
<span class="line"><span class="token function">git</span> stash list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复暂存</span></span>
<span class="line"><span class="token function">git</span> stash pop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复指定暂存</span></span>
<span class="line"><span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-4-如何查看某个文件的修改历史" tabindex="-1"><a class="header-anchor" href="#_10-4-如何查看某个文件的修改历史"><span>10.4 如何查看某个文件的修改历史？</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看文件提交历史</span></span>
<span class="line"><span class="token function">git</span> log -- filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看文件每一行的修改者</span></span>
<span class="line"><span class="token function">git</span> blame filename.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="十一、学习资源" tabindex="-1"><a class="header-anchor" href="#十一、学习资源"><span>十一、学习资源</span></a></h2><h3 id="_11-1-官方文档" tabindex="-1"><a class="header-anchor" href="#_11-1-官方文档"><span>11.1 官方文档</span></a></h3><ul><li>Git官方文档：https://git-scm.com/doc</li><li>Pro Git书籍：https://git-scm.com/book/zh/v2</li></ul><h3 id="_11-2-在线练习" tabindex="-1"><a class="header-anchor" href="#_11-2-在线练习"><span>11.2 在线练习</span></a></h3><ul><li>Learn Git Branching：https://learngitbranching.js.org/</li><li>Git教程 - 廖雪峰：https://www.liaoxuefeng.com/wiki/896043488029600</li></ul><h3 id="_11-3-可视化工具" tabindex="-1"><a class="header-anchor" href="#_11-3-可视化工具"><span>11.3 可视化工具</span></a></h3><ul><li><strong>SourceTree</strong>：免费的Git GUI工具</li><li><strong>GitKraken</strong>：跨平台Git客户端</li><li><strong>GitHub Desktop</strong>：GitHub官方客户端</li><li><strong>TortoiseGit</strong>：Windows资源管理器集成</li></ul><hr><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>Git是现代软件开发必备的工具，掌握Git能够：</p><ul><li>✅ 高效管理代码版本</li><li>✅ 轻松进行团队协作</li><li>✅ 安全备份项目代码</li><li>✅ 提升开发效率</li></ul><p><strong>学习建议：</strong></p><ol><li>先掌握基本命令（add、commit、push、pull）</li><li>理解分支概念和操作</li><li>多实践，多提交</li><li>学习团队协作流程</li><li>逐步学习高级功能</li></ol><p>记住：<strong>熟能生巧，多用多练！</strong> 🚀</p>`,151)])])}const d=n(l,[["render",t]]),r=JSON.parse('{"path":"/tutorials/development-tools/git/1.Gitjichurumen.html","title":"Git基础入门","lang":"zh-CN","frontmatter":{"title":"Git基础入门"},"headers":[{"level":2,"title":"一、Git是什么？","slug":"一、git是什么","link":"#一、git是什么","children":[{"level":3,"title":"1.1 版本控制系统","slug":"_1-1-版本控制系统","link":"#_1-1-版本控制系统","children":[]},{"level":3,"title":"1.2 集中式 vs 分布式","slug":"_1-2-集中式-vs-分布式","link":"#_1-2-集中式-vs-分布式","children":[]},{"level":3,"title":"1.3 Git的核心概念","slug":"_1-3-git的核心概念","link":"#_1-3-git的核心概念","children":[]}]},{"level":2,"title":"二、Git能做什么？","slug":"二、git能做什么","link":"#二、git能做什么","children":[{"level":3,"title":"2.1 主要功能","slug":"_2-1-主要功能","link":"#_2-1-主要功能","children":[]},{"level":3,"title":"2.2 应用场景","slug":"_2-2-应用场景","link":"#_2-2-应用场景","children":[]}]},{"level":2,"title":"三、Git安装与配置","slug":"三、git安装与配置","link":"#三、git安装与配置","children":[{"level":3,"title":"3.1 安装Git","slug":"_3-1-安装git","link":"#_3-1-安装git","children":[]},{"level":3,"title":"3.2 验证安装","slug":"_3-2-验证安装","link":"#_3-2-验证安装","children":[]},{"level":3,"title":"3.3 基本配置","slug":"_3-3-基本配置","link":"#_3-3-基本配置","children":[]}]},{"level":2,"title":"四、Git基本使用","slug":"四、git基本使用","link":"#四、git基本使用","children":[{"level":3,"title":"4.1 创建仓库","slug":"_4-1-创建仓库","link":"#_4-1-创建仓库","children":[]},{"level":3,"title":"4.2 基本工作流程","slug":"_4-2-基本工作流程","link":"#_4-2-基本工作流程","children":[]},{"level":3,"title":"4.3 文件操作","slug":"_4-3-文件操作","link":"#_4-3-文件操作","children":[]},{"level":3,"title":"4.4 .gitignore文件","slug":"_4-4-gitignore文件","link":"#_4-4-gitignore文件","children":[]}]},{"level":2,"title":"五、分支管理","slug":"五、分支管理","link":"#五、分支管理","children":[{"level":3,"title":"5.1 分支概念","slug":"_5-1-分支概念","link":"#_5-1-分支概念","children":[]},{"level":3,"title":"5.2 分支操作","slug":"_5-2-分支操作","link":"#_5-2-分支操作","children":[]},{"level":3,"title":"5.3 解决冲突","slug":"_5-3-解决冲突","link":"#_5-3-解决冲突","children":[]}]},{"level":2,"title":"六、远程仓库操作","slug":"六、远程仓库操作","link":"#六、远程仓库操作","children":[{"level":3,"title":"6.1 关联远程仓库","slug":"_6-1-关联远程仓库","link":"#_6-1-关联远程仓库","children":[]},{"level":3,"title":"6.2 推送到远程","slug":"_6-2-推送到远程","link":"#_6-2-推送到远程","children":[]},{"level":3,"title":"6.3 从远程拉取","slug":"_6-3-从远程拉取","link":"#_6-3-从远程拉取","children":[]},{"level":3,"title":"6.4 SSH密钥配置","slug":"_6-4-ssh密钥配置","link":"#_6-4-ssh密钥配置","children":[]}]},{"level":2,"title":"七、常用命令速查","slug":"七、常用命令速查","link":"#七、常用命令速查","children":[{"level":3,"title":"7.1 基础命令","slug":"_7-1-基础命令","link":"#_7-1-基础命令","children":[]},{"level":3,"title":"7.2 分支命令","slug":"_7-2-分支命令","link":"#_7-2-分支命令","children":[]},{"level":3,"title":"7.3 远程命令","slug":"_7-3-远程命令","link":"#_7-3-远程命令","children":[]},{"level":3,"title":"7.4 撤销命令","slug":"_7-4-撤销命令","link":"#_7-4-撤销命令","children":[]}]},{"level":2,"title":"八、实战案例","slug":"八、实战案例","link":"#八、实战案例","children":[{"level":3,"title":"8.1 个人项目开发流程","slug":"_8-1-个人项目开发流程","link":"#_8-1-个人项目开发流程","children":[]},{"level":3,"title":"8.2 团队协作开发流程","slug":"_8-2-团队协作开发流程","link":"#_8-2-团队协作开发流程","children":[]},{"level":3,"title":"8.3 紧急修复Bug流程","slug":"_8-3-紧急修复bug流程","link":"#_8-3-紧急修复bug流程","children":[]}]},{"level":2,"title":"九、最佳实践","slug":"九、最佳实践","link":"#九、最佳实践","children":[{"level":3,"title":"9.1 提交规范","slug":"_9-1-提交规范","link":"#_9-1-提交规范","children":[]},{"level":3,"title":"9.2 分支策略","slug":"_9-2-分支策略","link":"#_9-2-分支策略","children":[]},{"level":3,"title":"9.3 注意事项","slug":"_9-3-注意事项","link":"#_9-3-注意事项","children":[]}]},{"level":2,"title":"十、常见问题","slug":"十、常见问题","link":"#十、常见问题","children":[{"level":3,"title":"10.1 如何撤销已推送的提交？","slug":"_10-1-如何撤销已推送的提交","link":"#_10-1-如何撤销已推送的提交","children":[]},{"level":3,"title":"10.2 如何修改最后一次提交？","slug":"_10-2-如何修改最后一次提交","link":"#_10-2-如何修改最后一次提交","children":[]},{"level":3,"title":"10.3 如何暂存当前工作？","slug":"_10-3-如何暂存当前工作","link":"#_10-3-如何暂存当前工作","children":[]},{"level":3,"title":"10.4 如何查看某个文件的修改历史？","slug":"_10-4-如何查看某个文件的修改历史","link":"#_10-4-如何查看某个文件的修改历史","children":[]}]},{"level":2,"title":"十一、学习资源","slug":"十一、学习资源","link":"#十一、学习资源","children":[{"level":3,"title":"11.1 官方文档","slug":"_11-1-官方文档","link":"#_11-1-官方文档","children":[]},{"level":3,"title":"11.2 在线练习","slug":"_11-2-在线练习","link":"#_11-2-在线练习","children":[]},{"level":3,"title":"11.3 可视化工具","slug":"_11-3-可视化工具","link":"#_11-3-可视化工具","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/development-tools/git/1.Git基础入门.md"}');export{d as comp,r as data};
