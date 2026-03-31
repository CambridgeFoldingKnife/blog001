import{_ as l,c as i,d as p,e as s,f as a,b as t,w as c,r as o,o as u}from"./app-BU7ew1L5.js";const r={};function d(m,n){const e=o("RouteLink");return u(),i("div",null,[n[3]||(n[3]=p(`<h1 id="_05-rabbitmq集群与监控" tabindex="-1"><a class="header-anchor" href="#_05-rabbitmq集群与监控"><span>05 - RabbitMQ集群与监控</span></a></h1><h2 id="🎯-学习目标" tabindex="-1"><a class="header-anchor" href="#🎯-学习目标"><span>🎯 学习目标</span></a></h2><ul><li>理解RabbitMQ集群架构</li><li>掌握集群搭建方法</li><li>学会配置镜像队列</li><li>了解性能优化策略</li><li>掌握监控和告警方案</li></ul><h2 id="🏗️-集群架构" tabindex="-1"><a class="header-anchor" href="#🏗️-集群架构"><span>🏗️ 集群架构</span></a></h2><h3 id="集群模式" tabindex="-1"><a class="header-anchor" href="#集群模式"><span>集群模式</span></a></h3><p>RabbitMQ有三种集群模式：</p><h4 id="_1-普通集群模式-默认" tabindex="-1"><a class="header-anchor" href="#_1-普通集群模式-默认"><span>1. 普通集群模式（默认）</span></a></h4><ul><li>队列数据只存在于一个节点</li><li>其他节点只有元数据</li><li>消费时会从存储节点拉取</li></ul><h4 id="_2-镜像队列模式-推荐" tabindex="-1"><a class="header-anchor" href="#_2-镜像队列模式-推荐"><span>2. 镜像队列模式（推荐）</span></a></h4><ul><li>队列数据在所有节点同步</li><li>高可用，一个节点挂掉不影响</li><li>性能有所下降</li></ul><h4 id="_3-仲裁队列模式-quorum-queue" tabindex="-1"><a class="header-anchor" href="#_3-仲裁队列模式-quorum-queue"><span>3. 仲裁队列模式（Quorum Queue）</span></a></h4><ul><li>RabbitMQ 3.8+新特性</li><li>基于Raft协议</li><li>更高的数据一致性</li></ul><h2 id="🔧-集群搭建" tabindex="-1"><a class="header-anchor" href="#🔧-集群搭建"><span>🔧 集群搭建</span></a></h2><h3 id="docker-compose搭建" tabindex="-1"><a class="header-anchor" href="#docker-compose搭建"><span>Docker Compose搭建</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rabbitmq1</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> rabbitmq<span class="token punctuation">:</span>3.12<span class="token punctuation">-</span>management</span>
<span class="line">    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> rabbitmq1</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rabbitmq1</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> RABBITMQ_ERLANG_COOKIE=SECRETCOOKIE</span>
<span class="line">      <span class="token punctuation">-</span> RABBITMQ_DEFAULT_USER=admin</span>
<span class="line">      <span class="token punctuation">-</span> RABBITMQ_DEFAULT_PASS=admin123</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;5672:5672&quot;</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;15672:15672&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./rabbitmq1<span class="token punctuation">:</span>/var/lib/rabbitmq</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">rabbitmq2</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> rabbitmq<span class="token punctuation">:</span>3.12<span class="token punctuation">-</span>management</span>
<span class="line">    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> rabbitmq2</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rabbitmq2</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> RABBITMQ_ERLANG_COOKIE=SECRETCOOKIE</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;5673:5672&quot;</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;15673:15672&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./rabbitmq2<span class="token punctuation">:</span>/var/lib/rabbitmq</span>
<span class="line"></span>
<span class="line">  <span class="token key atrule">rabbitmq3</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> rabbitmq<span class="token punctuation">:</span>3.12<span class="token punctuation">-</span>management</span>
<span class="line">    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> rabbitmq3</span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rabbitmq3</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> RABBITMQ_ERLANG_COOKIE=SECRETCOOKIE</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;5674:5672&quot;</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;15674:15672&quot;</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> ./rabbitmq3<span class="token punctuation">:</span>/var/lib/rabbitmq</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加入集群" tabindex="-1"><a class="header-anchor" href="#加入集群"><span>加入集群</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 进入rabbitmq2容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> rabbitmq2 <span class="token function">bash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止应用</span></span>
<span class="line">rabbitmqctl stop_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重置节点</span></span>
<span class="line">rabbitmqctl reset</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加入集群</span></span>
<span class="line">rabbitmqctl join_cluster rabbit@rabbitmq1</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动应用</span></span>
<span class="line">rabbitmqctl start_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 同样操作rabbitmq3</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> rabbitmq3 <span class="token function">bash</span></span>
<span class="line">rabbitmqctl stop_app</span>
<span class="line">rabbitmqctl reset</span>
<span class="line">rabbitmqctl join_cluster rabbit@rabbitmq1</span>
<span class="line">rabbitmqctl start_app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看集群状态</span></span>
<span class="line">rabbitmqctl cluster_status</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔄-镜像队列配置" tabindex="-1"><a class="header-anchor" href="#🔄-镜像队列配置"><span>🔄 镜像队列配置</span></a></h2><h3 id="通过命令配置" tabindex="-1"><a class="header-anchor" href="#通过命令配置"><span>通过命令配置</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 设置所有队列为镜像队列（2个副本）</span></span>
<span class="line">rabbitmqctl set_policy ha-all <span class="token string">&quot;^&quot;</span> <span class="token string">&#39;{&quot;ha-mode&quot;:&quot;exactly&quot;,&quot;ha-params&quot;:2,&quot;ha-sync-mode&quot;:&quot;automatic&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置特定队列为镜像队列</span></span>
<span class="line">rabbitmqctl set_policy ha-order <span class="token string">&quot;^order\\.&quot;</span> <span class="token string">&#39;{&quot;ha-mode&quot;:&quot;all&quot;,&quot;ha-sync-mode&quot;:&quot;automatic&quot;}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看策略</span></span>
<span class="line">rabbitmqctl list_policies</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过管理界面配置" tabindex="-1"><a class="header-anchor" href="#通过管理界面配置"><span>通过管理界面配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">访问: http://localhost:15672</span>
<span class="line">Admin → Policies → Add/Update Policy</span>
<span class="line"></span>
<span class="line">Name: ha-all</span>
<span class="line">Pattern: ^</span>
<span class="line">Apply to: queues</span>
<span class="line">Definition:</span>
<span class="line">  ha-mode: all</span>
<span class="line">  ha-sync-mode: automatic</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="镜像队列参数" tabindex="-1"><a class="header-anchor" href="#镜像队列参数"><span>镜像队列参数</span></a></h3><table><thead><tr><th>参数</th><th>说明</th><th>值</th></tr></thead><tbody><tr><td>ha-mode</td><td>镜像模式</td><td>all（所有节点）<br>exactly（指定数量）<br>nodes（指定节点）</td></tr><tr><td>ha-params</td><td>参数</td><td>节点数量或节点名称列表</td></tr><tr><td>ha-sync-mode</td><td>同步模式</td><td>automatic（自动）<br>manual（手动）</td></tr></tbody></table><h2 id="🚀-spring-boot连接集群" tabindex="-1"><a class="header-anchor" href="#🚀-spring-boot连接集群"><span>🚀 Spring Boot连接集群</span></a></h2><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 集群地址</span></span>
<span class="line">    <span class="token key atrule">addresses</span><span class="token punctuation">:</span> 192.168.1.101<span class="token punctuation">:</span><span class="token number">5672</span><span class="token punctuation">,</span>192.168.1.102<span class="token punctuation">:</span><span class="token number">5672</span><span class="token punctuation">,</span>192.168.1.103<span class="token punctuation">:</span><span class="token number">5672</span></span>
<span class="line">    <span class="token key atrule">username</span><span class="token punctuation">:</span> admin</span>
<span class="line">    <span class="token key atrule">password</span><span class="token punctuation">:</span> admin123</span>
<span class="line">    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /</span>
<span class="line">    </span>
<span class="line">    <span class="token comment"># 连接池配置</span></span>
<span class="line">    <span class="token key atrule">listener</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">simple</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">prefetch</span><span class="token punctuation">:</span> <span class="token number">1</span></span>
<span class="line">        <span class="token key atrule">concurrency</span><span class="token punctuation">:</span> <span class="token number">5</span></span>
<span class="line">        <span class="token key atrule">max-concurrency</span><span class="token punctuation">:</span> <span class="token number">10</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📊-性能优化" tabindex="-1"><a class="header-anchor" href="#📊-性能优化"><span>📊 性能优化</span></a></h2><h3 id="_1-消息持久化优化" tabindex="-1"><a class="header-anchor" href="#_1-消息持久化优化"><span>1. 消息持久化优化</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">// 批量发送，减少IO</span></span>
<span class="line"><span class="token annotation punctuation">@Service</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BatchSender</span> <span class="token punctuation">{</span></span>
<span class="line">    </span>
<span class="line">    <span class="token annotation punctuation">@Autowired</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">batchSend</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> messages<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 开启事务</span></span>
<span class="line">        rabbitTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>channel <span class="token operator">-&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> message <span class="token operator">:</span> messages<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                channel<span class="token punctuation">.</span><span class="token function">basicPublish</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;queue&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-预取数量优化" tabindex="-1"><a class="header-anchor" href="#_2-预取数量优化"><span>2. 预取数量优化</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">listener</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">simple</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment"># 一次拉取消息数量</span></span>
<span class="line">        <span class="token key atrule">prefetch</span><span class="token punctuation">:</span> <span class="token number">50</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-连接池优化" tabindex="-1"><a class="header-anchor" href="#_3-连接池优化"><span>3. 连接池优化</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">cache</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">connection</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">mode</span><span class="token punctuation">:</span> channel</span>
<span class="line">        <span class="token key atrule">size</span><span class="token punctuation">:</span> <span class="token number">25</span></span>
<span class="line">      <span class="token key atrule">channel</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">size</span><span class="token punctuation">:</span> <span class="token number">50</span></span>
<span class="line">        <span class="token key atrule">checkout-timeout</span><span class="token punctuation">:</span> <span class="token number">5000</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-消费者并发优化" tabindex="-1"><a class="header-anchor" href="#_4-消费者并发优化"><span>4. 消费者并发优化</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span></span>
<span class="line">    queues <span class="token operator">=</span> <span class="token string">&quot;high-traffic.queue&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    concurrency <span class="token operator">=</span> <span class="token string">&quot;5-10&quot;</span>  <span class="token comment">// 最小5个，最多10个消费者</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 处理消息</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-惰性队列" tabindex="-1"><a class="header-anchor" href="#_5-惰性队列"><span>5. 惰性队列</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">// 大量消息时使用惰性队列</span></span>
<span class="line"><span class="token annotation punctuation">@Bean</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">lazyQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token class-name">QueueBuilder</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">durable</span><span class="token punctuation">(</span><span class="token string">&quot;lazy.queue&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 启用惰性模式</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📈-监控方案" tabindex="-1"><a class="header-anchor" href="#📈-监控方案"><span>📈 监控方案</span></a></h2><h3 id="_1-管理界面监控" tabindex="-1"><a class="header-anchor" href="#_1-管理界面监控"><span>1. 管理界面监控</span></a></h3><p>访问: <code>http://localhost:15672</code></p><p><strong>关键指标：</strong></p><ul><li>队列消息数量</li><li>消费速度</li><li>发布速度</li><li>内存使用</li><li>连接数</li></ul><h3 id="_2-http-api监控" tabindex="-1"><a class="header-anchor" href="#_2-http-api监控"><span>2. HTTP API监控</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Service</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMQMonitor</span> <span class="token punctuation">{</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RestTemplate</span> restTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> apiUrl <span class="token operator">=</span> <span class="token string">&quot;http://localhost:15672/api&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> auth <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token function">encodeToString</span><span class="token punctuation">(</span><span class="token string">&quot;admin:admin123&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">QueueInfo</span> <span class="token function">getQueueInfo</span><span class="token punctuation">(</span><span class="token class-name">String</span> queueName<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">HttpHeaders</span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        headers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Basic &quot;</span> <span class="token operator">+</span> auth<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> entity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">QueueInfo</span><span class="token punctuation">&gt;</span></span> response <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">exchange</span><span class="token punctuation">(</span></span>
<span class="line">            apiUrl <span class="token operator">+</span> <span class="token string">&quot;/queues/%2F/&quot;</span> <span class="token operator">+</span> queueName<span class="token punctuation">,</span></span>
<span class="line">            <span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span></span>
<span class="line">            entity<span class="token punctuation">,</span></span>
<span class="line">            <span class="token class-name">QueueInfo</span><span class="token punctuation">.</span><span class="token keyword">class</span></span>
<span class="line">        <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-prometheus-grafana监控" tabindex="-1"><a class="header-anchor" href="#_3-prometheus-grafana监控"><span>3. Prometheus + Grafana监控</span></a></h3><p><strong>启用Prometheus插件：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">rabbitmq-plugins <span class="token builtin class-name">enable</span> rabbitmq_prometheus</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>Prometheus配置：</strong></p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;rabbitmq&#39;</span></span>
<span class="line">    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;localhost:15692&#39;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Grafana Dashboard ID:</strong> 10991</p><h3 id="_4-告警规则" tabindex="-1"><a class="header-anchor" href="#_4-告警规则"><span>4. 告警规则</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># Prometheus告警规则</span></span>
<span class="line"><span class="token key atrule">groups</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rabbitmq</span>
<span class="line">    <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 队列消息积压告警</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> RabbitMQQueueBacklog</span>
<span class="line">        <span class="token key atrule">expr</span><span class="token punctuation">:</span> rabbitmq_queue_messages <span class="token punctuation">&gt;</span> 10000</span>
<span class="line">        <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">        <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">summary</span><span class="token punctuation">:</span> <span class="token string">&quot;队列消息积压&quot;</span></span>
<span class="line">          <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">&quot;队列{{ $labels.queue }}消息数: {{ $value }}&quot;</span></span>
<span class="line">      </span>
<span class="line">      <span class="token comment"># 消费速度过慢</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> RabbitMQSlowConsume</span>
<span class="line">        <span class="token key atrule">expr</span><span class="token punctuation">:</span> rate(rabbitmq_queue_messages_consumed_total<span class="token punctuation">[</span>5m<span class="token punctuation">]</span>) &lt; 10</span>
<span class="line">        <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">        <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">summary</span><span class="token punctuation">:</span> <span class="token string">&quot;消费速度过慢&quot;</span></span>
<span class="line">      </span>
<span class="line">      <span class="token comment"># 节点内存告警</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">alert</span><span class="token punctuation">:</span> RabbitMQHighMemory</span>
<span class="line">        <span class="token key atrule">expr</span><span class="token punctuation">:</span> rabbitmq_node_mem_used / rabbitmq_node_mem_limit <span class="token punctuation">&gt;</span> 0.8</span>
<span class="line">        <span class="token key atrule">for</span><span class="token punctuation">:</span> 5m</span>
<span class="line">        <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">summary</span><span class="token punctuation">:</span> <span class="token string">&quot;内存使用率过高&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔍-常用运维命令" tabindex="-1"><a class="header-anchor" href="#🔍-常用运维命令"><span>🔍 常用运维命令</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看集群状态</span></span>
<span class="line">rabbitmqctl cluster_status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看队列</span></span>
<span class="line">rabbitmqctl list_queues name messages consumers</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看交换机</span></span>
<span class="line">rabbitmqctl list_exchanges</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看绑定</span></span>
<span class="line">rabbitmqctl list_bindings</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看连接</span></span>
<span class="line">rabbitmqctl list_connections</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看通道</span></span>
<span class="line">rabbitmqctl list_channels</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清空队列</span></span>
<span class="line">rabbitmqctl purge_queue queue_name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除队列</span></span>
<span class="line">rabbitmqctl delete_queue queue_name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看内存使用</span></span>
<span class="line">rabbitmqctl status <span class="token operator">|</span> <span class="token function">grep</span> memory</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重置节点</span></span>
<span class="line">rabbitmqctl reset</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="⚙️-调优建议" tabindex="-1"><a class="header-anchor" href="#⚙️-调优建议"><span>⚙️ 调优建议</span></a></h2><h3 id="_1-系统层面" tabindex="-1"><a class="header-anchor" href="#_1-系统层面"><span>1. 系统层面</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 增加文件描述符限制</span></span>
<span class="line"><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">65536</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改/etc/security/limits.conf</span></span>
<span class="line">* soft nofile <span class="token number">65536</span></span>
<span class="line">* hard nofile <span class="token number">65536</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-rabbitmq配置" tabindex="-1"><a class="header-anchor" href="#_2-rabbitmq配置"><span>2. RabbitMQ配置</span></a></h3><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line"># rabbitmq.conf</span>
<span class="line"></span>
<span class="line"># VM内存高水位（40%）</span>
<span class="line">vm_memory_high_watermark.relative = 0.4</span>
<span class="line"></span>
<span class="line"># 磁盘空闲空间阈值（50GB）</span>
<span class="line">disk_free_limit.absolute = 50GB</span>
<span class="line"></span>
<span class="line"># 心跳超时</span>
<span class="line">heartbeat = 60</span>
<span class="line"></span>
<span class="line"># 通道最大数量</span>
<span class="line">channel_max = 2048</span>
<span class="line"></span>
<span class="line"># 最大连接数</span>
<span class="line">num_acceptors.tcp = 10</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-队列优化" tabindex="-1"><a class="header-anchor" href="#_3-队列优化"><span>3. 队列优化</span></a></h3><ul><li>使用惰性队列处理大量消息</li><li>设置合理的TTL</li><li>使用死信队列处理异常</li><li>限制队列长度</li><li>合理设置prefetch</li></ul><h2 id="💡-高可用方案" tabindex="-1"><a class="header-anchor" href="#💡-高可用方案"><span>💡 高可用方案</span></a></h2><h3 id="_1-集群-镜像队列" tabindex="-1"><a class="header-anchor" href="#_1-集群-镜像队列"><span>1. 集群 + 镜像队列</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Node1(Master) ← → Node2(Slave) ← → Node3(Slave)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-haproxy负载均衡" tabindex="-1"><a class="header-anchor" href="#_2-haproxy负载均衡"><span>2. HAProxy负载均衡</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">HAProxy</span>
<span class="line">  ↓</span>
<span class="line">├─ RabbitMQ1</span>
<span class="line">├─ RabbitMQ2</span>
<span class="line">└─ RabbitMQ3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>HAProxy配置：</strong></p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">listen rabbitmq_cluster</span>
<span class="line">    bind 0.0.0.0:5670</span>
<span class="line">    mode tcp</span>
<span class="line">    balance roundrobin</span>
<span class="line">    server rabbit1 192.168.1.101:5672 check</span>
<span class="line">    server rabbit2 192.168.1.102:5672 check</span>
<span class="line">    server rabbit3 192.168.1.103:5672 check</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🎯-小结" tabindex="-1"><a class="header-anchor" href="#🎯-小结"><span>🎯 小结</span></a></h2><p>本节学习了RabbitMQ集群与监控：</p><ul><li>✅ 集群架构和搭建</li><li>✅ 镜像队列配置</li><li>✅ 性能优化策略</li><li>✅ 监控告警方案</li><li>✅ 高可用部署</li></ul><hr>`,72)),s("p",null,[n[1]||(n[1]=s("strong",null,"下一节：",-1)),n[2]||(n[2]=a()),t(e,{to:"/tutorials/java-backend/rabbitmq/06-RabbitMQ%E9%9D%A2%E8%AF%95%E9%A2%98.html"},{default:c(()=>[...n[0]||(n[0]=[a("06-RabbitMQ面试题",-1)])]),_:1})])])}const b=l(r,[["render",d]]),k=JSON.parse('{"path":"/tutorials/java-backend/rabbitmq/05-RabbitMQjiqunyujiankong.html","title":"RabbitMQ集群与监控","lang":"zh-CN","frontmatter":{"title":"RabbitMQ集群与监控"},"headers":[{"level":2,"title":"🎯 学习目标","slug":"🎯-学习目标","link":"#🎯-学习目标","children":[]},{"level":2,"title":"🏗️ 集群架构","slug":"🏗️-集群架构","link":"#🏗️-集群架构","children":[{"level":3,"title":"集群模式","slug":"集群模式","link":"#集群模式","children":[]}]},{"level":2,"title":"🔧 集群搭建","slug":"🔧-集群搭建","link":"#🔧-集群搭建","children":[{"level":3,"title":"Docker Compose搭建","slug":"docker-compose搭建","link":"#docker-compose搭建","children":[]},{"level":3,"title":"加入集群","slug":"加入集群","link":"#加入集群","children":[]}]},{"level":2,"title":"🔄 镜像队列配置","slug":"🔄-镜像队列配置","link":"#🔄-镜像队列配置","children":[{"level":3,"title":"通过命令配置","slug":"通过命令配置","link":"#通过命令配置","children":[]},{"level":3,"title":"通过管理界面配置","slug":"通过管理界面配置","link":"#通过管理界面配置","children":[]},{"level":3,"title":"镜像队列参数","slug":"镜像队列参数","link":"#镜像队列参数","children":[]}]},{"level":2,"title":"🚀 Spring Boot连接集群","slug":"🚀-spring-boot连接集群","link":"#🚀-spring-boot连接集群","children":[]},{"level":2,"title":"📊 性能优化","slug":"📊-性能优化","link":"#📊-性能优化","children":[{"level":3,"title":"1. 消息持久化优化","slug":"_1-消息持久化优化","link":"#_1-消息持久化优化","children":[]},{"level":3,"title":"2. 预取数量优化","slug":"_2-预取数量优化","link":"#_2-预取数量优化","children":[]},{"level":3,"title":"3. 连接池优化","slug":"_3-连接池优化","link":"#_3-连接池优化","children":[]},{"level":3,"title":"4. 消费者并发优化","slug":"_4-消费者并发优化","link":"#_4-消费者并发优化","children":[]},{"level":3,"title":"5. 惰性队列","slug":"_5-惰性队列","link":"#_5-惰性队列","children":[]}]},{"level":2,"title":"📈 监控方案","slug":"📈-监控方案","link":"#📈-监控方案","children":[{"level":3,"title":"1. 管理界面监控","slug":"_1-管理界面监控","link":"#_1-管理界面监控","children":[]},{"level":3,"title":"2. HTTP API监控","slug":"_2-http-api监控","link":"#_2-http-api监控","children":[]},{"level":3,"title":"3. Prometheus + Grafana监控","slug":"_3-prometheus-grafana监控","link":"#_3-prometheus-grafana监控","children":[]},{"level":3,"title":"4. 告警规则","slug":"_4-告警规则","link":"#_4-告警规则","children":[]}]},{"level":2,"title":"🔍 常用运维命令","slug":"🔍-常用运维命令","link":"#🔍-常用运维命令","children":[]},{"level":2,"title":"⚙️ 调优建议","slug":"⚙️-调优建议","link":"#⚙️-调优建议","children":[{"level":3,"title":"1. 系统层面","slug":"_1-系统层面","link":"#_1-系统层面","children":[]},{"level":3,"title":"2. RabbitMQ配置","slug":"_2-rabbitmq配置","link":"#_2-rabbitmq配置","children":[]},{"level":3,"title":"3. 队列优化","slug":"_3-队列优化","link":"#_3-队列优化","children":[]}]},{"level":2,"title":"💡 高可用方案","slug":"💡-高可用方案","link":"#💡-高可用方案","children":[{"level":3,"title":"1. 集群 + 镜像队列","slug":"_1-集群-镜像队列","link":"#_1-集群-镜像队列","children":[]},{"level":3,"title":"2. HAProxy负载均衡","slug":"_2-haproxy负载均衡","link":"#_2-haproxy负载均衡","children":[]}]},{"level":2,"title":"🎯 小结","slug":"🎯-小结","link":"#🎯-小结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/rabbitmq/05-RabbitMQ集群与监控.md"}');export{b as comp,k as data};
