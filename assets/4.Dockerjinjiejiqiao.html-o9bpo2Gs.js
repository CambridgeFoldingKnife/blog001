import{_ as p,c as l,d as i,e as s,f as a,b as t,w as c,r as o,o as u}from"./app-CV9LOh4I.js";const r={};function d(k,n){const e=o("RouteLink");return u(),l("div",null,[n[3]||(n[3]=i(`<h1 id="docker进阶技巧" tabindex="-1"><a class="header-anchor" href="#docker进阶技巧"><span>Docker进阶技巧</span></a></h1><h2 id="一、docker-compose-多容器编排" tabindex="-1"><a class="header-anchor" href="#一、docker-compose-多容器编排"><span>一、Docker Compose 多容器编排</span></a></h2><h3 id="_1-1-docker-compose-简介" tabindex="-1"><a class="header-anchor" href="#_1-1-docker-compose-简介"><span>1.1 Docker Compose 简介</span></a></h3><p>Docker Compose 是用于定义和运行多容器 Docker 应用的工具。通过 YAML 文件配置应用的服务，然后使用一条命令创建并启动所有服务。</p><p><strong>核心优势：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">✅ 简化多容器管理</span>
<span class="line">✅ 声明式配置</span>
<span class="line">✅ 一键启动/停止</span>
<span class="line">✅ 服务编排</span>
<span class="line">✅ 环境隔离</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-安装-docker-compose" tabindex="-1"><a class="header-anchor" href="#_1-2-安装-docker-compose"><span>1.2 安装 Docker Compose</span></a></h3><p><strong>Linux：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 下载最新版本</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加执行权限</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/docker-compose</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证安装</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Windows/macOS：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Docker Desktop 已内置 Docker Compose</span>
<span class="line">直接使用即可</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-docker-compose-yml-基础" tabindex="-1"><a class="header-anchor" href="#_1-3-docker-compose-yml-基础"><span>1.3 docker-compose.yml 基础</span></a></h3><p><strong>基本结构：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 服务1</span></span>
<span class="line">  <span class="token key atrule">web</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;80:80&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./html<span class="token punctuation">:</span>/usr/share/nginx/html</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app<span class="token punctuation">-</span>network</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 服务2</span></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> root123</span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> db<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/mysql</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app<span class="token punctuation">-</span>network</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">app-network</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">db-data</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-完整的-spring-boot-项目" tabindex="-1"><a class="header-anchor" href="#_1-4-完整的-spring-boot-项目"><span>1.4 完整的 Spring Boot 项目</span></a></h3><p><strong>项目结构：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">my-project/</span>
<span class="line">├── app/</span>
<span class="line">│   ├── src/</span>
<span class="line">│   ├── pom.xml</span>
<span class="line">│   └── Dockerfile</span>
<span class="line">├── nginx/</span>
<span class="line">│   ├── nginx.conf</span>
<span class="line">│   └── html/</span>
<span class="line">├── mysql/</span>
<span class="line">│   └── init.sql</span>
<span class="line">└── docker-compose.yml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>docker-compose.yml：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># MySQL 数据库</span></span>
<span class="line">  <span class="token key atrule">mysql</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span></span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mysql</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> root123</span>
<span class="line">      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> testdb</span>
<span class="line">      <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> appuser</span>
<span class="line">      <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> apppass</span>
<span class="line">      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;3306:3306&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> mysql<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/mysql</span>
<span class="line">      <span class="token punctuation">-</span> ./mysql/init.sql<span class="token punctuation">:</span>/docker<span class="token punctuation">-</span>entrypoint<span class="token punctuation">-</span>initdb.d/init.sql</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app<span class="token punctuation">-</span>network</span>
<span class="line">    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mysqladmin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-h&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 10s</span>
<span class="line">      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 5s</span>
<span class="line">      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Redis 缓存</span></span>
<span class="line">  <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>6.2<span class="token punctuation">-</span>alpine</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped</span>
<span class="line">    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>requirepass redis123</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app<span class="token punctuation">-</span>network</span>
<span class="line">    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;redis-cli&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 10s</span>
<span class="line">      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 3s</span>
<span class="line">      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Spring Boot 应用</span></span>
<span class="line">  <span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./app</span>
<span class="line">      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> spring<span class="token punctuation">-</span>app</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">mysql</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">condition</span><span class="token punctuation">:</span> service_healthy</span>
<span class="line">      <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">condition</span><span class="token punctuation">:</span> service_healthy</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> prod</span>
<span class="line">      <span class="token key atrule">DB_HOST</span><span class="token punctuation">:</span> mysql</span>
<span class="line">      <span class="token key atrule">DB_PORT</span><span class="token punctuation">:</span> <span class="token number">3306</span></span>
<span class="line">      <span class="token key atrule">DB_NAME</span><span class="token punctuation">:</span> testdb</span>
<span class="line">      <span class="token key atrule">DB_USER</span><span class="token punctuation">:</span> appuser</span>
<span class="line">      <span class="token key atrule">DB_PASSWORD</span><span class="token punctuation">:</span> apppass</span>
<span class="line">      <span class="token key atrule">REDIS_HOST</span><span class="token punctuation">:</span> redis</span>
<span class="line">      <span class="token key atrule">REDIS_PORT</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line">      <span class="token key atrule">REDIS_PASSWORD</span><span class="token punctuation">:</span> redis123</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app<span class="token punctuation">-</span>network</span>
<span class="line">    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wget&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--quiet&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--tries=1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--spider&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:8080/actuator/health&quot;</span><span class="token punctuation">]</span></span>
<span class="line">      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 30s</span>
<span class="line">      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 10s</span>
<span class="line">      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span></span>
<span class="line">      <span class="token key atrule">start_period</span><span class="token punctuation">:</span> 40s</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Nginx 反向代理</span></span>
<span class="line">  <span class="token key atrule">nginx</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;80:80&quot;</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;443:443&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./nginx/nginx.conf<span class="token punctuation">:</span>/etc/nginx/nginx.conf</span>
<span class="line">      <span class="token punctuation">-</span> ./nginx/html<span class="token punctuation">:</span>/usr/share/nginx/html</span>
<span class="line">      <span class="token punctuation">-</span> nginx<span class="token punctuation">-</span>logs<span class="token punctuation">:</span>/var/log/nginx</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> app<span class="token punctuation">-</span>network</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">app-network</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">mysql-data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">redis-data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">nginx-logs</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-docker-compose-常用命令" tabindex="-1"><a class="header-anchor" href="#_1-5-docker-compose-常用命令"><span>1.5 Docker Compose 常用命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 启动所有服务（后台运行）</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看服务状态</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token function">ps</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看日志</span></span>
<span class="line"><span class="token function">docker-compose</span> logs</span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span> app  <span class="token comment"># 实时查看 app 日志</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止所有服务</span></span>
<span class="line"><span class="token function">docker-compose</span> stop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止并删除容器、网络</span></span>
<span class="line"><span class="token function">docker-compose</span> down</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止并删除容器、网络、卷</span></span>
<span class="line"><span class="token function">docker-compose</span> down <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line"><span class="token function">docker-compose</span> restart app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建或重建服务</span></span>
<span class="line"><span class="token function">docker-compose</span> build</span>
<span class="line"><span class="token function">docker-compose</span> build --no-cache  <span class="token comment"># 不使用缓存</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 扩展服务（运行多个实例）</span></span>
<span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> <span class="token parameter variable">--scale</span> <span class="token assign-left variable">app</span><span class="token operator">=</span><span class="token number">3</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器</span></span>
<span class="line"><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> app <span class="token function">bash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看配置</span></span>
<span class="line"><span class="token function">docker-compose</span> config</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-环境变量配置" tabindex="-1"><a class="header-anchor" href="#_1-6-环境变量配置"><span>1.6 环境变量配置</span></a></h3><p><strong>.env 文件：</strong></p><div class="language-env line-numbers-mode" data-highlighter="prismjs" data-ext="env" data-title="env"><pre><code><span class="line"># 数据库配置</span>
<span class="line">MYSQL_ROOT_PASSWORD=root123</span>
<span class="line">MYSQL_DATABASE=testdb</span>
<span class="line">MYSQL_USER=appuser</span>
<span class="line">MYSQL_PASSWORD=apppass</span>
<span class="line"></span>
<span class="line"># Redis 配置</span>
<span class="line">REDIS_PASSWORD=redis123</span>
<span class="line"></span>
<span class="line"># 应用配置</span>
<span class="line">APP_PORT=8080</span>
<span class="line">SPRING_PROFILES_ACTIVE=prod</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>docker-compose.yml 使用环境变量：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">mysql</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>MYSQL_ROOT_PASSWORD<span class="token punctuation">}</span></span>
<span class="line">      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>MYSQL_DATABASE<span class="token punctuation">}</span></span>
<span class="line">      <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>MYSQL_USER<span class="token punctuation">}</span></span>
<span class="line">      <span class="token key atrule">MYSQL_PASSWORD</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>MYSQL_PASSWORD<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;\${MYSQL_PORT:-3306}:3306&quot;</span>  <span class="token comment"># 默认值 3306</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./app</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>SPRING_PROFILES_ACTIVE<span class="token punctuation">}</span></span>
<span class="line">      <span class="token key atrule">DB_HOST</span><span class="token punctuation">:</span> mysql</span>
<span class="line">      <span class="token key atrule">DB_PASSWORD</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>MYSQL_PASSWORD<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;\${APP_PORT}:8080&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="二、构建完整的微服务环境" tabindex="-1"><a class="header-anchor" href="#二、构建完整的微服务环境"><span>二、构建完整的微服务环境</span></a></h2><h3 id="_2-1-微服务架构示例" tabindex="-1"><a class="header-anchor" href="#_2-1-微服务架构示例"><span>2.1 微服务架构示例</span></a></h3><p><strong>项目结构：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">microservices/</span>
<span class="line">├── gateway/          # API 网关</span>
<span class="line">├── user-service/     # 用户服务</span>
<span class="line">├── order-service/    # 订单服务</span>
<span class="line">├── product-service/  # 商品服务</span>
<span class="line">├── eureka/          # 服务注册中心</span>
<span class="line">├── config/          # 配置中心</span>
<span class="line">└── docker-compose.yml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-完整的-docker-compose-yml" tabindex="-1"><a class="header-anchor" href="#_2-2-完整的-docker-compose-yml"><span>2.2 完整的 docker-compose.yml</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># Eureka 服务注册中心</span></span>
<span class="line">  <span class="token key atrule">eureka</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./eureka</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> eureka</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8761:8761&quot;</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> docker</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># MySQL 数据库</span></span>
<span class="line">  <span class="token key atrule">mysql</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql<span class="token punctuation">:</span><span class="token number">8.0</span></span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mysql</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> root123</span>
<span class="line">      <span class="token key atrule">MYSQL_DATABASE</span><span class="token punctuation">:</span> microservices</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;3306:3306&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> mysql<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/mysql</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Redis 缓存</span></span>
<span class="line">  <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis<span class="token punctuation">:</span>6.2<span class="token punctuation">-</span>alpine</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis</span>
<span class="line">    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>requirepass redis123</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># RabbitMQ 消息队列</span></span>
<span class="line">  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> rabbitmq<span class="token punctuation">:</span>3.11<span class="token punctuation">-</span>management<span class="token punctuation">-</span>alpine</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rabbitmq</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">RABBITMQ_DEFAULT_USER</span><span class="token punctuation">:</span> admin</span>
<span class="line">      <span class="token key atrule">RABBITMQ_DEFAULT_PASS</span><span class="token punctuation">:</span> admin123</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;5672:5672&quot;</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;15672:15672&quot;</span>  <span class="token comment"># 管理界面</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 用户服务</span></span>
<span class="line">  <span class="token key atrule">user-service</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./user<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> eureka</span>
<span class="line">      <span class="token punctuation">-</span> mysql</span>
<span class="line">      <span class="token punctuation">-</span> redis</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> docker</span>
<span class="line">      <span class="token key atrule">EUREKA_SERVER</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka<span class="token punctuation">:</span>8761/eureka</span>
<span class="line">      <span class="token key atrule">DB_HOST</span><span class="token punctuation">:</span> mysql</span>
<span class="line">      <span class="token key atrule">REDIS_HOST</span><span class="token punctuation">:</span> redis</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8081:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 订单服务</span></span>
<span class="line">  <span class="token key atrule">order-service</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./order<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> order<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> eureka</span>
<span class="line">      <span class="token punctuation">-</span> mysql</span>
<span class="line">      <span class="token punctuation">-</span> rabbitmq</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> docker</span>
<span class="line">      <span class="token key atrule">EUREKA_SERVER</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka<span class="token punctuation">:</span>8761/eureka</span>
<span class="line">      <span class="token key atrule">DB_HOST</span><span class="token punctuation">:</span> mysql</span>
<span class="line">      <span class="token key atrule">RABBITMQ_HOST</span><span class="token punctuation">:</span> rabbitmq</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8082:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 商品服务</span></span>
<span class="line">  <span class="token key atrule">product-service</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./product<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> product<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> eureka</span>
<span class="line">      <span class="token punctuation">-</span> mysql</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> docker</span>
<span class="line">      <span class="token key atrule">EUREKA_SERVER</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka<span class="token punctuation">:</span>8761/eureka</span>
<span class="line">      <span class="token key atrule">DB_HOST</span><span class="token punctuation">:</span> mysql</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8083:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># API 网关</span></span>
<span class="line">  <span class="token key atrule">gateway</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./gateway</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> gateway</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> eureka</span>
<span class="line">      <span class="token punctuation">-</span> user<span class="token punctuation">-</span>service</span>
<span class="line">      <span class="token punctuation">-</span> order<span class="token punctuation">-</span>service</span>
<span class="line">      <span class="token punctuation">-</span> product<span class="token punctuation">-</span>service</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">SPRING_PROFILES_ACTIVE</span><span class="token punctuation">:</span> docker</span>
<span class="line">      <span class="token key atrule">EUREKA_SERVER</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//eureka<span class="token punctuation">:</span>8761/eureka</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> microservices</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">microservices</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">mysql-data</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-服务配置文件示例" tabindex="-1"><a class="header-anchor" href="#_2-3-服务配置文件示例"><span>2.3 服务配置文件示例</span></a></h3><p><strong>application-docker.yml（Spring Boot 服务）：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">application</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">name</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">datasource</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>DB_HOST<span class="token punctuation">:</span>mysql<span class="token punctuation">}</span><span class="token punctuation">:</span>3306/microservices<span class="token punctuation">?</span>useSSL=false</span>
<span class="line">    <span class="token key atrule">username</span><span class="token punctuation">:</span> root</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> root123</span>
<span class="line">    <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">redis</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>REDIS_HOST<span class="token punctuation">:</span>redis<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span></span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> redis123</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">host</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>RABBITMQ_HOST<span class="token punctuation">:</span>rabbitmq<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span></span>
<span class="line">    <span class="token key atrule">username</span><span class="token punctuation">:</span> admin</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> admin123</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">eureka</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">client</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">service-url</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>EUREKA_SERVER<span class="token punctuation">:</span>http<span class="token punctuation">:</span>//eureka<span class="token punctuation">:</span>8761/eureka<span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">instance</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">server</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、docker-网络高级配置" tabindex="-1"><a class="header-anchor" href="#三、docker-网络高级配置"><span>三、Docker 网络高级配置</span></a></h2><h3 id="_3-1-自定义网络" tabindex="-1"><a class="header-anchor" href="#_3-1-自定义网络"><span>3.1 自定义网络</span></a></h3><p><strong>创建自定义网络：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建 bridge 网络</span></span>
<span class="line"><span class="token function">docker</span> network create <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--driver</span> bridge <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--subnet</span> <span class="token number">172.20</span>.0.0/16 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--gateway</span> <span class="token number">172.20</span>.0.1 <span class="token punctuation">\\</span></span>
<span class="line">  my-network</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建 overlay 网络（Swarm 模式）</span></span>
<span class="line"><span class="token function">docker</span> network create <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--driver</span> overlay <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--attachable</span> <span class="token punctuation">\\</span></span>
<span class="line">  my-overlay-network</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在 docker-compose.yml 中配置：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">web</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">frontend</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">ipv4_address</span><span class="token punctuation">:</span> 172.20.0.10</span>
<span class="line">      <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> backend</span>
<span class="line">      <span class="token punctuation">-</span> database</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> database</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">frontend</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line">    <span class="token key atrule">ipam</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">config</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">subnet</span><span class="token punctuation">:</span> 172.20.0.0/16</span>
<span class="line">          <span class="token key atrule">gateway</span><span class="token punctuation">:</span> 172.20.0.1</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">database</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line">    <span class="token key atrule">internal</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># 内部网络，不能访问外网</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-容器间通信" tabindex="-1"><a class="header-anchor" href="#_3-2-容器间通信"><span>3.2 容器间通信</span></a></h3><p><strong>通过容器名通信：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">web</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> api</span>
<span class="line">    <span class="token comment"># nginx.conf 中可以使用 http://api:8080</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">api</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> myapi</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> db</span>
<span class="line">    <span class="token comment"># 可以通过 db:3306 连接数据库</span></span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过别名通信：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">web</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app-net</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">aliases</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token punctuation">-</span> web<span class="token punctuation">-</span>server</span>
<span class="line">          <span class="token punctuation">-</span> frontend</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">api</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> myapi</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app-net</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">aliases</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token punctuation">-</span> api<span class="token punctuation">-</span>server</span>
<span class="line">          <span class="token punctuation">-</span> backend</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">app-net</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-网络安全" tabindex="-1"><a class="header-anchor" href="#_3-3-网络安全"><span>3.3 网络安全</span></a></h3><p><strong>隔离敏感服务：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 前端服务（公开）</span></span>
<span class="line">  <span class="token key atrule">nginx</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;80:80&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> frontend</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 应用服务（半公开）</span></span>
<span class="line">  <span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> frontend</span>
<span class="line">      <span class="token punctuation">-</span> backend</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 数据库（隔离）</span></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> backend</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 管理服务（完全隔离）</span></span>
<span class="line">  <span class="token key atrule">admin</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>panel</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> admin</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">frontend</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line">    <span class="token key atrule">internal</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># 不能访问外网</span></span>
<span class="line">  </span>
<span class="line">  <span class="token key atrule">admin</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge</span>
<span class="line">    <span class="token key atrule">internal</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、容器资源限制与监控" tabindex="-1"><a class="header-anchor" href="#四、容器资源限制与监控"><span>四、容器资源限制与监控</span></a></h2><h3 id="_4-1-资源限制" tabindex="-1"><a class="header-anchor" href="#_4-1-资源限制"><span>4.1 资源限制</span></a></h3><p><strong>CPU 限制：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">app</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp</span>
<span class="line">    <span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">resources</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">limits</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">cpus</span><span class="token punctuation">:</span> <span class="token string">&#39;1.5&#39;</span>      <span class="token comment"># 最多使用 1.5 个 CPU</span></span>
<span class="line">          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 512M     <span class="token comment"># 最多使用 512MB 内存</span></span>
<span class="line">        <span class="token key atrule">reservations</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">cpus</span><span class="token punctuation">:</span> <span class="token string">&#39;0.5&#39;</span>      <span class="token comment"># 保留 0.5 个 CPU</span></span>
<span class="line">          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 256M     <span class="token comment"># 保留 256MB 内存</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>命令行方式：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> app <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--cpus</span><span class="token operator">=</span><span class="token number">1.5</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--memory</span><span class="token operator">=</span>512m <span class="token punctuation">\\</span></span>
<span class="line">  --memory-reservation<span class="token operator">=</span>256m <span class="token punctuation">\\</span></span>
<span class="line">  --memory-swap<span class="token operator">=</span>1g <span class="token punctuation">\\</span></span>
<span class="line">  myapp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-监控工具" tabindex="-1"><a class="header-anchor" href="#_4-2-监控工具"><span>4.2 监控工具</span></a></h3><p><strong>1. docker stats 命令：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 实时监控所有容器</span></span>
<span class="line"><span class="token function">docker</span> stats</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 监控指定容器</span></span>
<span class="line"><span class="token function">docker</span> stats app mysql redis</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不持续刷新</span></span>
<span class="line"><span class="token function">docker</span> stats --no-stream</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. cAdvisor（容器监控）：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">cadvisor</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> google/cadvisor<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cadvisor</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /<span class="token punctuation">:</span>/rootfs<span class="token punctuation">:</span>ro</span>
<span class="line">      <span class="token punctuation">-</span> /var/run<span class="token punctuation">:</span>/var/run<span class="token punctuation">:</span>ro</span>
<span class="line">      <span class="token punctuation">-</span> /sys<span class="token punctuation">:</span>/sys<span class="token punctuation">:</span>ro</span>
<span class="line">      <span class="token punctuation">-</span> /var/lib/docker/<span class="token punctuation">:</span>/var/lib/docker<span class="token punctuation">:</span>ro</span>
<span class="line">    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. Prometheus + Grafana：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># Prometheus 监控</span></span>
<span class="line">  <span class="token key atrule">prometheus</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/prometheus</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> prometheus</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;9090:9090&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./prometheus.yml<span class="token punctuation">:</span>/etc/prometheus/prometheus.yml</span>
<span class="line">      <span class="token punctuation">-</span> prometheus<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/prometheus</span>
<span class="line">    <span class="token key atrule">command</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&#39;--config.file=/etc/prometheus/prometheus.yml&#39;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> monitoring</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Grafana 可视化</span></span>
<span class="line">  <span class="token key atrule">grafana</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> grafana/grafana</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> grafana</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;3000:3000&quot;</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">GF_SECURITY_ADMIN_PASSWORD</span><span class="token punctuation">:</span> admin123</span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> grafana<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/grafana</span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> prometheus</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> monitoring</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Node Exporter（节点监控）</span></span>
<span class="line">  <span class="token key atrule">node-exporter</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> prom/node<span class="token punctuation">-</span>exporter</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>exporter</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;9100:9100&quot;</span></span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> monitoring</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># cAdvisor（容器监控）</span></span>
<span class="line">  <span class="token key atrule">cadvisor</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> google/cadvisor<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cadvisor</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /<span class="token punctuation">:</span>/rootfs<span class="token punctuation">:</span>ro</span>
<span class="line">      <span class="token punctuation">-</span> /var/run<span class="token punctuation">:</span>/var/run<span class="token punctuation">:</span>ro</span>
<span class="line">      <span class="token punctuation">-</span> /sys<span class="token punctuation">:</span>/sys<span class="token punctuation">:</span>ro</span>
<span class="line">      <span class="token punctuation">-</span> /var/lib/docker/<span class="token punctuation">:</span>/var/lib/docker<span class="token punctuation">:</span>ro</span>
<span class="line">    <span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> monitoring</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">networks</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">monitoring</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">prometheus-data</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">grafana-data</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>prometheus.yml 配置：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">global</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 15s</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;prometheus&#39;</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;localhost:9090&#39;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;node-exporter&#39;</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;node-exporter:9100&#39;</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;cadvisor&#39;</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;cadvisor:8080&#39;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、docker-镜像优化技巧" tabindex="-1"><a class="header-anchor" href="#五、docker-镜像优化技巧"><span>五、Docker 镜像优化技巧</span></a></h2><h3 id="_5-1-使用-dockerignore" tabindex="-1"><a class="header-anchor" href="#_5-1-使用-dockerignore"><span>5.1 使用 .dockerignore</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># .dockerignore</span>
<span class="line">.git</span>
<span class="line">.gitignore</span>
<span class="line">.idea</span>
<span class="line">.vscode</span>
<span class="line">*.md</span>
<span class="line">README.md</span>
<span class="line">Dockerfile</span>
<span class="line">docker-compose.yml</span>
<span class="line">.env</span>
<span class="line">.DS_Store</span>
<span class="line"></span>
<span class="line"># Java</span>
<span class="line">target/</span>
<span class="line">*.jar</span>
<span class="line">*.war</span>
<span class="line">*.class</span>
<span class="line"></span>
<span class="line"># Node.js</span>
<span class="line">node_modules/</span>
<span class="line">npm-debug.log</span>
<span class="line"></span>
<span class="line"># Python</span>
<span class="line">__pycache__/</span>
<span class="line">*.py[cod]</span>
<span class="line">.pytest_cache/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-优化层缓存" tabindex="-1"><a class="header-anchor" href="#_5-2-优化层缓存"><span>5.2 优化层缓存</span></a></h3><p><strong>不好的做法：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> node:16</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .                    # 任何文件变化都会重新安装依赖</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm install</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm run build</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>好的做法：</strong></p><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">FROM</span> node:16</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 先复制依赖文件（变化少）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> package*.json ./</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm ci --only=production</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 再复制源码（变化频繁）</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">COPY</span> . .</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> npm run build</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-清理临时文件" tabindex="-1"><a class="header-anchor" href="#_5-3-清理临时文件"><span>5.3 清理临时文件</span></a></h3><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token comment"># ❌ 不好 - 临时文件保留在镜像中</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y curl</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> curl -o /tmp/file.tar.gz http://example.com/file.tar.gz</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> tar -xzf /tmp/file.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># ✅ 好 - 单层清理</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get install -y curl &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    curl -o /tmp/file.tar.gz http://example.com/file.tar.gz &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    tar -xzf /tmp/file.tar.gz &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm /tmp/file.tar.gz &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    apt-get clean &amp;&amp; <span class="token operator">\\</span></span>
<span class="line">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-使用构建参数" tabindex="-1"><a class="header-anchor" href="#_5-4-使用构建参数"><span>5.4 使用构建参数</span></a></h3><div class="language-docker line-numbers-mode" data-highlighter="prismjs" data-ext="docker" data-title="docker"><pre><code><span class="line"><span class="token instruction"><span class="token keyword">ARG</span> NODE_VERSION=16</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">FROM</span> node:<span class="token variable">\${NODE_VERSION}</span>-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">ARG</span> BUILD_DATE</span></span>
<span class="line"><span class="token instruction"><span class="token keyword">ARG</span> VERSION</span></span>
<span class="line"></span>
<span class="line"><span class="token instruction"><span class="token keyword">LABEL</span> build-date=<span class="token variable">\${BUILD_DATE}</span></span></span>
<span class="line"><span class="token instruction"><span class="token keyword">LABEL</span> version=<span class="token variable">\${VERSION}</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 构建时传参</span></span>
<span class="line"><span class="token comment"># docker build --build-arg VERSION=1.0.0 .</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、ci-cd-集成" tabindex="-1"><a class="header-anchor" href="#六、ci-cd-集成"><span>六、CI/CD 集成</span></a></h2><h3 id="_6-1-gitlab-ci-cd" tabindex="-1"><a class="header-anchor" href="#_6-1-gitlab-ci-cd"><span>6.1 GitLab CI/CD</span></a></h3><p><strong>.gitlab-ci.yml：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">variables</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">DOCKER_IMAGE</span><span class="token punctuation">:</span> registry.example.com/myapp</span>
<span class="line">  <span class="token key atrule">DOCKER_TAG</span><span class="token punctuation">:</span> $CI_COMMIT_REF_NAME</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">before_script</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> docker login <span class="token punctuation">-</span>u $CI_REGISTRY_USER <span class="token punctuation">-</span>p $CI_REGISTRY_PASSWORD $CI_REGISTRY</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> docker build <span class="token punctuation">-</span>t $DOCKER_IMAGE<span class="token punctuation">:</span>$DOCKER_TAG .</span>
<span class="line">    <span class="token punctuation">-</span> docker push $DOCKER_IMAGE<span class="token punctuation">:</span>$DOCKER_TAG</span>
<span class="line">  <span class="token key atrule">only</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> main</span>
<span class="line">    <span class="token punctuation">-</span> develop</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>rm $DOCKER_IMAGE<span class="token punctuation">:</span>$DOCKER_TAG npm test</span>
<span class="line">  <span class="token key atrule">only</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> main</span>
<span class="line">    <span class="token punctuation">-</span> develop</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy_production</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>compose <span class="token punctuation">-</span>f docker<span class="token punctuation">-</span>compose.prod.yml pull</span>
<span class="line">    <span class="token punctuation">-</span> docker<span class="token punctuation">-</span>compose <span class="token punctuation">-</span>f docker<span class="token punctuation">-</span>compose.prod.yml up <span class="token punctuation">-</span>d</span>
<span class="line">  <span class="token key atrule">only</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> main</span>
<span class="line">  <span class="token key atrule">when</span><span class="token punctuation">:</span> manual</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-jenkins-pipeline" tabindex="-1"><a class="header-anchor" href="#_6-2-jenkins-pipeline"><span>6.2 Jenkins Pipeline</span></a></h3><p><strong>Jenkinsfile：</strong></p><div class="language-groovy line-numbers-mode" data-highlighter="prismjs" data-ext="groovy" data-title="groovy"><pre><code><span class="line">pipeline <span class="token punctuation">{</span></span>
<span class="line">    agent any</span>
<span class="line">    </span>
<span class="line">    environment <span class="token punctuation">{</span></span>
<span class="line">        DOCKER_IMAGE <span class="token operator">=</span> <span class="token string">&#39;myapp&#39;</span></span>
<span class="line">        DOCKER_TAG <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>BUILD_NUMBER</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    stages <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Checkout&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            steps <span class="token punctuation">{</span></span>
<span class="line">                checkout scm</span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Build&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            steps <span class="token punctuation">{</span></span>
<span class="line">                script <span class="token punctuation">{</span></span>
<span class="line">                    docker<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_TAG</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            steps <span class="token punctuation">{</span></span>
<span class="line">                script <span class="token punctuation">{</span></span>
<span class="line">                    docker<span class="token punctuation">.</span><span class="token function">image</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_TAG</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>inside <span class="token punctuation">{</span></span>
<span class="line">                        sh <span class="token string">&#39;npm test&#39;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Push&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            steps <span class="token punctuation">{</span></span>
<span class="line">                script <span class="token punctuation">{</span></span>
<span class="line">                    docker<span class="token punctuation">.</span><span class="token function">withRegistry</span><span class="token punctuation">(</span><span class="token string">&#39;https://registry.example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;docker-credentials&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        docker<span class="token punctuation">.</span><span class="token function">image</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_TAG</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                        docker<span class="token punctuation">.</span><span class="token function">image</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DOCKER_TAG</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;latest&#39;</span><span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            steps <span class="token punctuation">{</span></span>
<span class="line">                sh <span class="token string">&#39;&#39;&#39;</span>
<span class="line">                    docker-compose pull</span>
<span class="line">                    docker-compose up -d</span>
<span class="line">                &#39;&#39;&#39;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    post <span class="token punctuation">{</span></span>
<span class="line">        always <span class="token punctuation">{</span></span>
<span class="line">            sh <span class="token string">&#39;docker system prune -f&#39;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-github-actions" tabindex="-1"><a class="header-anchor" href="#_6-3-github-actions"><span>6.3 GitHub Actions</span></a></h3><p><strong>.github/workflows/docker.yml：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Docker Build and Deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    </span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout code</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set up Docker Buildx</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/setup<span class="token punctuation">-</span>buildx<span class="token punctuation">-</span>action@v2</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Login to Docker Hub</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@v2</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKER_USERNAME <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKER_PASSWORD <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and push</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@v4</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">context</span><span class="token punctuation">:</span> .</span>
<span class="line">        <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line">        <span class="token key atrule">tags</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          myapp:latest</span>
<span class="line">          myapp:\${{ github.sha }}</span></span>
<span class="line">        <span class="token key atrule">cache-from</span><span class="token punctuation">:</span> type=registry<span class="token punctuation">,</span>ref=myapp<span class="token punctuation">:</span>buildcache</span>
<span class="line">        <span class="token key atrule">cache-to</span><span class="token punctuation">:</span> type=registry<span class="token punctuation">,</span>ref=myapp<span class="token punctuation">:</span>buildcache<span class="token punctuation">,</span>mode=max</span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to server</span>
<span class="line">      <span class="token key atrule">uses</span><span class="token punctuation">:</span> appleboy/ssh<span class="token punctuation">-</span>action@master</span>
<span class="line">      <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">host</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SERVER_USER <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SSH_PRIVATE_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">script</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          cd /opt/myapp</span>
<span class="line">          docker-compose pull</span>
<span class="line">          docker-compose up -d</span>
<span class="line">          docker system prune -f</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、小结" tabindex="-1"><a class="header-anchor" href="#七、小结"><span>七、小结</span></a></h2><p>通过本章学习，你应该掌握：</p><p>✅ <strong>Docker Compose</strong></p><ul><li>多容器编排</li><li>服务依赖管理</li><li>环境变量配置</li></ul><p>✅ <strong>微服务环境</strong></p><ul><li>完整微服务架构</li><li>服务间通信</li><li>服务注册与发现</li></ul><p>✅ <strong>网络配置</strong></p><ul><li>自定义网络</li><li>网络隔离</li><li>安全配置</li></ul><p>✅ <strong>监控与限制</strong></p><ul><li>资源限制</li><li>容器监控</li><li>Prometheus + Grafana</li></ul><p>✅ <strong>镜像优化</strong></p><ul><li>缓存利用</li><li>体积优化</li><li>构建优化</li></ul><p>✅ <strong>CI/CD 集成</strong></p><ul><li>GitLab CI/CD</li><li>Jenkins</li><li>GitHub Actions</li></ul><p><strong>下一章预告：</strong> 在下一章中，我们将学习 Docker 相关的面试题，帮助你应对技术面试。</p><hr>`,108)),s("p",null,[n[1]||(n[1]=s("strong",null,"继续学习",-1)),n[2]||(n[2]=a(" → ",-1)),t(e,{to:"/tutorials/java-backend/docker/5.Docker%E9%9D%A2%E8%AF%95%E9%A2%98%E9%9B%86.html"},{default:c(()=>[...n[0]||(n[0]=[a("第五章：Docker 面试题集",-1)])]),_:1})])])}const m=p(r,[["render",d]]),b=JSON.parse('{"path":"/tutorials/java-backend/docker/4.Dockerjinjiejiqiao.html","title":"Docker进阶技巧","lang":"zh-CN","frontmatter":{"title":"Docker进阶技巧"},"headers":[{"level":2,"title":"一、Docker Compose 多容器编排","slug":"一、docker-compose-多容器编排","link":"#一、docker-compose-多容器编排","children":[{"level":3,"title":"1.1 Docker Compose 简介","slug":"_1-1-docker-compose-简介","link":"#_1-1-docker-compose-简介","children":[]},{"level":3,"title":"1.2 安装 Docker Compose","slug":"_1-2-安装-docker-compose","link":"#_1-2-安装-docker-compose","children":[]},{"level":3,"title":"1.3 docker-compose.yml 基础","slug":"_1-3-docker-compose-yml-基础","link":"#_1-3-docker-compose-yml-基础","children":[]},{"level":3,"title":"1.4 完整的 Spring Boot 项目","slug":"_1-4-完整的-spring-boot-项目","link":"#_1-4-完整的-spring-boot-项目","children":[]},{"level":3,"title":"1.5 Docker Compose 常用命令","slug":"_1-5-docker-compose-常用命令","link":"#_1-5-docker-compose-常用命令","children":[]},{"level":3,"title":"1.6 环境变量配置","slug":"_1-6-环境变量配置","link":"#_1-6-环境变量配置","children":[]}]},{"level":2,"title":"二、构建完整的微服务环境","slug":"二、构建完整的微服务环境","link":"#二、构建完整的微服务环境","children":[{"level":3,"title":"2.1 微服务架构示例","slug":"_2-1-微服务架构示例","link":"#_2-1-微服务架构示例","children":[]},{"level":3,"title":"2.2 完整的 docker-compose.yml","slug":"_2-2-完整的-docker-compose-yml","link":"#_2-2-完整的-docker-compose-yml","children":[]},{"level":3,"title":"2.3 服务配置文件示例","slug":"_2-3-服务配置文件示例","link":"#_2-3-服务配置文件示例","children":[]}]},{"level":2,"title":"三、Docker 网络高级配置","slug":"三、docker-网络高级配置","link":"#三、docker-网络高级配置","children":[{"level":3,"title":"3.1 自定义网络","slug":"_3-1-自定义网络","link":"#_3-1-自定义网络","children":[]},{"level":3,"title":"3.2 容器间通信","slug":"_3-2-容器间通信","link":"#_3-2-容器间通信","children":[]},{"level":3,"title":"3.3 网络安全","slug":"_3-3-网络安全","link":"#_3-3-网络安全","children":[]}]},{"level":2,"title":"四、容器资源限制与监控","slug":"四、容器资源限制与监控","link":"#四、容器资源限制与监控","children":[{"level":3,"title":"4.1 资源限制","slug":"_4-1-资源限制","link":"#_4-1-资源限制","children":[]},{"level":3,"title":"4.2 监控工具","slug":"_4-2-监控工具","link":"#_4-2-监控工具","children":[]}]},{"level":2,"title":"五、Docker 镜像优化技巧","slug":"五、docker-镜像优化技巧","link":"#五、docker-镜像优化技巧","children":[{"level":3,"title":"5.1 使用 .dockerignore","slug":"_5-1-使用-dockerignore","link":"#_5-1-使用-dockerignore","children":[]},{"level":3,"title":"5.2 优化层缓存","slug":"_5-2-优化层缓存","link":"#_5-2-优化层缓存","children":[]},{"level":3,"title":"5.3 清理临时文件","slug":"_5-3-清理临时文件","link":"#_5-3-清理临时文件","children":[]},{"level":3,"title":"5.4 使用构建参数","slug":"_5-4-使用构建参数","link":"#_5-4-使用构建参数","children":[]}]},{"level":2,"title":"六、CI/CD 集成","slug":"六、ci-cd-集成","link":"#六、ci-cd-集成","children":[{"level":3,"title":"6.1 GitLab CI/CD","slug":"_6-1-gitlab-ci-cd","link":"#_6-1-gitlab-ci-cd","children":[]},{"level":3,"title":"6.2 Jenkins Pipeline","slug":"_6-2-jenkins-pipeline","link":"#_6-2-jenkins-pipeline","children":[]},{"level":3,"title":"6.3 GitHub Actions","slug":"_6-3-github-actions","link":"#_6-3-github-actions","children":[]}]},{"level":2,"title":"七、小结","slug":"七、小结","link":"#七、小结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/docker/4.Docker进阶技巧.md"}');export{m as comp,b as data};
