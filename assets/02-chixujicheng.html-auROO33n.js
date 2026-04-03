import{_ as p,c,d as o,e as s,f as a,b as e,w as d,r as l,o as r}from"./app-Y56IYxhu.js";const u={},v={href:"https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-command-line-0000001821000581-V5",target:"_blank",rel:"noopener noreferrer"};function m(k,n){const i=l("ExternalLinkIcon"),t=l("RouteLink");return r(),c("div",null,[n[4]||(n[4]=o(`<h1 id="持续集成" tabindex="-1"><a class="header-anchor" href="#持续集成"><span>持续集成</span></a></h1><blockquote><p>搭建CI/CD流程</p></blockquote><h2 id="🔄-ci-cd流程" tabindex="-1"><a class="header-anchor" href="#🔄-ci-cd流程"><span>🔄 CI/CD流程</span></a></h2><h3 id="构建流程" tabindex="-1"><a class="header-anchor" href="#构建流程"><span>构建流程</span></a></h3><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># .gitlab-ci.yml</span></span>
<span class="line"><span class="token key atrule">stages</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> build</span>
<span class="line">  <span class="token punctuation">-</span> test</span>
<span class="line">  <span class="token punctuation">-</span> deploy</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> npm install</span>
<span class="line">    <span class="token punctuation">-</span> hvigorw assembleHap</span>
<span class="line">  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> build/outputs/</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">test</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> npm run test</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">stage</span><span class="token punctuation">:</span> deploy</span>
<span class="line">  <span class="token key atrule">script</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> ./deploy.sh</span>
<span class="line">  <span class="token key atrule">only</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token punctuation">-</span> master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🚀-自动化构建" tabindex="-1"><a class="header-anchor" href="#🚀-自动化构建"><span>🚀 自动化构建</span></a></h2><h3 id="deveco-studio命令行构建" tabindex="-1"><a class="header-anchor" href="#deveco-studio命令行构建"><span>DevEco Studio命令行构建</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 构建HAP</span></span>
<span class="line">hvigorw assembleHap</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理构建</span></span>
<span class="line">hvigorw clean</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行测试</span></span>
<span class="line">hvigorw <span class="token builtin class-name">test</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="📚-参考资源" tabindex="-1"><a class="header-anchor" href="#📚-参考资源"><span>📚 参考资源</span></a></h2>`,9)),s("ul",null,[s("li",null,[s("a",v,[n[0]||(n[0]=a("持续集成实践",-1)),e(i)])])]),n[5]||(n[5]=s("hr",null,null,-1)),s("p",null,[n[2]||(n[2]=s("strong",null,"下一节",-1)),n[3]||(n[3]=a(" → ",-1)),e(t,{to:"/tutorials/harmonyos-dev/16-testing-devops/03-%E5%BA%94%E7%94%A8%E5%8F%91%E5%B8%83.html"},{default:d(()=>[...n[1]||(n[1]=[a("应用发布",-1)])]),_:1})])])}const b=p(u,[["render",m]]),g=JSON.parse('{"path":"/tutorials/harmonyos-dev/16-testing-devops/02-chixujicheng.html","title":"持续集成","lang":"zh-CN","frontmatter":{"title":"持续集成","date":"2025-01-22T00:00:00.000Z"},"headers":[{"level":2,"title":"🔄 CI/CD流程","slug":"🔄-ci-cd流程","link":"#🔄-ci-cd流程","children":[{"level":3,"title":"构建流程","slug":"构建流程","link":"#构建流程","children":[]}]},{"level":2,"title":"🚀 自动化构建","slug":"🚀-自动化构建","link":"#🚀-自动化构建","children":[{"level":3,"title":"DevEco Studio命令行构建","slug":"deveco-studio命令行构建","link":"#deveco-studio命令行构建","children":[]}]},{"level":2,"title":"📚 参考资源","slug":"📚-参考资源","link":"#📚-参考资源","children":[]}],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/harmonyos-dev/16-testing-devops/02-持续集成.md"}');export{b as comp,g as data};
