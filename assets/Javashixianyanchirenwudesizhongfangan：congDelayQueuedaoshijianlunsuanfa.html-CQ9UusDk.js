import{_ as n,c as e,d as a,o as i}from"./app-Y56IYxhu.js";const l="/blog001/assets/image-lYwrIDgL.png",d={};function r(c,s){return i(),e("div",null,[...s[0]||(s[0]=[a(`<h1 id="java实现延迟任务的四种方案-从delayqueue到时间轮算法" tabindex="-1"><a class="header-anchor" href="#java实现延迟任务的四种方案-从delayqueue到时间轮算法"><span>Java实现延迟任务的四种方案：从DelayQueue到时间轮算法</span></a></h1><p>在业务开发中，延迟任务（Delayed Task）是处理&quot;<strong>现在不做，等一会儿再做</strong>&quot;这类需求的核心手段。它主要用于解耦业务流程、提升系统响应速度以及保证数据的最终一致性。</p><p>简单来说，就是当业务逻辑不需要立即执行，或者需要等待特定条件满足后才执行时，此时就会用到延迟任务。例如：在开发中我们经常会遇到这样的需求：<strong>&quot;在这个时间点做某事&quot;<strong>或者</strong>&quot;等待一段时间后做某事&quot;</strong>。比如订单超时取消、退款处理、定时提醒等。</p><p>今天我们就来通过代码实战，介绍一下 Java 中实现延迟任务的四种主流方案。</p><h3 id="_1-jdk-原生方案-delayqueue" tabindex="-1"><a class="header-anchor" href="#_1-jdk-原生方案-delayqueue"><span>1. JDK 原生方案：DelayQueue</span></a></h3><p>这是最基础、门槛最低的方案，完全依赖 JDK，不需要第三方中间件。它适合单机环境下的轻量级任务。</p><h4 id="核心原理" tabindex="-1"><a class="header-anchor" href="#核心原理"><span>核心原理</span></a></h4><p><code>DelayQueue</code> 是一个无界阻塞队列，只有在延迟时间到了之后，才能从队列中取出元素。它内部使用了 <code>ReentrantLock</code> 和 <code>Condition</code> 实现线程安全。</p><h4 id="代码落地" tabindex="-1"><a class="header-anchor" href="#代码落地"><span>代码落地</span></a></h4><p>首先，我们需要定义一个任务类，实现 <code>Delayed</code> 接口，并重写 <code>getDelay</code> 方法。</p><p><strong>Java 中 <code>DelayQueue</code> 的核心运作原理：</strong><code>DelayQueue</code> 元素<strong>必须实现 <code>Delayed</code> 接口</strong>，必须重写 <code>getDelay(TimeUnit unit)</code> 方法，用来返回<strong>剩余延迟时间</strong>。同时 <code>Delayed</code> 接口<strong>继承自 <code>Comparable</code></strong>， 必须重写 <code>compareTo</code> 方法，用来<strong>按剩余延迟时间排序</strong>， 从队列取元素时：<strong>只有到期的任务才能被取出</strong>，没到期的拿不到。</p><p>以例子理解原理：</p><p>我们把 <code>DelayQueue</code> 比作一个**&quot;智能快递柜&quot;<strong>，那么这段文字就是在讲</strong>&quot;什么样的包裹能放进这个柜子&quot;<strong>以及</strong>&quot;柜子怎么决定先给谁开门&quot;<strong>。所以任何想放入这个队列的任务（我们可以比喻成</strong>&quot;包裹&quot;<strong>），都必须实现 <code>Delayed</code> 接口。然后用接口中的</strong><code>getDelay</code>**方法，回去队列中剩余任务的延迟时间，查看是否快到期，是否需要紧急处理。</p><p>同时<code>Delayed</code> 接口其实继承了 <code>Comparable</code> 接口。这意味着，放进来的任务不仅要会&quot;报时&quot;，还得会&quot;攀比&quot;，我们实现compareTo方法，它会根据 <code>compareTo</code> 方法的逻辑，自动把任务排好序。<code>getDelay</code> 返回时间<strong>最短</strong>（最着急）的任务，会被排在队列的最前面（堆顶）。</p><p><strong>代码案例：</strong></p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java" data-title="Java"><pre><code><span class="line">@Data</span>
<span class="line">public class DelayTask &lt;D&gt;implements Delayed {</span>
<span class="line">    private D data;// 延迟任务的数据,指定一个泛型，没有具体类型，可传任何类型。</span>
<span class="line">    private long deadlineNanos; // 延迟任务的截止时间</span>
<span class="line"></span>
<span class="line">    // 构造函数，指定延迟任务的数据和 计算一下延迟时间=当前时间+延迟时间，单位纳秒</span>
<span class="line">    public DelayTask(D data, Duration delayTime) {</span>
<span class="line">        this.data = data;</span>
<span class="line">        this.deadlineNanos = System.nanoTime() + delayTime.toNanos();</span>
<span class="line">    }</span>
<span class="line">    /**</span>
<span class="line">     * 获取延迟时间</span>
<span class="line">     * @param unit 时间单位</span>
<span class="line">     * @return 延迟时间</span>
<span class="line">     */</span>
<span class="line">    @Override</span>
<span class="line">    public long getDelay(@NotNull TimeUnit unit) {</span>
<span class="line">        // 计算每个任务的开始执行时间-当前时间，单位纳秒 最小为0不能为负值</span>
<span class="line">        //再用时间转化器转换成指定单位的时间</span>
<span class="line">        return unit.convert(Math.max(0, deadlineNanos - System.nanoTime()), TimeUnit.NANOSECONDS);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    /*</span>
<span class="line">      --比较队列中的延迟时间大小，小的比较急先执行。</span>
<span class="line">      getDelay(TimeUnit.NANOSECONDS)：获取当前任务还需要等待多久才能执行（剩余延迟时间），单位是纳秒。</span>
<span class="line">      o.getDelay(...)：获取另一个任务还需要等待多久。</span>
<span class="line">     </span>
<span class="line">    */</span>
<span class="line">    /**</span>
<span class="line">     * 避免数据溢出，实际工程版本</span>
<span class="line">     * @param o the object to be compared.</span>
<span class="line">     * @return</span>
<span class="line">     */</span>
<span class="line">    @Override</span>
<span class="line">    public int compareTo(@NotNull Delayed o) {</span>
<span class="line">        // 这种方式更安全，避免了数值溢出问题</span>
<span class="line">        return Long.compare(</span>
<span class="line">                this.getDelay(TimeUnit.NANOSECONDS),</span>
<span class="line">                o.getDelay(TimeUnit.NANOSECONDS)</span>
<span class="line">        );</span>
<span class="line">    }</span>
<span class="line">    /**</span>
<span class="line">     * 比较两个延迟任务的延迟时间--方便理解版本：两者的差值。</span>
<span class="line">     * @param o 延迟任务</span>
<span class="line">     * @return 延迟时间</span>
<span class="line">     */</span>
<span class="line">     </span>
<span class="line">   /* @Override</span>
<span class="line">    public int compareTo(@NotNull Delayed o) {</span>
<span class="line">        long l = getDelay(TimeUnit.NANOSECONDS) - o.getDelay(TimeUnit.NANOSECONDS);</span>
<span class="line">        if(l&gt;0){   //我要等得更久，所以我优先级更低，我应该排在后面。</span>
<span class="line">            return 1;</span>
<span class="line">        }else if(l&lt;0){//我等的时间短，快到期了，所以我优先级更高，我应该排在前面（先被执行）。</span>
<span class="line">            return -1;</span>
<span class="line">        }else{</span>
<span class="line">            return 0;//意味着两者的延迟时间相等。</span>
<span class="line">        }</span>
<span class="line">    }*/</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点总结：</strong></p><ul><li><strong>优点</strong>：零依赖，代码简单，JDK 原生支持。</li><li><strong>缺点</strong>：<strong>单机内存存储</strong>。服务重启任务丢失；集群部署时，任务无法共享（任务在 A 机器，B 机器消费不到）。</li></ul><h3 id="_2-分布式方案-redisson" tabindex="-1"><a class="header-anchor" href="#_2-分布式方案-redisson"><span>2. 分布式方案：Redisson</span></a></h3><p>为了解决单机问题，我们利用 Redis 的 <code>ZSet</code> 结构。<code>Redisson</code> 框架对 Redis 进行了封装，提供了非常好用的分布式延迟队列。</p><h4 id="核心原理-1" tabindex="-1"><a class="header-anchor" href="#核心原理-1"><span>核心原理</span></a></h4><p>利用 Redis <code>ZSet</code> 的 <code>score</code> 存储任务的执行时间戳。消费者不断轮询 <code>ZSet</code>，这里是&quot;基于 Redis 的 Sorted Set 特性，通过后台任务扫描到期任务，不是客户端在死循环查数据库，取出 <code>score</code> 小于当前时间的任务进行处理。</p><h4 id="代码落地-1" tabindex="-1"><a class="header-anchor" href="#代码落地-1"><span>代码落地</span></a></h4><p>引入依赖 <code>redisson-spring-boot-starter</code>。</p><p><strong>代码案例</strong></p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java" data-title="Java"><pre><code><span class="line">import org.redisson.api.RBlockingQueue;</span>
<span class="line">import org.redisson.api.RDelayedQueue;</span>
<span class="line">import org.redisson.api.RedissonClient;</span>
<span class="line">import org.springframework.stereotype.Component;</span>
<span class="line">import javax.annotation.PostConstruct;</span>
<span class="line">import javax.annotation.Resource;</span>
<span class="line">import java.util.concurrent.TimeUnit;</span>
<span class="line">@Component</span>
<span class="line">public class RedissonDelayQueue {</span>
<span class="line"></span>
<span class="line">    @Resource</span>
<span class="line">    private RedissonClient redissonClient;</span>
<span class="line"></span>
<span class="line">    @PostConstruct</span>
<span class="line">    public void startQueue() {</span>
<span class="line">        // 1. 定义一个阻塞队列</span>
<span class="line">        RBlockingQueue&lt;String&gt; blockingQueue = redissonClient.getBlockingQueue(&quot;order_queue&quot;);</span>
<span class="line">        </span>
<span class="line">        // 2. 基于阻塞队列构建延迟队列</span>
<span class="line">        RDelayedQueue&lt;String&gt; delayedQueue = redissonClient.getDelayedQueue(blockingQueue);</span>
<span class="line"></span>
<span class="line">        // 3. 启动消费者监听</span>
<span class="line">        new Thread(() -&gt; {</span>
<span class="line">            while (true) {</span>
<span class="line">                try {</span>
<span class="line">                    // take() 会阻塞等待，只有当延迟时间到了，元素才会从 delayedQueue 转移到 blockingQueue</span>
<span class="line">                    String orderId = blockingQueue.take();</span>
<span class="line">                    System.out.println(&quot;【Redisson消费】执行订单关闭：&quot; + orderId);</span>
<span class="line">                } catch (InterruptedException e) {</span>
<span class="line">                    e.printStackTrace();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }).start();</span>
<span class="line"></span>
<span class="line">        // 4. 模拟生产任务 (延迟 5 秒)</span>
<span class="line">        delayedQueue.offer(&quot;Order_1001&quot;, 5, TimeUnit.SECONDS);</span>
<span class="line">        System.out.println(&quot;【Redisson生产】订单 Order_1001 已加入，5秒后执行&quot;);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点总结：</strong></p><ul><li><strong>优点</strong>：支持分布式，数据持久化在 Redis，可靠性高。</li><li><strong>缺点</strong>：依赖 Redis；基于轮询实现，如果任务量极大，可能会有微小的延迟或 Redis 压力。</li></ul><h3 id="_3-消息中间件方案-rocketmq" tabindex="-1"><a class="header-anchor" href="#_3-消息中间件方案-rocketmq"><span>3. 消息中间件方案：RocketMQ</span></a></h3><p>这是企业级开发最常用的方案。利用 MQ 的消息机制，让 Broker 帮我们管理延迟。</p><h4 id="核心原理-2" tabindex="-1"><a class="header-anchor" href="#核心原理-2"><span>核心原理</span></a></h4><p>发送消息时指定 <code>delayTimeLevel</code>。消息到达 Broker 后，不会直接投递给消费者，而是先存入一个特殊的&quot;延迟主题&quot;中，时间到了再转存到真实主题供消费者消费。</p><h4 id="代码落地-2" tabindex="-1"><a class="header-anchor" href="#代码落地-2"><span>代码落地</span></a></h4><p>这里以 RocketMQ 为例（RabbitMQ 需配合插件或死信队列，逻辑类似）。</p><p><strong>生产者：</strong></p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java" data-title="Java"><pre><code><span class="line">import org.apache.rocketmq.client.producer.DefaultMQProducer;</span>
<span class="line">import org.apache.rocketmq.client.producer.SendResult;</span>
<span class="line">import org.apache.rocketmq.common.message.Message;</span>
<span class="line"></span>
<span class="line">public class MqProducer {</span>
<span class="line">    public static void main(String[] args) throws Exception {</span>
<span class="line">        DefaultMQProducer producer = new DefaultMQProducer(&quot;producer_group&quot;);</span>
<span class="line">        producer.setNamesrvAddr(&quot;localhost:9876&quot;);</span>
<span class="line">        producer.start();</span>
<span class="line"></span>
<span class="line">        Message msg = new Message(&quot;OrderTopic&quot;, &quot;OrderTag&quot;, &quot;Order_2023&quot;, &quot;Hello RocketMQ&quot;.getBytes());</span>
<span class="line">  </span>
<span class="line">     //设置延迟等级：3级代表 10秒 (RocketMQ 的默认延迟等级通常是：1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h。)</span>
<span class="line">        msg.setDelayTimeLevel(3); </span>
<span class="line"></span>
<span class="line">        SendResult sendResult = producer.send(msg);</span>
<span class="line">        System.out.println(&quot;【MQ生产】发送成功，结果：&quot; + sendResult);</span>
<span class="line">        </span>
<span class="line">        producer.shutdown();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>消费者：</strong></p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java" data-title="Java"><pre><code><span class="line">import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;</span>
<span class="line">import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;</span>
<span class="line">import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;</span>
<span class="line">import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;</span>
<span class="line">import org.apache.rocketmq.common.message.MessageExt;</span>
<span class="line"></span>
<span class="line">public class MqConsumer {</span>
<span class="line">    public static void main(String[] args) throws Exception {</span>
<span class="line">        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(&quot;consumer_group&quot;);</span>
<span class="line">        consumer.setNamesrvAddr(&quot;localhost:9876&quot;);</span>
<span class="line">        consumer.subscribe(&quot;OrderTopic&quot;, &quot;*&quot;);</span>
<span class="line"></span>
<span class="line">        consumer.registerMessageListener((MessageListenerConcurrently) (msgs, context) -&gt; {</span>
<span class="line">            for (MessageExt msg : msgs) {</span>
<span class="line">                System.out.println(&quot;【MQ消费】收到消息：&quot; + new String(msg.getBody()) + </span>
<span class="line">                                   &quot;，实际消费时间：&quot; + System.currentTimeMillis());</span>
<span class="line">            }</span>
<span class="line">            return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;</span>
<span class="line">        });</span>
<span class="line"></span>
<span class="line">        consumer.start();</span>
<span class="line">        System.out.println(&quot;【MQ消费】消费者启动&quot;);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点总结：</strong></p><ul><li><strong>优点</strong>：高可靠，高吞吐，解耦。支持海量任务堆积。</li><li><strong>缺点</strong>：架构复杂，运维成本高；RocketMQ 的延迟等级是固定的（除非定制），不如 Redisson 灵活。</li></ul><h3 id="_4-高性能算法方案-时间轮-hashedwheeltimer" tabindex="-1"><a class="header-anchor" href="#_4-高性能算法方案-时间轮-hashedwheeltimer"><span>4. 高性能算法方案：时间轮 (HashedWheelTimer)</span></a></h3><p>如果你需要处理<strong>超高频、低延迟</strong>的任务（比如心跳检测、连接超时），上面几种方案可能太重了。这时候需要用到&quot;时间轮&quot;算法。Netty 和 Kafka 内部都使用了这种算法。</p><h4 id="核心原理-3" tabindex="-1"><a class="header-anchor" href="#核心原理-3"><span>核心原理</span></a></h4><p>像一个时钟表盘。有很多个&quot;槽&quot;（Slot），每个槽代表一个时间间隔。指针转动，转到哪个槽，就执行哪个槽里的任务。</p><h4 id="代码落地-3" tabindex="-1"><a class="header-anchor" href="#代码落地-3"><span>代码落地</span></a></h4><p>这里直接使用 Netty 提供的 <code>HashedWheelTimer</code>。</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java" data-title="Java"><pre><code><span class="line">import io.netty.util.HashedWheelTimer;</span>
<span class="line">import io.netty.util.Timeout;</span>
<span class="line">import io.netty.util.TimerTask;</span>
<span class="line"></span>
<span class="line">import java.util.concurrent.TimeUnit;</span>
<span class="line"></span>
<span class="line">public class TimeWheelDemo {</span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        // 1. 创建时间轮</span>
<span class="line">        // tickDuration=1, unit=SECONDS -&gt; 每1秒指针走一格</span>
<span class="line">        // ticksPerWheel=8 -&gt; 表盘有8个槽</span>
<span class="line">        HashedWheelTimer timer = new HashedWheelTimer(1, TimeUnit.SECONDS, 8);</span>
<span class="line"></span>
<span class="line">        System.out.println(&quot;提交任务...&quot;);</span>
<span class="line"></span>
<span class="line">        // 2. 提交任务 (延迟 5秒)</span>
<span class="line">        timer.newTimeout(new TimerTask() {</span>
<span class="line">            @Override</span>
<span class="line">            public void run(Timeout timeout) throws Exception {</span>
<span class="line">                System.out.println(&quot;【时间轮】任务执行：连接超时检查&quot;);</span>
<span class="line">            }</span>
<span class="line">        }, 5, TimeUnit.SECONDS);</span>
<span class="line">        </span>
<span class="line">        // 保持程序运行，否则主线程退出，定时器也会关闭</span>
<span class="line">        try { Thread.sleep(10000); } catch (InterruptedException e) {}</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优缺点总结：</strong></p><ul><li><strong>优点</strong>：<strong>性能极高</strong>。增加任务的时间复杂度是 O(1)，非常适合每秒百万级的超时任务（如网络连接空闲检测）。</li><li><strong>缺点</strong>：精度取决于 tickDuration；任务是在内存中，不支持持久化（进程挂了任务就没了）。</li></ul><p><img src="`+l+'" alt="四种延迟任务方案对比图"></p>',50)])])}const t=n(d,[["render",r]]),o=JSON.parse('{"path":"/blogs/Javashixianyanchirenwudesizhongfangan：congDelayQueuedaoshijianlunsuanfa.html","title":"Java实现延迟任务的四种方案：从DelayQueue到时间轮算法","lang":"zh-CN","frontmatter":{"title":"Java实现延迟任务的四种方案：从DelayQueue到时间轮算法","date":"2026-04-03T00:00:00.000Z","categories":["Java","架构设计","中间件"],"tags":["Java","Redisson","RocketMQ","Netty","延迟队列","时间轮"],"author":"剑桥折刀"},"headers":[{"level":3,"title":"1. JDK 原生方案：DelayQueue","slug":"_1-jdk-原生方案-delayqueue","link":"#_1-jdk-原生方案-delayqueue","children":[]},{"level":3,"title":"2. 分布式方案：Redisson","slug":"_2-分布式方案-redisson","link":"#_2-分布式方案-redisson","children":[]},{"level":3,"title":"3. 消息中间件方案：RocketMQ","slug":"_3-消息中间件方案-rocketmq","link":"#_3-消息中间件方案-rocketmq","children":[]},{"level":3,"title":"4. 高性能算法方案：时间轮 (HashedWheelTimer)","slug":"_4-高性能算法方案-时间轮-hashedwheeltimer","link":"#_4-高性能算法方案-时间轮-hashedwheeltimer","children":[]}],"git":{"createdTime":1775228292000,"updatedTime":1775229288000,"contributors":[{"name":"剑桥折刀","email":"3144253125@qq.com","commits":2}]},"filePathRelative":"blogs/Java实现延迟任务的四种方案：从DelayQueue到时间轮算法.md"}');export{t as comp,o as data};
