import{_ as n,c as a,d as e,o as p}from"./app-CjJuDk73.js";const l={};function t(c,s){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="数据库的安全管理" tabindex="-1"><a class="header-anchor" href="#数据库的安全管理"><span>数据库的安全管理</span></a></h1><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token comment">#删除角色student。</span></span>
<span class="line"><span class="token comment">#drop role &#39;student&#39;@&#39;localhost&#39;</span></span>
<span class="line"><span class="token comment">#删除用户账号st_01、st_02。</span></span>
<span class="line"><span class="token comment">#drop USER st_01@localhost,st_02@localhost;</span></span>
<span class="line"><span class="token comment">#角色和账户不同哦</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#1. 在本地主机创建用户账号st_01，密码为123456。</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> st_01<span class="token variable">@localhost</span> IDENTIFIED <span class="token keyword">BY</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#2. 查看MySQL下所有用户账号列表。</span></span>
<span class="line"><span class="token keyword">USE</span> mysql<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">USER</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#3. 修改用户账号st_01的密码为111111。</span></span>
<span class="line"><span class="token keyword">SET</span> PASSWORD <span class="token keyword">FOR</span> st_01<span class="token variable">@localhost</span> <span class="token operator">=</span><span class="token string">&#39;111111&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#4. 使用studentsdb数据库中的student_info表。</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（1）授予用户账号st_01查询表的权限。</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span> <span class="token keyword">ON</span> <span class="token keyword">TABLE</span> studentsdb<span class="token punctuation">.</span>student_info <span class="token keyword">TO</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（2）授予用户账号st_01更新家庭住址列的权限。</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">UPDATE</span><span class="token punctuation">(</span>家庭住址<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">TABLE</span> studentsdb<span class="token punctuation">.</span>student_info <span class="token keyword">TO</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（3）授予用户账号st_01修改表结构的权限。</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALTER</span> <span class="token keyword">ON</span> <span class="token keyword">TABLE</span> studentsdb<span class="token punctuation">.</span>student_info <span class="token keyword">TO</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#5. 使用studentsdb数据库中的student_info表。</span></span>
<span class="line"><span class="token comment">#（1）创建存储过程cn_proc，统计student_info表中的学生人数。</span></span>
<span class="line"><span class="token keyword">DELIMITER</span>@@</span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> studentsdb<span class="token punctuation">.</span>cn_proc<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">BEGIN</span></span>
<span class="line"><span class="token keyword">DECLARE</span> n <span class="token keyword">INT</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">INTO</span> n <span class="token keyword">FROM</span> studentsdb<span class="token punctuation">.</span>student_info<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> n<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">END</span>@@</span>
<span class="line"></span>
<span class="line"><span class="token comment">#（2）授予用户账号st_01调用cn_proc存储过程的权限。</span></span>
<span class="line"><span class="token keyword">DELIMITER</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">EXECUTE</span> <span class="token keyword">on</span> <span class="token keyword">PROCEDURE</span> studentsdb<span class="token punctuation">.</span>cn_proc <span class="token keyword">TO</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（3）以用户账号st_01连接MySQL服务器，调用cn_proc存储过程查看学生人数。</span></span>
<span class="line"><span class="token keyword">CALL</span> studentsdb<span class="token punctuation">.</span>cn_proc<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#6. 使用studentsdb数据库。</span></span>
<span class="line"><span class="token comment">#（1）授予用户账号st_01在studentsdb数据库上创建表、删除表、查询数据、插入数据的权限。</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">CREATE</span><span class="token punctuation">,</span><span class="token keyword">SELECT</span><span class="token punctuation">,</span><span class="token keyword">INSERT</span><span class="token punctuation">,</span><span class="token keyword">DROP</span> <span class="token keyword">ON</span> studentsdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（2）以用户账号st_01连接MySQL服务器，创建新表st_copy，与表student_info完全相同。</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> studentsdb<span class="token punctuation">.</span>st_copy <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> studentsdb<span class="token punctuation">.</span>student_info<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（3）以用户账号st_01连接MySQL服务器，删除表st_copy。</span></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> studentsdb<span class="token punctuation">.</span>st_copy<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#7. 撤消用户账号st_01在studentsdb数据库上创建表、删除表、查询数据、插入数据的权限。</span></span>
<span class="line"><span class="token keyword">revoke</span> <span class="token keyword">CREATE</span><span class="token punctuation">,</span><span class="token keyword">SELECT</span><span class="token punctuation">,</span><span class="token keyword">INSERT</span><span class="token punctuation">,</span><span class="token keyword">drop</span> <span class="token keyword">on</span> studentsdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#8. 撤消用户账号st_01所有权限.</span></span>
<span class="line"><span class="token keyword">REVOKE</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span><span class="token punctuation">,</span><span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span> <span class="token keyword">FROM</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#9. 使用studentsdb数据库中的student_info表。</span></span>
<span class="line"><span class="token comment">#（1）创建本地机角色student。</span></span>
<span class="line"><span class="token keyword">CREATE</span> role <span class="token string">&#39;student&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（2）授予角色student查询student_info表的权限。</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span> <span class="token keyword">ON</span> <span class="token keyword">TABLE</span> studentsdb<span class="token punctuation">.</span>student_info <span class="token keyword">TO</span> <span class="token string">&#39;student&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（3）创建本地机用户账号st_02，密码为123。</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> st_02<span class="token variable">@localhost</span> IDENTIFIED <span class="token keyword">by</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（4）授予用户账号st_02角色student的权限。</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token string">&#39;student&#39;</span><span class="token variable">@&#39;localhost&#39;</span> <span class="token keyword">TO</span> st_02<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> activate_all_roles_on_login <span class="token operator">=</span> <span class="token keyword">ON</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（5）以用户账号st_02连接MySQL服务器，查看student_info表信息。</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> studentsdb<span class="token punctuation">.</span>student_info<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（6）撤消用户账号st_02角色student的权限。</span></span>
<span class="line"><span class="token keyword">revoke</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token punctuation">,</span><span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span> <span class="token keyword">FROM</span> <span class="token string">&#39;student&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（7）删除角色student。</span></span>
<span class="line"><span class="token keyword">drop</span> role <span class="token string">&#39;student&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#（10）删除用户账号st_01、st_02。</span></span>
<span class="line"><span class="token keyword">drop</span> <span class="token keyword">USER</span> st_01<span class="token variable">@localhost</span><span class="token punctuation">,</span>st_02<span class="token variable">@localhost</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)])])}const i=n(l,[["render",t]]),d=JSON.parse('{"path":"/tutorials/java-backend/mysql/di04zhang-shijianlianxi/6.shujukudeanquanguanli.html","title":"数据库的安全管理","lang":"zh-CN","frontmatter":{"title":"数据库的安全管理"},"headers":[],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/mysql/第04章-实践练习/6.数据库的安全管理.md"}');export{i as comp,d as data};
