import{_ as l,c as i,d as p,e as n,f as a,b as c,w as t,r,o as d}from"./app-CjJuDk73.js";const o={};function v(u,s){const e=r("RouteLink");return d(),i("div",null,[s[3]||(s[3]=p(`<h1 id="docker核心概念" tabindex="-1"><a class="header-anchor" href="#docker核心概念"><span>Docker核心概念</span></a></h1><h2 id="一、docker镜像原理" tabindex="-1"><a class="header-anchor" href="#一、docker镜像原理"><span>一、Docker镜像原理</span></a></h2><h3 id="_1-1-镜像的本质" tabindex="-1"><a class="header-anchor" href="#_1-1-镜像的本质"><span>1.1 镜像的本质</span></a></h3><p>Docker 镜像是一个<strong>只读的文件系统</strong>，包含了运行应用所需的所有内容：</p><ul><li>代码</li><li>运行时环境</li><li>系统工具</li><li>系统库</li><li>配置文件</li></ul><p><strong>镜像 = 文件系统快照 + 启动命令</strong></p><h3 id="_1-2-分层存储-union-fs" tabindex="-1"><a class="header-anchor" href="#_1-2-分层存储-union-fs"><span>1.2 分层存储（Union FS）</span></a></h3><p>Docker 镜像采用**联合文件系统（Union File System）**技术，实现分层存储：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">┌─────────────────────────────────┐</span>
<span class="line">│  可写容器层 (Container Layer)    │  ← 容器运行时的修改</span>
<span class="line">├─────────────────────────────────┤</span>
<span class="line">│  应用层 (COPY app.jar)           │  ← 只读镜像层</span>
<span class="line">├─────────────────────────────────┤</span>
<span class="line">│  依赖层 (RUN apt-get install)   │  ← 只读镜像层</span>
<span class="line">├─────────────────────────────────┤</span>
<span class="line">│  JDK层 (FROM openjdk:8)         │  ← 只读镜像层</span>
<span class="line">├─────────────────────────────────┤</span>
<span class="line">│  基础层 (Base Image)             │  ← 只读镜像层</span>
<span class="line">└─────────────────────────────────┘</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分层存储的优势：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 节省存储空间 - 多个镜像共享相同的基础层</span>
<span class="line">✅ 加快传输速度 - 只传输变化的层</span>
<span class="line">✅ 提高构建效率 - 利用缓存机制</span>
<span class="line">✅ 版本控制方便 - 每层都有唯一ID</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看镜像的分层信息</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">history</span> nginx:latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 输出示例：</span></span>
<span class="line"><span class="token comment"># IMAGE          CREATED        CREATED BY                     SIZE</span></span>
<span class="line"><span class="token comment"># 605c77e624dd   2 weeks ago    CMD [&quot;nginx&quot; &quot;-g&quot; &quot;daemon...   0B</span></span>
<span class="line"><span class="token comment"># &lt;missing&gt;      2 weeks ago    EXPOSE 80                      0B</span></span>
<span class="line"><span class="token comment"># &lt;missing&gt;      2 weeks ago    COPY nginx.conf /etc/nginx/    1.2kB</span></span>
<span class="line"><span class="token comment"># &lt;missing&gt;      3 weeks ago    RUN apt-get update &amp;&amp; apt...   50MB</span></span>
<span class="line"><span class="token comment"># &lt;missing&gt;      4 weeks ago    /bin/sh -c #(nop) ADD fil...   80MB</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-写时复制-copy-on-write" tabindex="-1"><a class="header-anchor" href="#_1-3-写时复制-copy-on-write"><span>1.3 写时复制（Copy-on-Write）</span></a></h3><p>容器修改文件时，采用写时复制策略：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">1. 容器启动时，所有镜像层都是只读的</span>
<span class="line">2. 容器需要修改文件时：</span>
<span class="line">   - 从只读层复制文件到可写层</span>
<span class="line">   - 在可写层进行修改</span>
<span class="line">   - 只读层保持不变</span>
<span class="line">3. 删除容器后，可写层的修改全部丢失</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> <span class="token builtin class-name">test</span> ubuntu <span class="token function">bash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在容器中创建文件</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello Docker&quot;</span> <span class="token operator">&gt;</span> /tmp/test.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 退出容器</span></span>
<span class="line"><span class="token builtin class-name">exit</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器的文件系统变化</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">diff</span> <span class="token builtin class-name">test</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 输出：</span></span>
<span class="line"><span class="token comment"># A /tmp/test.txt  (A = Added 新增)</span></span>
<span class="line"><span class="token comment"># C /etc           (C = Changed 修改)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-镜像id与摘要" tabindex="-1"><a class="header-anchor" href="#_1-4-镜像id与摘要"><span>1.4 镜像ID与摘要</span></a></h3><p><strong>镜像ID（Image ID）：</strong></p><ul><li>镜像内容的 SHA256 哈希值</li><li>全局唯一标识</li><li>通常显示前12位</li></ul><p><strong>镜像摘要（Digest）：</strong></p><ul><li>镜像清单的 SHA256 哈希值</li><li>用于精确引用镜像版本</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看镜像详细信息</span></span>
<span class="line"><span class="token function">docker</span> inspect nginx:latest <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">5</span> <span class="token string">&quot;Id&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取指定摘要的镜像</span></span>
<span class="line"><span class="token function">docker</span> pull nginx@sha256:abc123<span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="二、dockerfile详解" tabindex="-1"><a class="header-anchor" href="#二、dockerfile详解"><span>二、Dockerfile详解</span></a></h2><h3 id="_2-1-dockerfile-基础" tabindex="-1"><a class="header-anchor" href="#_2-1-dockerfile-基础"><span>2.1 Dockerfile 基础</span></a></h3><p>Dockerfile 是用于构建 Docker 镜像的文本文件，包含一系列指令。</p><p><strong>基本结构：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 基础镜像</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 维护者信息</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">LABEL</span> maintainer=<span class="token string">&quot;your-email@example.com&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置工作目录</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> target/app.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 暴露端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动命令</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-dockerfile-指令详解" tabindex="-1"><a class="header-anchor" href="#_2-2-dockerfile-指令详解"><span>2.2 Dockerfile 指令详解</span></a></h3><h4 id="from-指定基础镜像" tabindex="-1"><a class="header-anchor" href="#from-指定基础镜像"><span>FROM - 指定基础镜像</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 使用官方镜像</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用特定版本</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> mysql:8.0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用多阶段构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8 <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="label-添加元数据" tabindex="-1"><a class="header-anchor" href="#label-添加元数据"><span>LABEL - 添加元数据</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">LABEL</span> maintainer=<span class="token string">&quot;developer@example.com&quot;</span></span></span>
<span class="line"><span class="token instruction"><span class="token keyword">LABEL</span> version=<span class="token string">&quot;1.0&quot;</span></span></span>
<span class="line"><span class="token instruction"><span class="token keyword">LABEL</span> description=<span class="token string">&quot;This is my application&quot;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="workdir-设置工作目录" tabindex="-1"><a class="header-anchor" href="#workdir-设置工作目录"><span>WORKDIR - 设置工作目录</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 设置工作目录（自动创建）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后续的 RUN、CMD、COPY 等命令都在此目录执行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="copy-复制文件" tabindex="-1"><a class="header-anchor" href="#copy-复制文件"><span>COPY - 复制文件</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 复制单个文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> app.jar /app/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制目录</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src/ /app/src/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制多个文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> file1.txt file2.txt /app/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用通配符</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> *.jar /app/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="add-高级复制" tabindex="-1"><a class="header-anchor" href="#add-高级复制"><span>ADD - 高级复制</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 基本复制（与 COPY 相同）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> app.jar /app/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 自动解压 tar 文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> app.tar.gz /app/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从 URL 下载（不推荐，建议用 RUN curl）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ADD</span> https://example.com/file.tar.gz /app/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>COPY vs ADD：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">推荐使用 COPY：</span>
<span class="line">- 语义更清晰</span>
<span class="line">- 功能单一</span>
<span class="line">- 更可预测</span>
<span class="line"></span>
<span class="line">只在需要自动解压时使用 ADD</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="run-执行命令" tabindex="-1"><a class="header-anchor" href="#run-执行命令"><span>RUN - 执行命令</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># Shell 形式（会启动 shell）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y nginx</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Exec 形式（不启动 shell）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> [<span class="token string">&quot;/bin/bash&quot;</span>, <span class="token string">&quot;-c&quot;</span>, <span class="token string">&quot;echo hello&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 多行命令（推荐）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get install -y <span class="token operator">\\</span></span>
<span class="line">        nginx <span class="token operator">\\</span></span>
<span class="line">        curl <span class="token operator">\\</span></span>
<span class="line">        vim &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get clean &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最佳实践：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ❌ 不好 - 创建多个层</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y nginx</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get clean</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 好 - 合并为一层</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get install -y nginx &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get clean &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="env-设置环境变量" tabindex="-1"><a class="header-anchor" href="#env-设置环境变量"><span>ENV - 设置环境变量</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 设置单个变量</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME /usr/lib/jvm/java-8-openjdk</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置多个变量</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> APP_VERSION=1.0 <span class="token operator">\\</span></span>
<span class="line">    APP_NAME=myapp <span class="token operator">\\</span></span>
<span class="line">    APP_PORT=8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用环境变量</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token variable">$JAVA_HOME</span></span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> <span class="token variable">$APP_HOME</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="arg-构建参数" tabindex="-1"><a class="header-anchor" href="#arg-构建参数"><span>ARG - 构建参数</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 定义构建参数</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ARG</span> VERSION=1.0</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ARG</span> BUILD_DATE</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用构建参数</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&quot;Building version: $VERSION&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建时传入参数</span></span>
<span class="line"><span class="token comment"># docker build --build-arg VERSION=2.0 .</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ARG vs ENV：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">ARG：</span>
<span class="line">- 只在构建时有效</span>
<span class="line">- 不会保留到镜像中</span>
<span class="line">- 用于构建时配置</span>
<span class="line"></span>
<span class="line">ENV：</span>
<span class="line">- 在构建和运行时都有效</span>
<span class="line">- 会保留到镜像中</span>
<span class="line">- 用于运行时配置</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="expose-声明端口" tabindex="-1"><a class="header-anchor" href="#expose-声明端口"><span>EXPOSE - 声明端口</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 声明单个端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 声明多个端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080 8443</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 声明 UDP 端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 53/udp</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> EXPOSE 只是声明，不会自动映射端口，需要在运行时用 <code>-p</code> 参数。</p><h4 id="volume-声明数据卷" tabindex="-1"><a class="header-anchor" href="#volume-声明数据卷"><span>VOLUME - 声明数据卷</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 声明单个卷</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">VOLUME</span> /data</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 声明多个卷</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">VOLUME</span> [<span class="token string">&quot;/data&quot;</span>, <span class="token string">&quot;/logs&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cmd-默认启动命令" tabindex="-1"><a class="header-anchor" href="#cmd-默认启动命令"><span>CMD - 默认启动命令</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># Shell 形式</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> java -jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Exec 形式（推荐）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 与 ENTRYPOINT 配合使用</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="entrypoint-入口点" tabindex="-1"><a class="header-anchor" href="#entrypoint-入口点"><span>ENTRYPOINT - 入口点</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># Exec 形式（推荐）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Shell 形式</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> java -jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 与 CMD 组合</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>]</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>CMD vs ENTRYPOINT：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">CMD：</span>
<span class="line">- 容易被 docker run 命令覆盖</span>
<span class="line">- 适合提供默认命令</span>
<span class="line"></span>
<span class="line">ENTRYPOINT：</span>
<span class="line">- 不容易被覆盖</span>
<span class="line">- 适合固定的启动命令</span>
<span class="line"></span>
<span class="line">组合使用：</span>
<span class="line">ENTRYPOINT 定义主命令</span>
<span class="line">CMD 定义默认参数</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="user-指定用户" tabindex="-1"><a class="header-anchor" href="#user-指定用户"><span>USER - 指定用户</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 创建用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> groupadd -r appuser &amp;&amp; useradd -r -g appuser appuser</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后续命令以 appuser 身份执行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="healthcheck-健康检查" tabindex="-1"><a class="header-anchor" href="#healthcheck-健康检查"><span>HEALTHCHECK - 健康检查</span></a></h4><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 基本健康检查</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">HEALTHCHECK</span> <span class="token options"><span class="token property">--interval</span><span class="token punctuation">=</span><span class="token string">30s</span> <span class="token property">--timeout</span><span class="token punctuation">=</span><span class="token string">3s</span></span> <span class="token operator">\\</span></span>
<span class="line">  <span class="token keyword">CMD</span> curl -f http://localhost:8080/health || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 详细配置</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">HEALTHCHECK</span> <span class="token options"><span class="token property">--interval</span><span class="token punctuation">=</span><span class="token string">5m</span> <span class="token property">--timeout</span><span class="token punctuation">=</span><span class="token string">3s</span> <span class="token property">--retries</span><span class="token punctuation">=</span><span class="token string">3</span></span> <span class="token operator">\\</span></span>
<span class="line">  <span class="token keyword">CMD</span> curl -f http://localhost/ || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 禁用健康检查</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">HEALTHCHECK</span> <span class="token keyword">NONE</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-多阶段构建" tabindex="-1"><a class="header-anchor" href="#_2-3-多阶段构建"><span>2.3 多阶段构建</span></a></h3><p>多阶段构建可以显著减小最终镜像的大小。</p><p><strong>示例：Spring Boot 应用</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 第一阶段：构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8 <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn clean package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 第二阶段：运行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/target/*.jar app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对比：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">单阶段构建镜像：800MB（包含 Maven、源码等）</span>
<span class="line">多阶段构建镜像：120MB（仅包含 JRE 和 JAR）</span>
<span class="line"></span>
<span class="line">节省空间：85%</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-dockerignore-文件" tabindex="-1"><a class="header-anchor" href="#_2-4-dockerignore-文件"><span>2.4 .dockerignore 文件</span></a></h3><p>类似 <code>.gitignore</code>，用于排除不需要的文件。</p><p><strong>示例：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># .dockerignore</span>
<span class="line">.git</span>
<span class="line">.gitignore</span>
<span class="line">.idea</span>
<span class="line">*.md</span>
<span class="line">target/</span>
<span class="line">*.log</span>
<span class="line">node_modules/</span>
<span class="line">.env</span>
<span class="line">docker-compose.yml</span>
<span class="line">Dockerfile</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、docker网络" tabindex="-1"><a class="header-anchor" href="#三、docker网络"><span>三、Docker网络</span></a></h2><h3 id="_3-1-网络模式" tabindex="-1"><a class="header-anchor" href="#_3-1-网络模式"><span>3.1 网络模式</span></a></h3><p>Docker 提供多种网络模式：</p><table><thead><tr><th>网络模式</th><th>说明</th><th>使用场景</th></tr></thead><tbody><tr><td>bridge</td><td>桥接网络（默认）</td><td>容器间通信</td></tr><tr><td>host</td><td>主机网络</td><td>性能要求高</td></tr><tr><td>none</td><td>无网络</td><td>安全隔离</td></tr><tr><td>container</td><td>共享网络</td><td>容器间紧密通信</td></tr><tr><td>自定义网络</td><td>用户定义</td><td>复杂网络拓扑</td></tr></tbody></table><h3 id="_3-2-bridge-网络-默认" tabindex="-1"><a class="header-anchor" href="#_3-2-bridge-网络-默认"><span>3.2 Bridge 网络（默认）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看默认网络</span></span>
<span class="line"><span class="token function">docker</span> network <span class="token function">ls</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 默认 bridge 网络信息</span></span>
<span class="line"><span class="token function">docker</span> network inspect bridge</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用默认网络运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 容器间通信（通过IP）</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> web <span class="token function">ping</span> <span class="token operator">&lt;</span>另一个容器的IP<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 自动分配 IP</span>
<span class="line">✅ 容器间可通过 IP 通信</span>
<span class="line">❌ 不支持容器名解析</span>
<span class="line">❌ 不适合生产环境</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-自定义bridge网络-推荐" tabindex="-1"><a class="header-anchor" href="#_3-3-自定义bridge网络-推荐"><span>3.3 自定义Bridge网络（推荐）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建自定义网络</span></span>
<span class="line"><span class="token function">docker</span> network create my-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看网络详情</span></span>
<span class="line"><span class="token function">docker</span> network inspect my-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在自定义网络中运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web <span class="token parameter variable">--network</span> my-network nginx</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> db <span class="token parameter variable">--network</span> my-network mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 容器间通信（通过容器名）</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> web <span class="token function">ping</span> db  <span class="token comment"># 成功！支持容器名解析</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优势：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 自动 DNS 解析</span>
<span class="line">✅ 更好的隔离性</span>
<span class="line">✅ 可以动态连接/断开</span>
<span class="line">✅ 适合生产环境</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-host-网络" tabindex="-1"><a class="header-anchor" href="#_3-4-host-网络"><span>3.4 Host 网络</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用主机网络</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web <span class="token parameter variable">--network</span> <span class="token function">host</span> nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 容器直接使用主机网络栈</span></span>
<span class="line"><span class="token comment"># 无需端口映射，性能最佳</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 性能最佳（无网络转换）</span>
<span class="line">❌ 端口冲突风险</span>
<span class="line">❌ 失去网络隔离</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-网络管理命令" tabindex="-1"><a class="header-anchor" href="#_3-5-网络管理命令"><span>3.5 网络管理命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建网络</span></span>
<span class="line"><span class="token function">docker</span> network create my-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定子网和网关</span></span>
<span class="line"><span class="token function">docker</span> network create <span class="token parameter variable">--subnet</span><span class="token operator">=</span><span class="token number">172.20</span>.0.0/16 <span class="token parameter variable">--gateway</span><span class="token operator">=</span><span class="token number">172.20</span>.0.1 my-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接容器到网络</span></span>
<span class="line"><span class="token function">docker</span> network connect my-network my-container</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 断开连接</span></span>
<span class="line"><span class="token function">docker</span> network disconnect my-network my-container</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除网络</span></span>
<span class="line"><span class="token function">docker</span> network <span class="token function">rm</span> my-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理未使用的网络</span></span>
<span class="line"><span class="token function">docker</span> network prune</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-端口映射" tabindex="-1"><a class="header-anchor" href="#_3-6-端口映射"><span>3.6 端口映射</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 映射单个端口</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 映射多个端口</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 <span class="token parameter variable">-p</span> <span class="token number">8443</span>:443 nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 映射到随机端口</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-P</span> nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 映射到指定 IP</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">127.0</span>.0.1:8080:80 nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看端口映射</span></span>
<span class="line"><span class="token function">docker</span> port my-container</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、docker数据卷-volume" tabindex="-1"><a class="header-anchor" href="#四、docker数据卷-volume"><span>四、Docker数据卷（Volume）</span></a></h2><h3 id="_4-1-为什么需要数据卷" tabindex="-1"><a class="header-anchor" href="#_4-1-为什么需要数据卷"><span>4.1 为什么需要数据卷？</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">问题：容器删除后，数据会丢失</span>
<span class="line"></span>
<span class="line">解决方案：</span>
<span class="line">1. 数据卷（Volume）- 推荐</span>
<span class="line">2. 绑定挂载（Bind Mount）</span>
<span class="line">3. tmpfs 挂载（临时文件系统）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-数据卷-volume" tabindex="-1"><a class="header-anchor" href="#_4-2-数据卷-volume"><span>4.2 数据卷（Volume）</span></a></h3><p><strong>创建和使用数据卷：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume create my-volume</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume <span class="token function">ls</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看数据卷详情</span></span>
<span class="line"><span class="token function">docker</span> volume inspect my-volume</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> db <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> my-volume:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume <span class="token function">rm</span> my-volume</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理未使用的数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume prune</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ Docker 管理，位置透明</span>
<span class="line">✅ 可以在容器间共享</span>
<span class="line">✅ 支持驱动程序</span>
<span class="line">✅ 备份和迁移方便</span>
<span class="line">✅ 推荐用于持久化数据</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-绑定挂载-bind-mount" tabindex="-1"><a class="header-anchor" href="#_4-3-绑定挂载-bind-mount"><span>4.3 绑定挂载（Bind Mount）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 挂载主机目录</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> web <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> /my/html:/usr/share/nginx/html <span class="token punctuation">\\</span></span>
<span class="line">  nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows 路径</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-v</span> C:<span class="token punctuation">\\</span>data:/data nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只读挂载</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-v</span> /my/html:/usr/share/nginx/html:ro nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 可以指定主机路径</span>
<span class="line">✅ 适合开发环境</span>
<span class="line">❌ 依赖主机文件系统</span>
<span class="line">❌ 不推荐用于生产环境</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-tmpfs-挂载" tabindex="-1"><a class="header-anchor" href="#_4-4-tmpfs-挂载"><span>4.4 tmpfs 挂载</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建内存文件系统</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> web <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--tmpfs</span> /tmp:rw,size<span class="token operator">=</span>100m <span class="token punctuation">\\</span></span>
<span class="line">  nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 存储在内存中</span>
<span class="line">✅ 性能极佳</span>
<span class="line">❌ 容器停止数据丢失</span>
<span class="line">❌ 不支持 Windows</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-数据卷容器" tabindex="-1"><a class="header-anchor" href="#_4-5-数据卷容器"><span>4.5 数据卷容器</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建数据卷容器</span></span>
<span class="line"><span class="token function">docker</span> create <span class="token parameter variable">-v</span> /data <span class="token parameter variable">--name</span> data-container busybox</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 其他容器使用数据卷容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> --volumes-from data-container <span class="token parameter variable">--name</span> app1 nginx</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> --volumes-from data-container <span class="token parameter variable">--name</span> app2 nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># app1 和 app2 共享 /data 目录</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-备份与恢复" tabindex="-1"><a class="header-anchor" href="#_4-6-备份与恢复"><span>4.6 备份与恢复</span></a></h3><p><strong>备份数据卷：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 备份数据卷到 tar 文件</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> my-volume:/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup <span class="token punctuation">\\</span></span>
<span class="line">  ubuntu <span class="token function">tar</span> czf /backup/backup.tar.gz /data</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>恢复数据卷：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 从 tar 文件恢复数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> my-volume:/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup <span class="token punctuation">\\</span></span>
<span class="line">  ubuntu <span class="token function">tar</span> xzf /backup/backup.tar.gz <span class="token parameter variable">-C</span> /</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、容器生命周期管理" tabindex="-1"><a class="header-anchor" href="#五、容器生命周期管理"><span>五、容器生命周期管理</span></a></h2><h3 id="_5-1-容器状态" tabindex="-1"><a class="header-anchor" href="#_5-1-容器状态"><span>5.1 容器状态</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">┌─────────┐</span>
<span class="line">│ Created │  docker create</span>
<span class="line">└────┬────┘</span>
<span class="line">     │ docker start</span>
<span class="line">     ▼</span>
<span class="line">┌─────────┐</span>
<span class="line">│ Running │  ◄──┐</span>
<span class="line">└────┬────┘     │</span>
<span class="line">     │          │ docker unpause</span>
<span class="line">     │ docker pause</span>
<span class="line">     ▼          │</span>
<span class="line">┌─────────┐    │</span>
<span class="line">│ Paused  │────┘</span>
<span class="line">└────┬────┘</span>
<span class="line">     │</span>
<span class="line">     │ docker stop</span>
<span class="line">     ▼</span>
<span class="line">┌─────────┐</span>
<span class="line">│ Stopped │</span>
<span class="line">└────┬────┘</span>
<span class="line">     │ docker rm</span>
<span class="line">     ▼</span>
<span class="line">┌─────────┐</span>
<span class="line">│ Deleted │</span>
<span class="line">└─────────┘</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-容器操作" tabindex="-1"><a class="header-anchor" href="#_5-2-容器操作"><span>5.2 容器操作</span></a></h3><p><strong>创建容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建但不启动</span></span>
<span class="line"><span class="token function">docker</span> create <span class="token parameter variable">--name</span> my-app nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看容器（包括未启动的）</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动已停止的容器</span></span>
<span class="line"><span class="token function">docker</span> start my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动并附加到容器</span></span>
<span class="line"><span class="token function">docker</span> start <span class="token parameter variable">-a</span> my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动所有已停止的容器</span></span>
<span class="line"><span class="token function">docker</span> start <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">)</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>停止容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 优雅停止（发送 SIGTERM，10秒后 SIGKILL）</span></span>
<span class="line"><span class="token function">docker</span> stop my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制停止（直接 SIGKILL）</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">kill</span> my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止所有运行中的容器</span></span>
<span class="line"><span class="token function">docker</span> stop <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重启容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 重启容器</span></span>
<span class="line"><span class="token function">docker</span> restart my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启策略</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always nginx</span>
<span class="line"><span class="token comment"># always - 总是重启</span></span>
<span class="line"><span class="token comment"># unless-stopped - 除非手动停止</span></span>
<span class="line"><span class="token comment"># on-failure - 失败时重启</span></span>
<span class="line"><span class="token comment"># no - 不自动重启（默认）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>暂停和恢复：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 暂停容器</span></span>
<span class="line"><span class="token function">docker</span> pause my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复容器</span></span>
<span class="line"><span class="token function">docker</span> unpause my-app</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 删除已停止的容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制删除运行中的容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除所有已停止的容器</span></span>
<span class="line"><span class="token function">docker</span> container prune</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除所有容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">)</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-容器资源限制" tabindex="-1"><a class="header-anchor" href="#_5-3-容器资源限制"><span>5.3 容器资源限制</span></a></h3><p><strong>CPU 限制：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 限制 CPU 使用率</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--cpus</span><span class="token operator">=</span><span class="token number">1.5</span> nginx  <span class="token comment"># 最多使用 1.5 个 CPU</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># CPU 份额（相对权重）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> --cpu-shares<span class="token operator">=</span><span class="token number">512</span> nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定 CPU 核心</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> --cpuset-cpus<span class="token operator">=</span><span class="token number">0,1</span> nginx  <span class="token comment"># 只使用 CPU 0 和 1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>内存限制：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 限制内存使用</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--memory</span><span class="token operator">=</span>512m nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 内存 + Swap 限制</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--memory</span><span class="token operator">=</span>512m --memory-swap<span class="token operator">=</span>1g nginx</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 内存预留</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> --memory-reservation<span class="token operator">=</span>256m nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>磁盘 I/O 限制：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 限制读写速度</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  --device-read-bps /dev/sda:1mb <span class="token punctuation">\\</span></span>
<span class="line">  --device-write-bps /dev/sda:1mb <span class="token punctuation">\\</span></span>
<span class="line">  nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看资源使用：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 实时查看资源使用</span></span>
<span class="line"><span class="token function">docker</span> stats</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看指定容器</span></span>
<span class="line"><span class="token function">docker</span> stats my-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有容器（包括已停止的）</span></span>
<span class="line"><span class="token function">docker</span> stats <span class="token parameter variable">--all</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、镜像构建最佳实践" tabindex="-1"><a class="header-anchor" href="#六、镜像构建最佳实践"><span>六、镜像构建最佳实践</span></a></h2><h3 id="_6-1-减小镜像体积" tabindex="-1"><a class="header-anchor" href="#_6-1-减小镜像体积"><span>6.1 减小镜像体积</span></a></h3><p><strong>1. 使用轻量级基础镜像</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ❌ 不好 - 800MB</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:latest</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 好 - 5MB</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ Java 应用</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine  # 而不是 openjdk:8-jdk</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 多阶段构建</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 构建阶段</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8 <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行阶段</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/target/*.jar app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 合并 RUN 指令</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ❌ 不好 - 创建多层</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y curl</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get clean</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 好 - 单层</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get install -y curl &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get clean &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4. 清理缓存和临时文件</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get install -y nginx &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get clean &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-利用构建缓存" tabindex="-1"><a class="header-anchor" href="#_6-2-利用构建缓存"><span>6.2 利用构建缓存</span></a></h3><p><strong>1. 合理安排指令顺序</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ✅ 好 - 先复制依赖文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .          # 依赖变化少，缓存命中率高</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn dependency:go-offline</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src          # 源码变化频繁，放在后面</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn package</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 使用 .dockerignore</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">.git</span>
<span class="line">.gitignore</span>
<span class="line">*.md</span>
<span class="line">target/</span>
<span class="line">node_modules/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-安全性" tabindex="-1"><a class="header-anchor" href="#_6-3-安全性"><span>6.3 安全性</span></a></h3><p><strong>1. 不要以 root 用户运行</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 创建普通用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> groupadd -r appuser &amp;&amp; useradd -r -g appuser appuser</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置工作目录权限</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> chown -R appuser:appuser /app</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 不要在镜像中存储敏感信息</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ❌ 不好</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> PASSWORD=secret123</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 好 - 运行时传入</span></span>
<span class="line">docker run -e PASSWORD=secret123 myapp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 使用具体的版本号</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ❌ 不好</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> nginx:latest</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 好</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> nginx:1.21-alpine</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-示例-优化的-spring-boot-dockerfile" tabindex="-1"><a class="header-anchor" href="#_6-4-示例-优化的-spring-boot-dockerfile"><span>6.4 示例：优化的 Spring Boot Dockerfile</span></a></h3><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 多阶段构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8-slim <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制 pom.xml 并下载依赖（利用缓存）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn dependency:go-offline</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制源码并构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn clean package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行阶段</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装依赖</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apk add --no-cache tzdata &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    echo <span class="token string">&quot;Asia/Shanghai&quot;</span> &gt; /etc/timezone &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apk del tzdata</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> addgroup -S appgroup &amp;&amp; adduser -S appuser -G appgroup</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置工作目录</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制 jar 文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改权限</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> chown -R appuser:appgroup /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 健康检查</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">HEALTHCHECK</span> <span class="token options"><span class="token property">--interval</span><span class="token punctuation">=</span><span class="token string">30s</span> <span class="token property">--timeout</span><span class="token punctuation">=</span><span class="token string">3s</span> <span class="token property">--retries</span><span class="token punctuation">=</span><span class="token string">3</span></span> <span class="token operator">\\</span></span>
<span class="line">  <span class="token keyword">CMD</span> wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 暴露端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动应用</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token operator">\\</span></span>
<span class="line">    <span class="token string">&quot;-Djava.security.egd=file:/dev/./urandom&quot;</span>, <span class="token operator">\\</span></span>
<span class="line">    <span class="token string">&quot;-Xms256m&quot;</span>, <span class="token operator">\\</span></span>
<span class="line">    <span class="token string">&quot;-Xmx512m&quot;</span>, <span class="token operator">\\</span></span>
<span class="line">    <span class="token string">&quot;-jar&quot;</span>, <span class="token operator">\\</span></span>
<span class="line">    <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、小结" tabindex="-1"><a class="header-anchor" href="#七、小结"><span>七、小结</span></a></h2><p>通过本章学习，你应该掌握：</p><p>✅ <strong>镜像原理</strong></p><ul><li>分层存储</li><li>写时复制</li><li>镜像ID和摘要</li></ul><p>✅ <strong>Dockerfile</strong></p><ul><li>常用指令</li><li>多阶段构建</li><li>.dockerignore</li></ul><p>✅ <strong>Docker 网络</strong></p><ul><li>网络模式</li><li>自定义网络</li><li>端口映射</li></ul><p>✅ <strong>数据卷</strong></p><ul><li>Volume 管理</li><li>绑定挂载</li><li>备份恢复</li></ul><p>✅ <strong>容器管理</strong></p><ul><li>生命周期</li><li>资源限制</li><li>最佳实践</li></ul><p><strong>下一章预告：</strong> 在下一章中，我们将进行实战演练，学习如何容器化 Spring Boot、MySQL、Redis 等常用应用。</p><hr>`,189)),n("p",null,[s[1]||(s[1]=n("strong",null,"继续学习",-1)),s[2]||(s[2]=a(" → ",-1)),c(e,{to:"/tutorials/java-backend/docker/3.Docker%E5%AE%9E%E6%88%98%E5%BA%94%E7%94%A8.html"},{default:t(()=>[...s[0]||(s[0]=[a("第三章：Docker 实战应用",-1)])]),_:1})])])}const k=l(o,[["render",v]]),b=JSON.parse('{"path":"/tutorials/java-backend/docker/2.Dockerhexingainian.html","title":"Docker核心概念","lang":"zh-CN","frontmatter":{"title":"Docker核心概念"},"headers":[{"level":2,"title":"一、Docker镜像原理","slug":"一、docker镜像原理","link":"#一、docker镜像原理","children":[{"level":3,"title":"1.1 镜像的本质","slug":"_1-1-镜像的本质","link":"#_1-1-镜像的本质","children":[]},{"level":3,"title":"1.2 分层存储（Union FS）","slug":"_1-2-分层存储-union-fs","link":"#_1-2-分层存储-union-fs","children":[]},{"level":3,"title":"1.3 写时复制（Copy-on-Write）","slug":"_1-3-写时复制-copy-on-write","link":"#_1-3-写时复制-copy-on-write","children":[]},{"level":3,"title":"1.4 镜像ID与摘要","slug":"_1-4-镜像id与摘要","link":"#_1-4-镜像id与摘要","children":[]}]},{"level":2,"title":"二、Dockerfile详解","slug":"二、dockerfile详解","link":"#二、dockerfile详解","children":[{"level":3,"title":"2.1 Dockerfile 基础","slug":"_2-1-dockerfile-基础","link":"#_2-1-dockerfile-基础","children":[]},{"level":3,"title":"2.2 Dockerfile 指令详解","slug":"_2-2-dockerfile-指令详解","link":"#_2-2-dockerfile-指令详解","children":[]},{"level":3,"title":"2.3 多阶段构建","slug":"_2-3-多阶段构建","link":"#_2-3-多阶段构建","children":[]},{"level":3,"title":"2.4 .dockerignore 文件","slug":"_2-4-dockerignore-文件","link":"#_2-4-dockerignore-文件","children":[]}]},{"level":2,"title":"三、Docker网络","slug":"三、docker网络","link":"#三、docker网络","children":[{"level":3,"title":"3.1 网络模式","slug":"_3-1-网络模式","link":"#_3-1-网络模式","children":[]},{"level":3,"title":"3.2 Bridge 网络（默认）","slug":"_3-2-bridge-网络-默认","link":"#_3-2-bridge-网络-默认","children":[]},{"level":3,"title":"3.3 自定义Bridge网络（推荐）","slug":"_3-3-自定义bridge网络-推荐","link":"#_3-3-自定义bridge网络-推荐","children":[]},{"level":3,"title":"3.4 Host 网络","slug":"_3-4-host-网络","link":"#_3-4-host-网络","children":[]},{"level":3,"title":"3.5 网络管理命令","slug":"_3-5-网络管理命令","link":"#_3-5-网络管理命令","children":[]},{"level":3,"title":"3.6 端口映射","slug":"_3-6-端口映射","link":"#_3-6-端口映射","children":[]}]},{"level":2,"title":"四、Docker数据卷（Volume）","slug":"四、docker数据卷-volume","link":"#四、docker数据卷-volume","children":[{"level":3,"title":"4.1 为什么需要数据卷？","slug":"_4-1-为什么需要数据卷","link":"#_4-1-为什么需要数据卷","children":[]},{"level":3,"title":"4.2 数据卷（Volume）","slug":"_4-2-数据卷-volume","link":"#_4-2-数据卷-volume","children":[]},{"level":3,"title":"4.3 绑定挂载（Bind Mount）","slug":"_4-3-绑定挂载-bind-mount","link":"#_4-3-绑定挂载-bind-mount","children":[]},{"level":3,"title":"4.4 tmpfs 挂载","slug":"_4-4-tmpfs-挂载","link":"#_4-4-tmpfs-挂载","children":[]},{"level":3,"title":"4.5 数据卷容器","slug":"_4-5-数据卷容器","link":"#_4-5-数据卷容器","children":[]},{"level":3,"title":"4.6 备份与恢复","slug":"_4-6-备份与恢复","link":"#_4-6-备份与恢复","children":[]}]},{"level":2,"title":"五、容器生命周期管理","slug":"五、容器生命周期管理","link":"#五、容器生命周期管理","children":[{"level":3,"title":"5.1 容器状态","slug":"_5-1-容器状态","link":"#_5-1-容器状态","children":[]},{"level":3,"title":"5.2 容器操作","slug":"_5-2-容器操作","link":"#_5-2-容器操作","children":[]},{"level":3,"title":"5.3 容器资源限制","slug":"_5-3-容器资源限制","link":"#_5-3-容器资源限制","children":[]}]},{"level":2,"title":"六、镜像构建最佳实践","slug":"六、镜像构建最佳实践","link":"#六、镜像构建最佳实践","children":[{"level":3,"title":"6.1 减小镜像体积","slug":"_6-1-减小镜像体积","link":"#_6-1-减小镜像体积","children":[]},{"level":3,"title":"6.2 利用构建缓存","slug":"_6-2-利用构建缓存","link":"#_6-2-利用构建缓存","children":[]},{"level":3,"title":"6.3 安全性","slug":"_6-3-安全性","link":"#_6-3-安全性","children":[]},{"level":3,"title":"6.4 示例：优化的 Spring Boot Dockerfile","slug":"_6-4-示例-优化的-spring-boot-dockerfile","link":"#_6-4-示例-优化的-spring-boot-dockerfile","children":[]}]},{"level":2,"title":"七、小结","slug":"七、小结","link":"#七、小结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/docker/2.Docker核心概念.md"}');export{k as comp,b as data};
