import{_ as l,c as i,d as p,e as n,f as a,b as c,w as d,r,o as t}from"./app-CV9LOh4I.js";const v={};function m(o,s){const e=r("RouteLink");return t(),i("div",null,[s[3]||(s[3]=p(`<h1 id="_01-redis基础" tabindex="-1"><a class="header-anchor" href="#_01-redis基础"><span>01 - Redis基础</span></a></h1><h2 id="🎯-学习目标" tabindex="-1"><a class="header-anchor" href="#🎯-学习目标"><span>🎯 学习目标</span></a></h2><ul><li>了解Redis是什么及其特点</li><li>掌握Redis的安装与配置</li><li>理解Redis的基本数据结构</li><li>学会使用Redis客户端</li></ul><h2 id="📖-redis简介" tabindex="-1"><a class="header-anchor" href="#📖-redis简介"><span>📖 Redis简介</span></a></h2><h3 id="什么是redis" tabindex="-1"><a class="header-anchor" href="#什么是redis"><span>什么是Redis？</span></a></h3><p>Redis（Remote Dictionary Server）是一个开源的、基于内存的高性能键值对（Key-Value）数据库。</p><h3 id="核心特点" tabindex="-1"><a class="header-anchor" href="#核心特点"><span>核心特点</span></a></h3><ul><li>⚡ <strong>高性能</strong> - 所有数据存储在内存中，读写速度极快（10万+QPS）</li><li>💾 <strong>持久化</strong> - 支持RDB和AOF两种持久化方式</li><li>🔄 <strong>多数据类型</strong> - 支持String、List、Set、Hash、Zset等</li><li>🌐 <strong>分布式</strong> - 支持主从复制、哨兵、集群模式</li><li>⏰ <strong>过期策略</strong> - 支持键的过期时间设置</li><li>🔒 <strong>原子操作</strong> - 所有操作都是原子性的</li></ul><h3 id="redis-vs-其他数据库" tabindex="-1"><a class="header-anchor" href="#redis-vs-其他数据库"><span>Redis vs 其他数据库</span></a></h3><table><thead><tr><th>特性</th><th>Redis</th><th>MySQL</th><th>Memcached</th></tr></thead><tbody><tr><td>数据存储</td><td>内存</td><td>磁盘</td><td>内存</td></tr><tr><td>数据类型</td><td>丰富</td><td>表结构</td><td>字符串</td></tr><tr><td>持久化</td><td>支持</td><td>支持</td><td>不支持</td></tr><tr><td>主从复制</td><td>支持</td><td>支持</td><td>不支持</td></tr><tr><td>性能</td><td>极高</td><td>较低</td><td>极高</td></tr><tr><td>应用场景</td><td>缓存、队列</td><td>关系数据</td><td>纯缓存</td></tr></tbody></table><h2 id="🔧-安装redis" tabindex="-1"><a class="header-anchor" href="#🔧-安装redis"><span>🔧 安装Redis</span></a></h2><h3 id="windows安装" tabindex="-1"><a class="header-anchor" href="#windows安装"><span>Windows安装</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 下载Redis for Windows</span></span>
<span class="line">https://github.com/tporadowski/redis/releases</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 解压到目录，如 C:\\Redis</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 启动Redis服务器</span></span>
<span class="line">redis-server.exe redis.windows.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 启动Redis客户端</span></span>
<span class="line">redis-cli.exe</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="linux安装" tabindex="-1"><a class="header-anchor" href="#linux安装"><span>Linux安装</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 下载Redis</span></span>
<span class="line"><span class="token function">wget</span> https://download.redis.io/releases/redis-7.0.0.tar.gz</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 解压</span></span>
<span class="line"><span class="token function">tar</span> <span class="token parameter variable">-xzf</span> redis-7.0.0.tar.gz</span>
<span class="line"><span class="token builtin class-name">cd</span> redis-7.0.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 编译</span></span>
<span class="line"><span class="token function">make</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 安装（可选）</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 启动Redis服务器</span></span>
<span class="line">src/redis-server</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 后台启动</span></span>
<span class="line">src/redis-server <span class="token parameter variable">--daemonize</span> <span class="token function">yes</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 启动客户端</span></span>
<span class="line">src/redis-cli</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装"><span>Docker安装</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 拉取Redis镜像</span></span>
<span class="line"><span class="token function">docker</span> pull redis:latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 运行Redis容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">  redis:latest</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 进入Redis客户端</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis redis-cli</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="⚙️-redis配置" tabindex="-1"><a class="header-anchor" href="#⚙️-redis配置"><span>⚙️ Redis配置</span></a></h2><h3 id="核心配置项" tabindex="-1"><a class="header-anchor" href="#核心配置项"><span>核心配置项</span></a></h3><p><strong>redis.conf主要配置：</strong></p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line"># 绑定IP</span>
<span class="line">bind 127.0.0.1</span>
<span class="line"></span>
<span class="line"># 端口</span>
<span class="line">port 6379</span>
<span class="line"></span>
<span class="line"># 后台运行</span>
<span class="line">daemonize yes</span>
<span class="line"></span>
<span class="line"># 日志文件</span>
<span class="line">logfile &quot;/var/log/redis/redis.log&quot;</span>
<span class="line"></span>
<span class="line"># 数据库数量（0-15）</span>
<span class="line">databases 16</span>
<span class="line"></span>
<span class="line"># 密码设置</span>
<span class="line">requirepass yourpassword</span>
<span class="line"></span>
<span class="line"># 最大内存</span>
<span class="line">maxmemory 2gb</span>
<span class="line"></span>
<span class="line"># 内存淘汰策略</span>
<span class="line">maxmemory-policy allkeys-lru</span>
<span class="line"></span>
<span class="line"># RDB持久化</span>
<span class="line">save 900 1        # 900秒内至少1个key变化</span>
<span class="line">save 300 10       # 300秒内至少10个key变化</span>
<span class="line">save 60 10000     # 60秒内至少10000个key变化</span>
<span class="line"></span>
<span class="line"># AOF持久化</span>
<span class="line">appendonly yes</span>
<span class="line">appendfilename &quot;appendonly.aof&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动配置文件" tabindex="-1"><a class="header-anchor" href="#启动配置文件"><span>启动配置文件</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 使用指定配置文件启动</span></span>
<span class="line">redis-server /path/to/redis.conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看配置</span></span>
<span class="line">redis-cli CONFIG GET *</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改配置（临时）</span></span>
<span class="line">redis-cli CONFIG SET maxmemory 1gb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎮-redis客户端" tabindex="-1"><a class="header-anchor" href="#🎮-redis客户端"><span>🎮 Redis客户端</span></a></h2><h3 id="redis-cli命令行客户端" tabindex="-1"><a class="header-anchor" href="#redis-cli命令行客户端"><span>redis-cli命令行客户端</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 连接本地Redis</span></span>
<span class="line">redis-cli</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接远程Redis</span></span>
<span class="line">redis-cli <span class="token parameter variable">-h</span> <span class="token number">192.168</span>.1.100 <span class="token parameter variable">-p</span> <span class="token number">6379</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用密码连接</span></span>
<span class="line">redis-cli <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-p</span> <span class="token number">6379</span> <span class="token parameter variable">-a</span> yourpassword</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 选择数据库</span></span>
<span class="line">redis-cli <span class="token parameter variable">-n</span> <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行单个命令</span></span>
<span class="line">redis-cli SET name <span class="token string">&quot;John&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量执行命令</span></span>
<span class="line"><span class="token function">cat</span> commands.txt <span class="token operator">|</span> redis-cli</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 监控模式</span></span>
<span class="line">redis-cli <span class="token parameter variable">--stat</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 实时查看命令</span></span>
<span class="line">redis-cli MONITOR</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令"><span>基本命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 测试连接</span></span>
<span class="line">PING</span>
<span class="line"><span class="token comment"># 返回：PONG</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换数据库（0-15）</span></span>
<span class="line">SELECT <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有key</span></span>
<span class="line">KEYS *</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除key</span></span>
<span class="line">DEL key1 key2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查key是否存在</span></span>
<span class="line">EXISTS key</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置key过期时间（秒）</span></span>
<span class="line">EXPIRE key <span class="token number">60</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看剩余时间</span></span>
<span class="line">TTL key</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看key类型</span></span>
<span class="line">TYPE key</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重命名key</span></span>
<span class="line">RENAME oldkey newkey</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看数据库大小</span></span>
<span class="line">DBSIZE</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清空当前数据库</span></span>
<span class="line">FLUSHDB</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清空所有数据库</span></span>
<span class="line">FLUSHALL</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存数据到磁盘</span></span>
<span class="line">SAVE</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 后台保存</span></span>
<span class="line">BGSAVE</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 关闭服务器</span></span>
<span class="line">SHUTDOWN</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-redis数据结构" tabindex="-1"><a class="header-anchor" href="#📊-redis数据结构"><span>📊 Redis数据结构</span></a></h2><h3 id="_1-string-字符串" tabindex="-1"><a class="header-anchor" href="#_1-string-字符串"><span>1. String（字符串）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置值</span></span>
<span class="line">SET name <span class="token string">&quot;Redis&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取值</span></span>
<span class="line">GET name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置并返回旧值</span></span>
<span class="line">GETSET name <span class="token string">&quot;New Redis&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量设置</span></span>
<span class="line">MSET key1 <span class="token string">&quot;value1&quot;</span> key2 <span class="token string">&quot;value2&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量获取</span></span>
<span class="line">MGET key1 key2</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 追加字符串</span></span>
<span class="line">APPEND name <span class="token string">&quot; Database&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取字符串长度</span></span>
<span class="line">STRLEN name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数字操作</span></span>
<span class="line">SET counter <span class="token number">10</span></span>
<span class="line">INCR counter        <span class="token comment"># 加1</span></span>
<span class="line">DECR counter        <span class="token comment"># 减1</span></span>
<span class="line">INCRBY counter <span class="token number">5</span>    <span class="token comment"># 加5</span></span>
<span class="line">DECRBY counter <span class="token number">3</span>    <span class="token comment"># 减3</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-list-列表" tabindex="-1"><a class="header-anchor" href="#_2-list-列表"><span>2. List（列表）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 左侧插入</span></span>
<span class="line">LPUSH list <span class="token string">&quot;item1&quot;</span> <span class="token string">&quot;item2&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 右侧插入</span></span>
<span class="line">RPUSH list <span class="token string">&quot;item3&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取列表</span></span>
<span class="line">LRANGE list <span class="token number">0</span> <span class="token parameter variable">-1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取长度</span></span>
<span class="line">LLEN list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 左侧弹出</span></span>
<span class="line">LPOP list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 右侧弹出</span></span>
<span class="line">RPOP list</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-set-集合" tabindex="-1"><a class="header-anchor" href="#_3-set-集合"><span>3. Set（集合）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加元素</span></span>
<span class="line">SADD myset <span class="token string">&quot;member1&quot;</span> <span class="token string">&quot;member2&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有元素</span></span>
<span class="line">SMEMBERS myset</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 判断是否存在</span></span>
<span class="line">SISMEMBER myset <span class="token string">&quot;member1&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除元素</span></span>
<span class="line">SREM myset <span class="token string">&quot;member1&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 集合大小</span></span>
<span class="line">SCARD myset</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-hash-哈希" tabindex="-1"><a class="header-anchor" href="#_4-hash-哈希"><span>4. Hash（哈希）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置字段</span></span>
<span class="line">HSET user:1 name <span class="token string">&quot;John&quot;</span></span>
<span class="line">HSET user:1 age <span class="token number">30</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取字段</span></span>
<span class="line">HGET user:1 name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取所有字段和值</span></span>
<span class="line">HGETALL user:1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量设置</span></span>
<span class="line">HMSET user:2 name <span class="token string">&quot;Alice&quot;</span> age <span class="token number">25</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除字段</span></span>
<span class="line">HDEL user:1 age</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-zset-有序集合" tabindex="-1"><a class="header-anchor" href="#_5-zset-有序集合"><span>5. Zset（有序集合）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加成员（分数）</span></span>
<span class="line">ZADD ranking <span class="token number">100</span> <span class="token string">&quot;user1&quot;</span></span>
<span class="line">ZADD ranking <span class="token number">95</span> <span class="token string">&quot;user2&quot;</span></span>
<span class="line">ZADD ranking <span class="token number">90</span> <span class="token string">&quot;user3&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 按分数范围查询</span></span>
<span class="line">ZRANGE ranking <span class="token number">0</span> <span class="token parameter variable">-1</span> WITHSCORES</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取成员排名</span></span>
<span class="line">ZRANK ranking <span class="token string">&quot;user1&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取成员分数</span></span>
<span class="line">ZSCORE ranking <span class="token string">&quot;user1&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔍-常用操作示例" tabindex="-1"><a class="header-anchor" href="#🔍-常用操作示例"><span>🔍 常用操作示例</span></a></h2><h3 id="缓存用户信息" tabindex="-1"><a class="header-anchor" href="#缓存用户信息"><span>缓存用户信息</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置用户信息，30分钟过期</span></span>
<span class="line">SET user:1001 <span class="token string">&#39;{&quot;id&quot;:1001,&quot;name&quot;:&quot;John&quot;,&quot;age&quot;:30}&#39;</span> EX <span class="token number">1800</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取用户信息</span></span>
<span class="line">GET user:1001</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="计数器" tabindex="-1"><a class="header-anchor" href="#计数器"><span>计数器</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 文章浏览量</span></span>
<span class="line">INCR article:1001:views</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取浏览量</span></span>
<span class="line">GET article:1001:views</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消息队列" tabindex="-1"><a class="header-anchor" href="#消息队列"><span>消息队列</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 生产者推送消息</span></span>
<span class="line">LPUSH queue:tasks <span class="token string">&quot;task1&quot;</span></span>
<span class="line">LPUSH queue:tasks <span class="token string">&quot;task2&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 消费者获取消息</span></span>
<span class="line">RPOP queue:tasks</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排行榜" tabindex="-1"><a class="header-anchor" href="#排行榜"><span>排行榜</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加用户分数</span></span>
<span class="line">ZADD leaderboard <span class="token number">1000</span> <span class="token string">&quot;player1&quot;</span></span>
<span class="line">ZADD leaderboard <span class="token number">950</span> <span class="token string">&quot;player2&quot;</span></span>
<span class="line">ZADD leaderboard <span class="token number">900</span> <span class="token string">&quot;player3&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看前10名</span></span>
<span class="line">ZREVRANGE leaderboard <span class="token number">0</span> <span class="token number">9</span> WITHSCORES</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看用户排名</span></span>
<span class="line">ZREVRANK leaderboard <span class="token string">&quot;player1&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📈-性能测试" tabindex="-1"><a class="header-anchor" href="#📈-性能测试"><span>📈 性能测试</span></a></h2><h3 id="redis-benchmark工具" tabindex="-1"><a class="header-anchor" href="#redis-benchmark工具"><span>redis-benchmark工具</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 测试100000个SET请求</span></span>
<span class="line">redis-benchmark <span class="token parameter variable">-t</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-n</span> <span class="token number">100000</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试GET和SET</span></span>
<span class="line">redis-benchmark <span class="token parameter variable">-t</span> get,set <span class="token parameter variable">-n</span> <span class="token number">100000</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定并发数</span></span>
<span class="line">redis-benchmark <span class="token parameter variable">-t</span> get <span class="token parameter variable">-n</span> <span class="token number">100000</span> <span class="token parameter variable">-c</span> <span class="token number">50</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测试指定key大小</span></span>
<span class="line">redis-benchmark <span class="token parameter variable">-t</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-n</span> <span class="token number">100000</span> <span class="token parameter variable">-d</span> <span class="token number">1024</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="💡-最佳实践" tabindex="-1"><a class="header-anchor" href="#💡-最佳实践"><span>💡 最佳实践</span></a></h2><ol><li><strong>合理使用数据库</strong> - 0号库用于生产，其他库用于测试</li><li><strong>设置密码</strong> - 生产环境必须设置密码</li><li><strong>绑定IP</strong> - 只允许特定IP访问</li><li><strong>合理设置过期时间</strong> - 避免内存溢出</li><li><strong>监控Redis状态</strong> - 使用INFO命令查看运行状态</li><li><strong>避免使用KEYS命令</strong> - 生产环境使用SCAN代替</li></ol><h2 id="🔗-相关命令" tabindex="-1"><a class="header-anchor" href="#🔗-相关命令"><span>🔗 相关命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看服务器信息</span></span>
<span class="line">INFO</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看内存使用</span></span>
<span class="line">INFO memory</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看客户端连接</span></span>
<span class="line">CLIENT LIST</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 慢查询日志</span></span>
<span class="line">SLOWLOG GET <span class="token number">10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 实时监控</span></span>
<span class="line">MONITOR</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,56)),n("p",null,[s[1]||(s[1]=n("strong",null,"下一节：",-1)),s[2]||(s[2]=a()),c(e,{to:"/tutorials/java-backend/redis/02-%E4%BA%94%E5%A4%A7%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.html"},{default:d(()=>[...s[0]||(s[0]=[a("02-五大数据类型",-1)])]),_:1})])])}const b=l(v,[["render",m]]),h=JSON.parse('{"path":"/tutorials/java-backend/redis/01-Redisjichu.html","title":"Redis基础","lang":"zh-CN","frontmatter":{"title":"Redis基础"},"headers":[{"level":2,"title":"🎯 学习目标","slug":"🎯-学习目标","link":"#🎯-学习目标","children":[]},{"level":2,"title":"📖 Redis简介","slug":"📖-redis简介","link":"#📖-redis简介","children":[{"level":3,"title":"什么是Redis？","slug":"什么是redis","link":"#什么是redis","children":[]},{"level":3,"title":"核心特点","slug":"核心特点","link":"#核心特点","children":[]},{"level":3,"title":"Redis vs 其他数据库","slug":"redis-vs-其他数据库","link":"#redis-vs-其他数据库","children":[]}]},{"level":2,"title":"🔧 安装Redis","slug":"🔧-安装redis","link":"#🔧-安装redis","children":[{"level":3,"title":"Windows安装","slug":"windows安装","link":"#windows安装","children":[]},{"level":3,"title":"Linux安装","slug":"linux安装","link":"#linux安装","children":[]},{"level":3,"title":"Docker安装","slug":"docker安装","link":"#docker安装","children":[]}]},{"level":2,"title":"⚙️ Redis配置","slug":"⚙️-redis配置","link":"#⚙️-redis配置","children":[{"level":3,"title":"核心配置项","slug":"核心配置项","link":"#核心配置项","children":[]},{"level":3,"title":"启动配置文件","slug":"启动配置文件","link":"#启动配置文件","children":[]}]},{"level":2,"title":"🎮 Redis客户端","slug":"🎮-redis客户端","link":"#🎮-redis客户端","children":[{"level":3,"title":"redis-cli命令行客户端","slug":"redis-cli命令行客户端","link":"#redis-cli命令行客户端","children":[]},{"level":3,"title":"基本命令","slug":"基本命令","link":"#基本命令","children":[]}]},{"level":2,"title":"📊 Redis数据结构","slug":"📊-redis数据结构","link":"#📊-redis数据结构","children":[{"level":3,"title":"1. String（字符串）","slug":"_1-string-字符串","link":"#_1-string-字符串","children":[]},{"level":3,"title":"2. List（列表）","slug":"_2-list-列表","link":"#_2-list-列表","children":[]},{"level":3,"title":"3. Set（集合）","slug":"_3-set-集合","link":"#_3-set-集合","children":[]},{"level":3,"title":"4. Hash（哈希）","slug":"_4-hash-哈希","link":"#_4-hash-哈希","children":[]},{"level":3,"title":"5. Zset（有序集合）","slug":"_5-zset-有序集合","link":"#_5-zset-有序集合","children":[]}]},{"level":2,"title":"🔍 常用操作示例","slug":"🔍-常用操作示例","link":"#🔍-常用操作示例","children":[{"level":3,"title":"缓存用户信息","slug":"缓存用户信息","link":"#缓存用户信息","children":[]},{"level":3,"title":"计数器","slug":"计数器","link":"#计数器","children":[]},{"level":3,"title":"消息队列","slug":"消息队列","link":"#消息队列","children":[]},{"level":3,"title":"排行榜","slug":"排行榜","link":"#排行榜","children":[]}]},{"level":2,"title":"📈 性能测试","slug":"📈-性能测试","link":"#📈-性能测试","children":[{"level":3,"title":"redis-benchmark工具","slug":"redis-benchmark工具","link":"#redis-benchmark工具","children":[]}]},{"level":2,"title":"💡 最佳实践","slug":"💡-最佳实践","link":"#💡-最佳实践","children":[]},{"level":2,"title":"🔗 相关命令","slug":"🔗-相关命令","link":"#🔗-相关命令","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/redis/01-Redis基础.md"}');export{b as comp,h as data};
