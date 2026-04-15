import{_ as n,c as a,d as e,o as l}from"./app-CjJuDk73.js";const t={};function i(p,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="jsp技术" tabindex="-1"><a class="header-anchor" href="#jsp技术"><span>JSP技术</span></a></h1><h2 id="一、jsp概述" tabindex="-1"><a class="header-anchor" href="#一、jsp概述"><span>一、JSP概述</span></a></h2><h3 id="_1-1-什么是jsp" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是jsp"><span>1.1 什么是JSP？</span></a></h3><p><strong>JSP（Java Server Pages）</strong>：运行在服务器端的动态网页技术。</p><p><strong>本质：</strong> JSP 就是 Servlet。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">JSP → Tomcat → 翻译成 Servlet.java → 编译成 .class → 执行</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-2-jsp-vs-servlet" tabindex="-1"><a class="header-anchor" href="#_1-2-jsp-vs-servlet"><span>1.2 JSP vs Servlet</span></a></h3><table><thead><tr><th>特性</th><th>Servlet</th><th>JSP</th></tr></thead><tbody><tr><td>擅长</td><td>Java 代码</td><td>HTML</td></tr><tr><td>输出HTML</td><td>繁琐</td><td>简洁</td></tr><tr><td>可读性</td><td>差</td><td>好</td></tr><tr><td>开发效率</td><td>低</td><td>高</td></tr></tbody></table><p><strong>最佳实践：</strong> Servlet 处理业务逻辑，JSP 负责页面展示。</p><hr><h2 id="二、jsp基础语法" tabindex="-1"><a class="header-anchor" href="#二、jsp基础语法"><span>二、JSP基础语法</span></a></h2><h3 id="_2-1-jsp-脚本" tabindex="-1"><a class="header-anchor" href="#_2-1-jsp-脚本"><span>2.1 JSP 脚本</span></a></h3><h4 id="_2-1-1-java-代码片段" tabindex="-1"><a class="header-anchor" href="#_2-1-1-java-代码片段"><span>2.1.1 Java 代码片段</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%</span>
<span class="line">    // Java 代码</span>
<span class="line">    String name = &quot;张三&quot;;</span>
<span class="line">    int age = 20;</span>
<span class="line">    out.println(&quot;姓名：&quot; + name);</span>
<span class="line">%&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-表达式" tabindex="-1"><a class="header-anchor" href="#_2-1-2-表达式"><span>2.1.2 表达式</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%= 变量或表达式 %&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 示例 --&gt;</span>
<span class="line">&lt;p&gt;当前时间：&lt;%= new Date() %&gt;&lt;/p&gt;</span>
<span class="line">&lt;p&gt;1 + 2 = &lt;%= 1 + 2 %&gt;&lt;/p&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-声明" tabindex="-1"><a class="header-anchor" href="#_2-1-3-声明"><span>2.1.3 声明</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%!</span>
<span class="line">    // 声明成员变量和方法</span>
<span class="line">    private int count = 0;</span>
<span class="line">    </span>
<span class="line">    public String getName() {</span>
<span class="line">        return &quot;张三&quot;;</span>
<span class="line">    }</span>
<span class="line">%&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-jsp-指令" tabindex="-1"><a class="header-anchor" href="#_2-2-jsp-指令"><span>2.2 JSP 指令</span></a></h3><h4 id="_2-2-1-page-指令" tabindex="-1"><a class="header-anchor" href="#_2-2-1-page-指令"><span>2.2.1 page 指令</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%@ page </span>
<span class="line">    language=&quot;java&quot; </span>
<span class="line">    contentType=&quot;text/html;charset=UTF-8&quot;</span>
<span class="line">    pageEncoding=&quot;UTF-8&quot;</span>
<span class="line">    import=&quot;java.util.*,java.text.*&quot;</span>
<span class="line">    errorPage=&quot;error.jsp&quot;</span>
<span class="line">    isErrorPage=&quot;false&quot;</span>
<span class="line">%&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-include-指令-静态包含" tabindex="-1"><a class="header-anchor" href="#_2-2-2-include-指令-静态包含"><span>2.2.2 include 指令（静态包含）</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%@ include file=&quot;header.jsp&quot; %&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="_2-2-3-taglib-指令" tabindex="-1"><a class="header-anchor" href="#_2-2-3-taglib-指令"><span>2.2.3 taglib 指令</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%@ taglib uri=&quot;http://java.sun.com/jsp/jstl/core&quot; prefix=&quot;c&quot; %&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-3-jsp-注释" tabindex="-1"><a class="header-anchor" href="#_2-3-jsp-注释"><span>2.3 JSP 注释</span></a></h3><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;!-- HTML 注释（会发送到客户端） --&gt;</span>
<span class="line"></span>
<span class="line">&lt;%-- JSP 注释（不会发送到客户端） --%&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="三、jsp九大内置对象" tabindex="-1"><a class="header-anchor" href="#三、jsp九大内置对象"><span>三、JSP九大内置对象</span></a></h2><h3 id="_3-1-内置对象列表" tabindex="-1"><a class="header-anchor" href="#_3-1-内置对象列表"><span>3.1 内置对象列表</span></a></h3><table><thead><tr><th>对象</th><th>类型</th><th>作用域</th><th>说明</th></tr></thead><tbody><tr><td><strong>request</strong></td><td>HttpServletRequest</td><td>Request</td><td>请求对象</td></tr><tr><td><strong>response</strong></td><td>HttpServletResponse</td><td>Page</td><td>响应对象</td></tr><tr><td><strong>session</strong></td><td>HttpSession</td><td>Session</td><td>会话对象</td></tr><tr><td><strong>application</strong></td><td>ServletContext</td><td>Application</td><td>应用对象</td></tr><tr><td><strong>out</strong></td><td>JspWriter</td><td>Page</td><td>输出对象</td></tr><tr><td><strong>pageContext</strong></td><td>PageContext</td><td>Page</td><td>页面上下文</td></tr><tr><td><strong>config</strong></td><td>ServletConfig</td><td>Page</td><td>配置对象</td></tr><tr><td><strong>page</strong></td><td>Object</td><td>Page</td><td>当前页面对象</td></tr><tr><td><strong>exception</strong></td><td>Throwable</td><td>Page</td><td>异常对象</td></tr></tbody></table><h3 id="_3-2-作用域对象" tabindex="-1"><a class="header-anchor" href="#_3-2-作用域对象"><span>3.2 作用域对象</span></a></h3><p><strong>四大域对象（范围从小到大）：</strong></p><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%</span>
<span class="line">    // 1. pageContext - 当前页面</span>
<span class="line">    pageContext.setAttribute(&quot;msg&quot;, &quot;page&quot;);</span>
<span class="line">    </span>
<span class="line">    // 2. request - 一次请求</span>
<span class="line">    request.setAttribute(&quot;msg&quot;, &quot;request&quot;);</span>
<span class="line">    </span>
<span class="line">    // 3. session - 一次会话</span>
<span class="line">    session.setAttribute(&quot;msg&quot;, &quot;session&quot;);</span>
<span class="line">    </span>
<span class="line">    // 4. application - 整个应用</span>
<span class="line">    application.setAttribute(&quot;msg&quot;, &quot;application&quot;);</span>
<span class="line">%&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>选择原则：</strong> 能用小的就不用大的，减少内存占用。</p><h3 id="_3-3-常用内置对象" tabindex="-1"><a class="header-anchor" href="#_3-3-常用内置对象"><span>3.3 常用内置对象</span></a></h3><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%</span>
<span class="line">    // out - 输出</span>
<span class="line">    out.println(&quot;&lt;h1&gt;标题&lt;/h1&gt;&quot;);</span>
<span class="line">    </span>
<span class="line">    // request - 获取参数</span>
<span class="line">    String name = request.getParameter(&quot;name&quot;);</span>
<span class="line">    </span>
<span class="line">    // session - 会话管理</span>
<span class="line">    session.setAttribute(&quot;user&quot;, &quot;张三&quot;);</span>
<span class="line">    </span>
<span class="line">    // application - 全局数据</span>
<span class="line">    Integer count = (Integer) application.getAttribute(&quot;visitCount&quot;);</span>
<span class="line">    </span>
<span class="line">    // pageContext - 获取其他内置对象</span>
<span class="line">    HttpSession s = (HttpSession) pageContext.getSession();</span>
<span class="line">%&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="四、el表达式" tabindex="-1"><a class="header-anchor" href="#四、el表达式"><span>四、EL表达式</span></a></h2><h3 id="_4-1-el基础" tabindex="-1"><a class="header-anchor" href="#_4-1-el基础"><span>4.1 EL基础</span></a></h3><p><strong>Expression Language（表达式语言）</strong>：简化 JSP 页面中数据的获取。</p><p><strong>语法：</strong> <code>\${表达式}</code></p><p><strong>示例：</strong></p><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;!-- 传统方式 --&gt;</span>
<span class="line">&lt;%= request.getAttribute(&quot;username&quot;) %&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- EL 方式 --&gt;</span>
<span class="line">\${username}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-el-获取数据" tabindex="-1"><a class="header-anchor" href="#_4-2-el-获取数据"><span>4.2 EL 获取数据</span></a></h3><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%</span>
<span class="line">    request.setAttribute(&quot;name&quot;, &quot;张三&quot;);</span>
<span class="line">    request.setAttribute(&quot;age&quot;, 20);</span>
<span class="line">%&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 获取普通数据 --&gt;</span>
<span class="line">&lt;p&gt;姓名：\${name}&lt;/p&gt;</span>
<span class="line">&lt;p&gt;年龄：\${age}&lt;/p&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 获取对象属性 --&gt;</span>
<span class="line">&lt;%</span>
<span class="line">    User user = new User(&quot;李四&quot;, 25);</span>
<span class="line">    request.setAttribute(&quot;user&quot;, user);</span>
<span class="line">%&gt;</span>
<span class="line">&lt;p&gt;姓名：\${user.name}&lt;/p&gt;</span>
<span class="line">&lt;p&gt;年龄：\${user.age}&lt;/p&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 获取List --&gt;</span>
<span class="line">&lt;%</span>
<span class="line">    List&lt;String&gt; list = Arrays.asList(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;);</span>
<span class="line">    request.setAttribute(&quot;list&quot;, list);</span>
<span class="line">%&gt;</span>
<span class="line">&lt;p&gt;\${list[0]}&lt;/p&gt; &lt;!-- A --&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 获取Map --&gt;</span>
<span class="line">&lt;%</span>
<span class="line">    Map&lt;String, String&gt; map = new HashMap&lt;&gt;();</span>
<span class="line">    map.put(&quot;key1&quot;, &quot;value1&quot;);</span>
<span class="line">    request.setAttribute(&quot;map&quot;, map);</span>
<span class="line">%&gt;</span>
<span class="line">&lt;p&gt;\${map.key1}&lt;/p&gt; &lt;!-- value1 --&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-el-运算" tabindex="-1"><a class="header-anchor" href="#_4-3-el-运算"><span>4.3 EL 运算</span></a></h3><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;!-- 算术运算 --&gt;</span>
<span class="line">\${10 + 20}  &lt;!-- 30 --&gt;</span>
<span class="line">\${10 - 5}   &lt;!-- 5 --&gt;</span>
<span class="line">\${10 * 2}   &lt;!-- 20 --&gt;</span>
<span class="line">\${10 / 2}   &lt;!-- 5.0 --&gt;</span>
<span class="line">\${10 % 3}   &lt;!-- 1 --&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 比较运算 --&gt;</span>
<span class="line">\${10 &gt; 5}   &lt;!-- true --&gt;</span>
<span class="line">\${10 == 10} &lt;!-- true --&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 逻辑运算 --&gt;</span>
<span class="line">\${true &amp;&amp; false}  &lt;!-- false --&gt;</span>
<span class="line">\${true || false}  &lt;!-- true --&gt;</span>
<span class="line">\${!true}          &lt;!-- false --&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 空判断 --&gt;</span>
<span class="line">\${empty name}  &lt;!-- true/false --&gt;</span>
<span class="line">\${not empty name}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-el-隐式对象" tabindex="-1"><a class="header-anchor" href="#_4-4-el-隐式对象"><span>4.4 EL 隐式对象</span></a></h3><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;!-- pageContext --&gt;</span>
<span class="line">\${pageContext.request.contextPath}  &lt;!-- 上下文路径 --&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- param - 获取请求参数 --&gt;</span>
<span class="line">\${param.username}  &lt;!-- 等同于 request.getParameter(&quot;username&quot;) --&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- paramValues - 获取数组参数 --&gt;</span>
<span class="line">\${paramValues.hobby[0]}</span>
<span class="line"></span>
<span class="line">&lt;!-- cookie --&gt;</span>
<span class="line">\${cookie.username.value}</span>
<span class="line"></span>
<span class="line">&lt;!-- initParam - 全局参数 --&gt;</span>
<span class="line">\${initParam.appName}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、jstl标签库" tabindex="-1"><a class="header-anchor" href="#五、jstl标签库"><span>五、JSTL标签库</span></a></h2><h3 id="_5-1-导入jstl" tabindex="-1"><a class="header-anchor" href="#_5-1-导入jstl"><span>5.1 导入JSTL</span></a></h3><p><strong>1. 添加依赖</strong></p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>javax.servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>jstl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 在JSP中引入</strong></p><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%@ taglib uri=&quot;http://java.sun.com/jsp/jstl/core&quot; prefix=&quot;c&quot; %&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_5-2-常用标签" tabindex="-1"><a class="header-anchor" href="#_5-2-常用标签"><span>5.2 常用标签</span></a></h3><h4 id="_5-2-1-c-set-设置变量" tabindex="-1"><a class="header-anchor" href="#_5-2-1-c-set-设置变量"><span>5.2.1 c:set 设置变量</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;c:set var=&quot;name&quot; value=&quot;张三&quot; scope=&quot;request&quot;/&gt;</span>
<span class="line">&lt;p&gt;\${name}&lt;/p&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-2-c-if-条件判断" tabindex="-1"><a class="header-anchor" href="#_5-2-2-c-if-条件判断"><span>5.2.2 c:if 条件判断</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;c:set var=&quot;age&quot; value=&quot;20&quot;/&gt;</span>
<span class="line"></span>
<span class="line">&lt;c:if test=&quot;\${age &gt;= 18}&quot;&gt;</span>
<span class="line">    &lt;p&gt;成年人&lt;/p&gt;</span>
<span class="line">&lt;/c:if&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-3-c-choose-多条件判断" tabindex="-1"><a class="header-anchor" href="#_5-2-3-c-choose-多条件判断"><span>5.2.3 c:choose 多条件判断</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;c:set var=&quot;score&quot; value=&quot;85&quot;/&gt;</span>
<span class="line"></span>
<span class="line">&lt;c:choose&gt;</span>
<span class="line">    &lt;c:when test=&quot;\${score &gt;= 90}&quot;&gt;</span>
<span class="line">        &lt;p&gt;优秀&lt;/p&gt;</span>
<span class="line">    &lt;/c:when&gt;</span>
<span class="line">    &lt;c:when test=&quot;\${score &gt;= 80}&quot;&gt;</span>
<span class="line">        &lt;p&gt;良好&lt;/p&gt;</span>
<span class="line">    &lt;/c:when&gt;</span>
<span class="line">    &lt;c:otherwise&gt;</span>
<span class="line">        &lt;p&gt;及格&lt;/p&gt;</span>
<span class="line">    &lt;/c:otherwise&gt;</span>
<span class="line">&lt;/c:choose&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-4-c-foreach-循环" tabindex="-1"><a class="header-anchor" href="#_5-2-4-c-foreach-循环"><span>5.2.4 c:forEach 循环</span></a></h4><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;!-- 简单循环 --&gt;</span>
<span class="line">&lt;c:forEach begin=&quot;1&quot; end=&quot;10&quot; var=&quot;i&quot;&gt;</span>
<span class="line">    &lt;p&gt;\${i}&lt;/p&gt;</span>
<span class="line">&lt;/c:forEach&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 遍历集合 --&gt;</span>
<span class="line">&lt;%</span>
<span class="line">    List&lt;String&gt; list = Arrays.asList(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;);</span>
<span class="line">    request.setAttribute(&quot;list&quot;, list);</span>
<span class="line">%&gt;</span>
<span class="line"></span>
<span class="line">&lt;c:forEach items=&quot;\${list}&quot; var=&quot;item&quot; varStatus=&quot;status&quot;&gt;</span>
<span class="line">    &lt;p&gt;索引：\${status.index}，值：\${item}&lt;/p&gt;</span>
<span class="line">&lt;/c:forEach&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- 遍历Map --&gt;</span>
<span class="line">&lt;c:forEach items=&quot;\${map}&quot; var=&quot;entry&quot;&gt;</span>
<span class="line">    &lt;p&gt;Key: \${entry.key}, Value: \${entry.value}&lt;/p&gt;</span>
<span class="line">&lt;/c:forEach&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="六、jsp与servlet协作" tabindex="-1"><a class="header-anchor" href="#六、jsp与servlet协作"><span>六、JSP与Servlet协作</span></a></h2><h3 id="_6-1-mvc模式" tabindex="-1"><a class="header-anchor" href="#_6-1-mvc模式"><span>6.1 MVC模式</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Model（模型） - 业务逻辑和数据</span>
<span class="line">View（视图） - JSP 页面</span>
<span class="line">Controller（控制器） - Servlet</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>流程：</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">浏览器 → Servlet（处理请求，调用Service） → JSP（展示数据）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_6-2-实战示例-用户列表" tabindex="-1"><a class="header-anchor" href="#_6-2-实战示例-用户列表"><span>6.2 实战示例：用户列表</span></a></h3><p><strong>UserServlet.java：</strong></p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@WebServlet</span><span class="token punctuation">(</span><span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> </span>
<span class="line">            <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment">// 模拟查询用户列表</span></span>
<span class="line">        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span> users <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        users<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        users<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        users<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment">// 存入 request 域</span></span>
<span class="line">        req<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">,</span> users<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment">// 转发到 JSP</span></span>
<span class="line">        req<span class="token punctuation">.</span><span class="token function">getRequestDispatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/userList.jsp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forward</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> resp<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>userList.jsp：</strong></p><div class="language-jsp line-numbers-mode" data-highlighter="prismjs" data-ext="jsp" data-title="jsp"><pre><code><span class="line">&lt;%@ page contentType=&quot;text/html;charset=UTF-8&quot; %&gt;</span>
<span class="line">&lt;%@ taglib uri=&quot;http://java.sun.com/jsp/jstl/core&quot; prefix=&quot;c&quot; %&gt;</span>
<span class="line">&lt;!DOCTYPE html&gt;</span>
<span class="line">&lt;html&gt;</span>
<span class="line">&lt;head&gt;</span>
<span class="line">    &lt;title&gt;用户列表&lt;/title&gt;</span>
<span class="line">&lt;/head&gt;</span>
<span class="line">&lt;body&gt;</span>
<span class="line">    &lt;h1&gt;用户列表&lt;/h1&gt;</span>
<span class="line">    &lt;table border=&quot;1&quot;&gt;</span>
<span class="line">        &lt;tr&gt;</span>
<span class="line">            &lt;th&gt;ID&lt;/th&gt;</span>
<span class="line">            &lt;th&gt;姓名&lt;/th&gt;</span>
<span class="line">            &lt;th&gt;年龄&lt;/th&gt;</span>
<span class="line">        &lt;/tr&gt;</span>
<span class="line">        &lt;c:forEach items=&quot;\${users}&quot; var=&quot;user&quot;&gt;</span>
<span class="line">            &lt;tr&gt;</span>
<span class="line">                &lt;td&gt;\${user.id}&lt;/td&gt;</span>
<span class="line">                &lt;td&gt;\${user.name}&lt;/td&gt;</span>
<span class="line">                &lt;td&gt;\${user.age}&lt;/td&gt;</span>
<span class="line">            &lt;/tr&gt;</span>
<span class="line">        &lt;/c:forEach&gt;</span>
<span class="line">    &lt;/table&gt;</span>
<span class="line">&lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="七、总结" tabindex="-1"><a class="header-anchor" href="#七、总结"><span>七、总结</span></a></h2><p>✅ <strong>本章学习内容：</strong></p><ul><li>JSP 基础语法</li><li>JSP 九大内置对象</li><li>EL 表达式</li><li>JSTL 标签库</li><li>JSP 与 Servlet 协作</li></ul><p>✅ <strong>核心要点：</strong></p><ul><li>JSP 本质是 Servlet</li><li>掌握九大内置对象的使用</li><li>使用 EL 和 JSTL 简化开发</li><li>遵循 MVC 模式</li></ul><p><strong>下一章预告：</strong> 我们将学习 Session 和 Cookie。</p>`,84)])])}const d=n(t,[["render",i]]),r=JSON.parse('{"path":"/tutorials/java-backend/servlet/3.JSPjishu.html","title":"JSP技术","lang":"zh-CN","frontmatter":{"title":"JSP技术"},"headers":[{"level":2,"title":"一、JSP概述","slug":"一、jsp概述","link":"#一、jsp概述","children":[{"level":3,"title":"1.1 什么是JSP？","slug":"_1-1-什么是jsp","link":"#_1-1-什么是jsp","children":[]},{"level":3,"title":"1.2 JSP vs Servlet","slug":"_1-2-jsp-vs-servlet","link":"#_1-2-jsp-vs-servlet","children":[]}]},{"level":2,"title":"二、JSP基础语法","slug":"二、jsp基础语法","link":"#二、jsp基础语法","children":[{"level":3,"title":"2.1 JSP 脚本","slug":"_2-1-jsp-脚本","link":"#_2-1-jsp-脚本","children":[]},{"level":3,"title":"2.2 JSP 指令","slug":"_2-2-jsp-指令","link":"#_2-2-jsp-指令","children":[]},{"level":3,"title":"2.3 JSP 注释","slug":"_2-3-jsp-注释","link":"#_2-3-jsp-注释","children":[]}]},{"level":2,"title":"三、JSP九大内置对象","slug":"三、jsp九大内置对象","link":"#三、jsp九大内置对象","children":[{"level":3,"title":"3.1 内置对象列表","slug":"_3-1-内置对象列表","link":"#_3-1-内置对象列表","children":[]},{"level":3,"title":"3.2 作用域对象","slug":"_3-2-作用域对象","link":"#_3-2-作用域对象","children":[]},{"level":3,"title":"3.3 常用内置对象","slug":"_3-3-常用内置对象","link":"#_3-3-常用内置对象","children":[]}]},{"level":2,"title":"四、EL表达式","slug":"四、el表达式","link":"#四、el表达式","children":[{"level":3,"title":"4.1 EL基础","slug":"_4-1-el基础","link":"#_4-1-el基础","children":[]},{"level":3,"title":"4.2 EL 获取数据","slug":"_4-2-el-获取数据","link":"#_4-2-el-获取数据","children":[]},{"level":3,"title":"4.3 EL 运算","slug":"_4-3-el-运算","link":"#_4-3-el-运算","children":[]},{"level":3,"title":"4.4 EL 隐式对象","slug":"_4-4-el-隐式对象","link":"#_4-4-el-隐式对象","children":[]}]},{"level":2,"title":"五、JSTL标签库","slug":"五、jstl标签库","link":"#五、jstl标签库","children":[{"level":3,"title":"5.1 导入JSTL","slug":"_5-1-导入jstl","link":"#_5-1-导入jstl","children":[]},{"level":3,"title":"5.2 常用标签","slug":"_5-2-常用标签","link":"#_5-2-常用标签","children":[]}]},{"level":2,"title":"六、JSP与Servlet协作","slug":"六、jsp与servlet协作","link":"#六、jsp与servlet协作","children":[{"level":3,"title":"6.1 MVC模式","slug":"_6-1-mvc模式","link":"#_6-1-mvc模式","children":[]},{"level":3,"title":"6.2 实战示例：用户列表","slug":"_6-2-实战示例-用户列表","link":"#_6-2-实战示例-用户列表","children":[]}]},{"level":2,"title":"七、总结","slug":"七、总结","link":"#七、总结","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/servlet/3.JSP技术.md"}');export{d as comp,r as data};
