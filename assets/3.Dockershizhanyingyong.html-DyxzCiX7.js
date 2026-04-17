import{_ as p,c as l,d as i,e as n,f as a,b as t,w as c,r as o,o as r}from"./app-BXKg5Fxk.js";const d={};function u(k,s){const e=o("RouteLink");return r(),l("div",null,[s[3]||(s[3]=i(`<h1 id="docker实战应用" tabindex="-1"><a class="header-anchor" href="#docker实战应用"><span>Docker实战应用</span></a></h1><h2 id="一、容器化部署-spring-boot-应用" tabindex="-1"><a class="header-anchor" href="#一、容器化部署-spring-boot-应用"><span>一、容器化部署 Spring Boot 应用</span></a></h2><h3 id="_1-1-准备-spring-boot-项目" tabindex="-1"><a class="header-anchor" href="#_1-1-准备-spring-boot-项目"><span>1.1 准备 Spring Boot 项目</span></a></h3><p><strong>创建简单的 Spring Boot 项目：</strong></p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">// src/main/java/com/example/demo/DemoApplication.java</span></span>
<span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>demo</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">GetMapping</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation punctuation">@SpringBootApplication</span></span>
<span class="line"><span class="token annotation punctuation">@RestController</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoApplication</span> <span class="token punctuation">{</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">DemoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">home</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&quot;Hello Docker!&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/health&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">health</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&quot;OK&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>pom.xml 配置：</strong></p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    </span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    </span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    </span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>application.yml：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">application</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>app</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">management</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">web</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">exposure</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">include</span><span class="token punctuation">:</span> health<span class="token punctuation">,</span>info</span>
<span class="line">  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">health</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">show-details</span><span class="token punctuation">:</span> always</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-方式一-简单-dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-2-方式一-简单-dockerfile"><span>1.2 方式一：简单 Dockerfile</span></a></h3><p><strong>Dockerfile：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置工作目录</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制 jar 包</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> target/demo-1.0.0.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 暴露端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动应用</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构建和运行：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 打包项目</span></span>
<span class="line">mvn clean package</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 构建镜像</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> demo-app:v1 <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">--name</span> demo demo-app:v1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 测试</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:8080/</span>
<span class="line"><span class="token function">curl</span> http://localhost:8080/health</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 查看日志</span></span>
<span class="line"><span class="token function">docker</span> logs <span class="token parameter variable">-f</span> demo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-方式二-优化的-dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-3-方式二-优化的-dockerfile"><span>1.3 方式二：优化的 Dockerfile</span></a></h3><p><strong>Dockerfile（多阶段构建）：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 构建阶段</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8-slim <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制 pom.xml 并下载依赖</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn dependency:go-offline -B</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制源码并构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn clean package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行阶段</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 tzdata 设置时区</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apk add --no-cache tzdata &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    echo <span class="token string">&quot;Asia/Shanghai&quot;</span> &gt; /etc/timezone &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apk del tzdata</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建非 root 用户</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> addgroup -S spring &amp;&amp; adduser -S spring -G spring</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> spring:spring</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置工作目录</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从构建阶段复制 jar 文件</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 健康检查</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">HEALTHCHECK</span> <span class="token options"><span class="token property">--interval</span><span class="token punctuation">=</span><span class="token string">30s</span> <span class="token property">--timeout</span><span class="token punctuation">=</span><span class="token string">3s</span> <span class="token property">--start-period</span><span class="token punctuation">=</span><span class="token string">40s</span> <span class="token property">--retries</span><span class="token punctuation">=</span><span class="token string">3</span></span> <span class="token operator">\\</span></span>
<span class="line">  <span class="token keyword">CMD</span> wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 暴露端口</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># JVM 参数优化</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> JAVA_OPTS=<span class="token string">&quot;-Xms256m -Xmx512m -XX:+UseG1GC&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动应用</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;sh&quot;</span>, <span class="token string">&quot;-c&quot;</span>, <span class="token string">&quot;java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构建和运行：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 构建镜像（自动打包）</span></span>
<span class="line"><span class="token function">docker</span> build <span class="token parameter variable">-t</span> demo-app:v2 <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> demo <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">JAVA_OPTS</span><span class="token operator">=</span><span class="token string">&quot;-Xms512m -Xmx1g&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--restart</span> unless-stopped <span class="token punctuation">\\</span></span>
<span class="line">  demo-app:v2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看健康状态</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span></span>
<span class="line"><span class="token function">docker</span> inspect demo <span class="token operator">|</span> <span class="token function">grep</span> Health <span class="token parameter variable">-A</span> <span class="token number">10</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-方式三-分层优化" tabindex="-1"><a class="header-anchor" href="#_1-4-方式三-分层优化"><span>1.4 方式三：分层优化</span></a></h3><p><strong>Dockerfile（利用 Spring Boot 分层）：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ARG</span> JAR_FILE=target/*.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token variable">\${JAR_FILE}</span> app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> java -Djarmode=layertools -jar app.jar extract</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制各层（利用缓存）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/dependencies/ ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/spring-boot-loader/ ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/snapshot-dependencies/ ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/application/ ./</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;org.springframework.boot.loader.JarLauncher&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-集成数据库和redis" tabindex="-1"><a class="header-anchor" href="#_1-5-集成数据库和redis"><span>1.5 集成数据库和Redis</span></a></h3><p><strong>application.yml：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">datasource</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>DB_HOST<span class="token punctuation">:</span>localhost<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>DB_PORT<span class="token punctuation">:</span><span class="token number">3306</span><span class="token punctuation">}</span>/$<span class="token punctuation">{</span>DB_NAME<span class="token punctuation">:</span>testdb<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_USER<span class="token punctuation">:</span>root<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_PASSWORD<span class="token punctuation">:</span>root<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>REDIS_HOST<span class="token punctuation">:</span>localhost<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>REDIS_PORT<span class="token punctuation">:</span><span class="token number">6379</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>REDIS_PASSWORD<span class="token punctuation">:</span><span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">  <span class="token key atrule">jpa</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">hibernate</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">ddl-auto</span><span class="token punctuation">:</span> update</span>
<span class="line">    <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器（连接外部服务）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> demo <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">DB_HOST</span><span class="token operator">=</span>mysql-container <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">DB_PORT</span><span class="token operator">=</span><span class="token number">3306</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">DB_NAME</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">DB_USER</span><span class="token operator">=</span>root <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">DB_PASSWORD</span><span class="token operator">=</span>root123 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">REDIS_HOST</span><span class="token operator">=</span>redis-container <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">REDIS_PORT</span><span class="token operator">=</span><span class="token number">6379</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> my-network <span class="token punctuation">\\</span></span>
<span class="line">  demo-app:v2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="二、容器化部署-mysql-数据库" tabindex="-1"><a class="header-anchor" href="#二、容器化部署-mysql-数据库"><span>二、容器化部署 MySQL 数据库</span></a></h2><h3 id="_2-1-基本部署" tabindex="-1"><a class="header-anchor" href="#_2-1-基本部署"><span>2.1 基本部署</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 运行 MySQL 容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root123 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_DATABASE</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_USER</span><span class="token operator">=</span>appuser <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_PASSWORD</span><span class="token operator">=</span>apppass <span class="token punctuation">\\</span></span>
<span class="line">  mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看日志</span></span>
<span class="line"><span class="token function">docker</span> logs mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql <span class="token function">bash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接 MySQL</span></span>
<span class="line">mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot123</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-持久化数据" tabindex="-1"><a class="header-anchor" href="#_2-2-持久化数据"><span>2.2 持久化数据</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume create mysql-data</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行容器（使用数据卷）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root123 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_DATABASE</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql-data:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看数据卷位置</span></span>
<span class="line"><span class="token function">docker</span> volume inspect mysql-data</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-自定义配置" tabindex="-1"><a class="header-anchor" href="#_2-3-自定义配置"><span>2.3 自定义配置</span></a></h3><p><strong>创建配置文件 my.cnf：</strong></p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token comment"># 字符集配置</span></span>
<span class="line"><span class="token key attr-name">character-set-server</span><span class="token punctuation">=</span><span class="token value attr-value">utf8mb4</span></span>
<span class="line"><span class="token key attr-name">collation-server</span><span class="token punctuation">=</span><span class="token value attr-value">utf8mb4_unicode_ci</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 性能优化</span></span>
<span class="line"><span class="token key attr-name">max_connections</span><span class="token punctuation">=</span><span class="token value attr-value">200</span></span>
<span class="line"><span class="token key attr-name">innodb_buffer_pool_size</span><span class="token punctuation">=</span><span class="token value attr-value">256M</span></span>
<span class="line"><span class="token key attr-name">innodb_log_file_size</span><span class="token punctuation">=</span><span class="token value attr-value">64M</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 慢查询日志</span></span>
<span class="line"><span class="token key attr-name">slow_query_log</span><span class="token punctuation">=</span><span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">slow_query_log_file</span><span class="token punctuation">=</span><span class="token value attr-value">/var/log/mysql/slow.log</span></span>
<span class="line"><span class="token key attr-name">long_query_time</span><span class="token punctuation">=</span><span class="token value attr-value">2</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 时区设置</span></span>
<span class="line"><span class="token key attr-name">default-time-zone</span><span class="token punctuation">=</span><span class="token value attr-value">&#39;<span class="token inner-value">+08:00</span>&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">client</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">default-character-set</span><span class="token punctuation">=</span><span class="token value attr-value">utf8mb4</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器（使用自定义配置）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root123 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_DATABASE</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql-data:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/my.cnf:/etc/mysql/conf.d/my.cnf <span class="token punctuation">\\</span></span>
<span class="line">  mysql:8.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-初始化数据库" tabindex="-1"><a class="header-anchor" href="#_2-4-初始化数据库"><span>2.4 初始化数据库</span></a></h3><p><strong>创建初始化脚本 init.sql：</strong></p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token comment">-- 创建数据库</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> testdb <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8mb4<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">USE</span> testdb<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建表</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> users <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">BIGINT</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    username <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span></span>
<span class="line">    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 插入测试数据</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> users <span class="token punctuation">(</span>username<span class="token punctuation">,</span> email<span class="token punctuation">)</span> <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;alice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;alice@example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;bob&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bob@example.com&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建用户并授权</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token string">&#39;appuser&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;apppass&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;appuser&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line">FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器（自动初始化）：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root123 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql-data:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/init.sql:/docker-entrypoint-initdb.d/init.sql <span class="token punctuation">\\</span></span>
<span class="line">  mysql:8.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-备份和恢复" tabindex="-1"><a class="header-anchor" href="#_2-5-备份和恢复"><span>2.5 备份和恢复</span></a></h3><p><strong>备份数据库：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方式1：使用 mysqldump</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> mysql mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot123</span> testdb <span class="token operator">&gt;</span> backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式2：备份整个数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql-data:/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup <span class="token punctuation">\\</span></span>
<span class="line">  ubuntu <span class="token function">tar</span> czf /backup/mysql-backup.tar.gz /data</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>恢复数据库：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 方式1：导入 SQL 文件</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> mysql mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot123</span> testdb <span class="token operator">&lt;</span> backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式2：恢复数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql-data:/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup <span class="token punctuation">\\</span></span>
<span class="line">  ubuntu <span class="token function">tar</span> xzf /backup/mysql-backup.tar.gz <span class="token parameter variable">-C</span> /</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、容器化部署-redis-缓存" tabindex="-1"><a class="header-anchor" href="#三、容器化部署-redis-缓存"><span>三、容器化部署 Redis 缓存</span></a></h2><h3 id="_3-1-基本部署" tabindex="-1"><a class="header-anchor" href="#_3-1-基本部署"><span>3.1 基本部署</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 运行 Redis 容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">  redis:6.2-alpine</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试连接</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis redis-cli</span>
<span class="line"><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token function">ping</span></span>
<span class="line">PONG</span>
<span class="line"><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> name <span class="token string">&quot;Docker&quot;</span></span>
<span class="line">OK</span>
<span class="line"><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get name</span>
<span class="line"><span class="token string">&quot;Docker&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-持久化配置" tabindex="-1"><a class="header-anchor" href="#_3-2-持久化配置"><span>3.2 持久化配置</span></a></h3><p><strong>创建 redis.conf：</strong></p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line"># 网络配置</span>
<span class="line">bind 0.0.0.0</span>
<span class="line">protected-mode yes</span>
<span class="line">port 6379</span>
<span class="line"></span>
<span class="line"># 密码配置</span>
<span class="line">requirepass redis123</span>
<span class="line"></span>
<span class="line"># 持久化配置 - AOF</span>
<span class="line">appendonly yes</span>
<span class="line">appendfilename &quot;appendonly.aof&quot;</span>
<span class="line">appendfsync everysec</span>
<span class="line"></span>
<span class="line"># 持久化配置 - RDB</span>
<span class="line">save 900 1</span>
<span class="line">save 300 10</span>
<span class="line">save 60 10000</span>
<span class="line">dbfilename dump.rdb</span>
<span class="line">dir /data</span>
<span class="line"></span>
<span class="line"># 内存配置</span>
<span class="line">maxmemory 256mb</span>
<span class="line">maxmemory-policy allkeys-lru</span>
<span class="line"></span>
<span class="line"># 日志</span>
<span class="line">loglevel notice</span>
<span class="line">logfile /data/redis.log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume create redis-data</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> redis-data:/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/redis.conf:/usr/local/etc/redis/redis.conf <span class="token punctuation">\\</span></span>
<span class="line">  redis:6.2-alpine redis-server /usr/local/etc/redis/redis.conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-带密码的-redis" tabindex="-1"><a class="header-anchor" href="#_3-3-带密码的-redis"><span>3.3 带密码的 Redis</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 运行带密码的 Redis</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">REDIS_PASSWORD</span><span class="token operator">=</span>redis123 <span class="token punctuation">\\</span></span>
<span class="line">  redis:6.2-alpine redis-server <span class="token parameter variable">--requirepass</span> redis123</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接测试</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis redis-cli <span class="token parameter variable">-a</span> redis123</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-redis-集群-简化版" tabindex="-1"><a class="header-anchor" href="#_3-4-redis-集群-简化版"><span>3.4 Redis 集群（简化版）</span></a></h3><p><strong>创建 3 个 Redis 节点：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建网络</span></span>
<span class="line"><span class="token function">docker</span> network create redis-cluster</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动 3 个 Redis 节点</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">  <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--name</span> redis-<span class="token variable">$i</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--network</span> redis-cluster <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">-p</span> <span class="token number">637</span><span class="token variable">$i</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">    redis:6.2-alpine redis-server --cluster-enabled <span class="token function">yes</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看节点</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> redis</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、容器化部署-nginx-服务" tabindex="-1"><a class="header-anchor" href="#四、容器化部署-nginx-服务"><span>四、容器化部署 Nginx 服务</span></a></h2><h3 id="_4-1-基本部署" tabindex="-1"><a class="header-anchor" href="#_4-1-基本部署"><span>4.1 基本部署</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 运行 Nginx 容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span></span>
<span class="line">  nginx:alpine</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 访问测试</span></span>
<span class="line"><span class="token function">curl</span> http://localhost</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-自定义网页" tabindex="-1"><a class="header-anchor" href="#_4-2-自定义网页"><span>4.2 自定义网页</span></a></h3><p><strong>创建网页文件 index.html：</strong></p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Docker Nginx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css"></span>
<span class="line">        <span class="token selector">body</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token property">font-family</span><span class="token punctuation">:</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span></span>
<span class="line">            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line">            <span class="token property">padding</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token selector">h1</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> #0066cc<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Hello from Docker Nginx!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>This is a custom HTML page served by Nginx in Docker.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/html:/usr/share/nginx/html <span class="token punctuation">\\</span></span>
<span class="line">  nginx:alpine</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-自定义配置" tabindex="-1"><a class="header-anchor" href="#_4-3-自定义配置"><span>4.3 自定义配置</span></a></h3><p><strong>创建 nginx.conf：</strong></p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">user</span> nginx</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">worker_processes</span> auto</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">error_log</span> /var/log/nginx/error.log warn</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token directive"><span class="token keyword">pid</span> /var/run/nginx.pid</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">1024</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">include</span> /etc/nginx/mime.types</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">default_type</span> application/octet-stream</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">log_format</span> main <span class="token string">&#39;<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span></span>
<span class="line">                    <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span></span>
<span class="line">                    <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">access_log</span> /var/log/nginx/access.log main</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">sendfile</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">65</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 上游服务器</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">upstream</span> backend</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> app1:8080</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server</span> app2:8080</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token directive"><span class="token keyword">location</span> /api</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_pass</span> http://backend</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/html:/usr/share/nginx/html <span class="token punctuation">\\</span></span>
<span class="line">  nginx:alpine</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-反向代理-spring-boot" tabindex="-1"><a class="header-anchor" href="#_4-4-反向代理-spring-boot"><span>4.4 反向代理 Spring Boot</span></a></h3><p><strong>创建 default.conf：</strong></p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">upstream</span> springboot</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server</span> demo:8080</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 静态资源</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># API 代理</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /api/</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_pass</span> http://springboot/</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Real-IP <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-Proto <span class="token variable">$scheme</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># WebSocket 支持</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /ws/</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_pass</span> http://springboot/ws/</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_http_version</span> 1.1</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> Upgrade <span class="token variable">$http_upgrade</span></span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token directive"><span class="token keyword">proxy_set_header</span> Connection <span class="token string">&quot;upgrade&quot;</span></span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行容器：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建网络</span></span>
<span class="line"><span class="token function">docker</span> network create app-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 Spring Boot</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> demo <span class="token parameter variable">--network</span> app-network demo-app:v2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 Nginx</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> app-network <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/default.conf:/etc/nginx/conf.d/default.conf <span class="token punctuation">\\</span></span>
<span class="line">  nginx:alpine</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、多阶段构建优化镜像" tabindex="-1"><a class="header-anchor" href="#五、多阶段构建优化镜像"><span>五、多阶段构建优化镜像</span></a></h2><h3 id="_5-1-java-应用优化" tabindex="-1"><a class="header-anchor" href="#_5-1-java-应用优化"><span>5.1 Java 应用优化</span></a></h3><p><strong>传统方式（单阶段）：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn package</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;target/app.jar&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 镜像大小：~800MB</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优化方式（多阶段）：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 阶段1：构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8-slim <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn dependency:go-offline</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阶段2：运行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/target/*.jar app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 镜像大小：~120MB（减少85%）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-node-js-应用优化" tabindex="-1"><a class="header-anchor" href="#_5-2-node-js-应用优化"><span>5.2 Node.js 应用优化</span></a></h3><p><strong>优化的 Dockerfile：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 阶段1：依赖安装</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> node:16-alpine <span class="token keyword">AS</span> deps</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> package*.json ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm ci --only=production</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阶段2：构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> node:16-alpine <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> package*.json ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm ci</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm run build</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阶段3：运行</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> node:16-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENV</span> NODE_ENV=production</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">deps</span></span> /app/node_modules ./node_modules</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/dist ./dist</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> package.json ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 3000</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;node&quot;</span>, <span class="token string">&quot;dist/main.js&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-go-应用优化" tabindex="-1"><a class="header-anchor" href="#_5-3-go-应用优化"><span>5.3 Go 应用优化</span></a></h3><p><strong>极致优化的 Dockerfile：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 阶段1：构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> golang:1.19-alpine <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> go.* ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> go mod download</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阶段2：运行（使用 scratch 最小镜像）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> scratch</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/app /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;/app&quot;</span>]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 镜像大小：~10MB</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、常见问题与解决方案" tabindex="-1"><a class="header-anchor" href="#六、常见问题与解决方案"><span>六、常见问题与解决方案</span></a></h2><h3 id="_6-1-容器无法启动" tabindex="-1"><a class="header-anchor" href="#_6-1-容器无法启动"><span>6.1 容器无法启动</span></a></h3><p><strong>问题：容器启动后立即退出</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看容器状态</span></span>
<span class="line"><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看日志</span></span>
<span class="line"><span class="token function">docker</span> logs container-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看详细信息</span></span>
<span class="line"><span class="token function">docker</span> inspect container-name</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常见原因：</strong></p><ol><li>应用启动失败</li><li>端口已被占用</li><li>配置文件错误</li><li>权限问题</li></ol><h3 id="_6-2-网络连接问题" tabindex="-1"><a class="header-anchor" href="#_6-2-网络连接问题"><span>6.2 网络连接问题</span></a></h3><p><strong>问题：容器间无法通信</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 检查网络</span></span>
<span class="line"><span class="token function">docker</span> network <span class="token function">ls</span></span>
<span class="line"><span class="token function">docker</span> network inspect bridge</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 确保容器在同一网络</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--network</span> my-network nginx</span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--network</span> my-network mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试连通性</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> container1 <span class="token function">ping</span> container2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-数据丢失问题" tabindex="-1"><a class="header-anchor" href="#_6-3-数据丢失问题"><span>6.3 数据丢失问题</span></a></h3><p><strong>问题：容器删除后数据丢失</strong></p><p><strong>解决方案：使用数据卷</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建数据卷</span></span>
<span class="line"><span class="token function">docker</span> volume create app-data</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-v</span> app-data:/data myapp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-v</span> app-data:/data <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/backup ubuntu <span class="token function">tar</span> czf /backup/data.tar.gz /data</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-性能问题" tabindex="-1"><a class="header-anchor" href="#_6-4-性能问题"><span>6.4 性能问题</span></a></h3><p><strong>问题：容器性能差</strong></p><p><strong>解决方案：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 限制资源使用</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--memory</span><span class="token operator">=</span>512m <span class="token parameter variable">--cpus</span><span class="token operator">=</span><span class="token number">1.0</span> myapp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 查看资源使用</span></span>
<span class="line"><span class="token function">docker</span> stats</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 优化镜像大小</span></span>
<span class="line"><span class="token comment"># - 使用 alpine 基础镜像</span></span>
<span class="line"><span class="token comment"># - 多阶段构建</span></span>
<span class="line"><span class="token comment"># - 清理缓存和临时文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 使用宿主机网络（性能最佳）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--network</span> <span class="token function">host</span> myapp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-镜像过大" tabindex="-1"><a class="header-anchor" href="#_6-5-镜像过大"><span>6.5 镜像过大</span></a></h3><p><strong>问题：镜像体积过大</strong></p><p><strong>解决方案：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># 1. 使用 alpine 镜像</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 合并 RUN 命令</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get install -y curl &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get clean &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 多阶段构建</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8 <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn package</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /app/target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 使用 .dockerignore</span></span>
<span class="line">echo &quot;node_modules&quot; &gt;&gt; .dockerignore</span>
<span class="line">echo &quot;.git&quot; &gt;&gt; .dockerignore</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、完整示例-spring-boot-mysql-redis-nginx" tabindex="-1"><a class="header-anchor" href="#七、完整示例-spring-boot-mysql-redis-nginx"><span>七、完整示例：Spring Boot + MySQL + Redis + Nginx</span></a></h2><h3 id="_7-1-项目结构" tabindex="-1"><a class="header-anchor" href="#_7-1-项目结构"><span>7.1 项目结构</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">project/</span>
<span class="line">├── app/</span>
<span class="line">│   ├── src/</span>
<span class="line">│   ├── pom.xml</span>
<span class="line">│   └── Dockerfile</span>
<span class="line">├── nginx/</span>
<span class="line">│   ├── nginx.conf</span>
<span class="line">│   └── Dockerfile</span>
<span class="line">├── mysql/</span>
<span class="line">│   └── init.sql</span>
<span class="line">└── docker-compose.yml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-spring-boot-dockerfile" tabindex="-1"><a class="header-anchor" href="#_7-2-spring-boot-dockerfile"><span>7.2 Spring Boot Dockerfile</span></a></h3><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> maven:3.8-openjdk-8-slim <span class="token keyword">AS</span> builder</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> pom.xml .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn dependency:go-offline</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> src ./src</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> mvn package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jre-alpine</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> addgroup -S spring &amp;&amp; adduser -S spring -G spring</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">USER</span> spring:spring</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /build/target/*.jar app.jar</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;java&quot;</span>, <span class="token string">&quot;-jar&quot;</span>, <span class="token string">&quot;app.jar&quot;</span>]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-运行命令" tabindex="-1"><a class="header-anchor" href="#_7-3-运行命令"><span>7.3 运行命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建网络</span></span>
<span class="line"><span class="token function">docker</span> network create app-net</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 MySQL</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> app-net <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root123 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_DATABASE</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql-data:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 Redis</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> app-net <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> redis-data:/data <span class="token punctuation">\\</span></span>
<span class="line">  redis:6.2-alpine</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 Spring Boot</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> app-net <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">DB_HOST</span><span class="token operator">=</span>mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">REDIS_HOST</span><span class="token operator">=</span>redis <span class="token punctuation">\\</span></span>
<span class="line">  demo-app:v2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行 Nginx</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--network</span> app-net <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\\</span></span>
<span class="line">  nginx:alpine</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="八、小结" tabindex="-1"><a class="header-anchor" href="#八、小结"><span>八、小结</span></a></h2><p>通过本章学习，你应该掌握：</p><p>✅ <strong>Spring Boot 容器化</strong></p><ul><li>基本 Dockerfile</li><li>优化技巧</li><li>多阶段构建</li></ul><p>✅ <strong>MySQL 容器化</strong></p><ul><li>数据持久化</li><li>自定义配置</li><li>备份恢复</li></ul><p>✅ <strong>Redis 容器化</strong></p><ul><li>持久化配置</li><li>密码保护</li><li>性能优化</li></ul><p>✅ <strong>Nginx 容器化</strong></p><ul><li>反向代理</li><li>负载均衡</li><li>静态资源服务</li></ul><p>✅ <strong>问题排查</strong></p><ul><li>日志查看</li><li>网络调试</li><li>性能优化</li></ul><p><strong>下一章预告：</strong> 在下一章中，我们将学习 Docker Compose 多容器编排，以及微服务环境的搭建和 CI/CD 集成。</p><hr>`,139)),n("p",null,[s[1]||(s[1]=n("strong",null,"继续学习",-1)),s[2]||(s[2]=a(" → ",-1)),t(e,{to:"/tutorials/java-backend/docker/4.Docker%E8%BF%9B%E9%98%B6%E6%8A%80%E5%B7%A7.html"},{default:c(()=>[...s[0]||(s[0]=[a("第四章：Docker 进阶技巧",-1)])]),_:1})])])}const m=p(d,[["render",u]]),b=JSON.parse('{"path":"/tutorials/java-backend/docker/3.Dockershizhanyingyong.html","title":"Docker实战应用","lang":"zh-CN","frontmatter":{"title":"Docker实战应用"},"headers":[{"level":2,"title":"一、容器化部署 Spring Boot 应用","slug":"一、容器化部署-spring-boot-应用","link":"#一、容器化部署-spring-boot-应用","children":[{"level":3,"title":"1.1 准备 Spring Boot 项目","slug":"_1-1-准备-spring-boot-项目","link":"#_1-1-准备-spring-boot-项目","children":[]},{"level":3,"title":"1.2 方式一：简单 Dockerfile","slug":"_1-2-方式一-简单-dockerfile","link":"#_1-2-方式一-简单-dockerfile","children":[]},{"level":3,"title":"1.3 方式二：优化的 Dockerfile","slug":"_1-3-方式二-优化的-dockerfile","link":"#_1-3-方式二-优化的-dockerfile","children":[]},{"level":3,"title":"1.4 方式三：分层优化","slug":"_1-4-方式三-分层优化","link":"#_1-4-方式三-分层优化","children":[]},{"level":3,"title":"1.5 集成数据库和Redis","slug":"_1-5-集成数据库和redis","link":"#_1-5-集成数据库和redis","children":[]}]},{"level":2,"title":"二、容器化部署 MySQL 数据库","slug":"二、容器化部署-mysql-数据库","link":"#二、容器化部署-mysql-数据库","children":[{"level":3,"title":"2.1 基本部署","slug":"_2-1-基本部署","link":"#_2-1-基本部署","children":[]},{"level":3,"title":"2.2 持久化数据","slug":"_2-2-持久化数据","link":"#_2-2-持久化数据","children":[]},{"level":3,"title":"2.3 自定义配置","slug":"_2-3-自定义配置","link":"#_2-3-自定义配置","children":[]},{"level":3,"title":"2.4 初始化数据库","slug":"_2-4-初始化数据库","link":"#_2-4-初始化数据库","children":[]},{"level":3,"title":"2.5 备份和恢复","slug":"_2-5-备份和恢复","link":"#_2-5-备份和恢复","children":[]}]},{"level":2,"title":"三、容器化部署 Redis 缓存","slug":"三、容器化部署-redis-缓存","link":"#三、容器化部署-redis-缓存","children":[{"level":3,"title":"3.1 基本部署","slug":"_3-1-基本部署","link":"#_3-1-基本部署","children":[]},{"level":3,"title":"3.2 持久化配置","slug":"_3-2-持久化配置","link":"#_3-2-持久化配置","children":[]},{"level":3,"title":"3.3 带密码的 Redis","slug":"_3-3-带密码的-redis","link":"#_3-3-带密码的-redis","children":[]},{"level":3,"title":"3.4 Redis 集群（简化版）","slug":"_3-4-redis-集群-简化版","link":"#_3-4-redis-集群-简化版","children":[]}]},{"level":2,"title":"四、容器化部署 Nginx 服务","slug":"四、容器化部署-nginx-服务","link":"#四、容器化部署-nginx-服务","children":[{"level":3,"title":"4.1 基本部署","slug":"_4-1-基本部署","link":"#_4-1-基本部署","children":[]},{"level":3,"title":"4.2 自定义网页","slug":"_4-2-自定义网页","link":"#_4-2-自定义网页","children":[]},{"level":3,"title":"4.3 自定义配置","slug":"_4-3-自定义配置","link":"#_4-3-自定义配置","children":[]},{"level":3,"title":"4.4 反向代理 Spring Boot","slug":"_4-4-反向代理-spring-boot","link":"#_4-4-反向代理-spring-boot","children":[]}]},{"level":2,"title":"五、多阶段构建优化镜像","slug":"五、多阶段构建优化镜像","link":"#五、多阶段构建优化镜像","children":[{"level":3,"title":"5.1 Java 应用优化","slug":"_5-1-java-应用优化","link":"#_5-1-java-应用优化","children":[]},{"level":3,"title":"5.2 Node.js 应用优化","slug":"_5-2-node-js-应用优化","link":"#_5-2-node-js-应用优化","children":[]},{"level":3,"title":"5.3 Go 应用优化","slug":"_5-3-go-应用优化","link":"#_5-3-go-应用优化","children":[]}]},{"level":2,"title":"六、常见问题与解决方案","slug":"六、常见问题与解决方案","link":"#六、常见问题与解决方案","children":[{"level":3,"title":"6.1 容器无法启动","slug":"_6-1-容器无法启动","link":"#_6-1-容器无法启动","children":[]},{"level":3,"title":"6.2 网络连接问题","slug":"_6-2-网络连接问题","link":"#_6-2-网络连接问题","children":[]},{"level":3,"title":"6.3 数据丢失问题","slug":"_6-3-数据丢失问题","link":"#_6-3-数据丢失问题","children":[]},{"level":3,"title":"6.4 性能问题","slug":"_6-4-性能问题","link":"#_6-4-性能问题","children":[]},{"level":3,"title":"6.5 镜像过大","slug":"_6-5-镜像过大","link":"#_6-5-镜像过大","children":[]}]},{"level":2,"title":"七、完整示例：Spring Boot + MySQL + Redis + Nginx","slug":"七、完整示例-spring-boot-mysql-redis-nginx","link":"#七、完整示例-spring-boot-mysql-redis-nginx","children":[{"level":3,"title":"7.1 项目结构","slug":"_7-1-项目结构","link":"#_7-1-项目结构","children":[]},{"level":3,"title":"7.2 Spring Boot Dockerfile","slug":"_7-2-spring-boot-dockerfile","link":"#_7-2-spring-boot-dockerfile","children":[]},{"level":3,"title":"7.3 运行命令","slug":"_7-3-运行命令","link":"#_7-3-运行命令","children":[]}]},{"level":2,"title":"八、小结","slug":"八、小结","link":"#八、小结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/docker/3.Docker实战应用.md"}');export{m as comp,b as data};
