import{_ as n,c as a,d as e,o as p}from"./app-BkB2pMz5.js";const l={};function t(o,s){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="数据库的备份与恢复" tabindex="-1"><a class="header-anchor" href="#数据库的备份与恢复"><span>数据库的备份与恢复</span></a></h1><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line">MySQL服务器：Navicat</span>
<span class="line"><span class="token comment">#1. 使用mysqldump命令备份数据库studentsdb的所有表，存于D:\\下，文件名为all_tables.sql。</span></span>
<span class="line">先转到bin文件夹 cd 路径</span>
<span class="line">在CMD命令提示符窗口中执行命令。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqldump <span class="token operator">-</span>u root <span class="token operator">-</span>h localhost <span class="token operator">-</span>p studentsdb<span class="token operator">&gt;</span>d:\\all_tables<span class="token punctuation">.</span><span class="token keyword">sql</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment">#2. 在MySQL服务器上创建数据库student1，使用mysql命令将备份文件all_tables.sql恢复到数据库student1中。</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> student1<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">然后在CMD命令提示符窗口中执行命令。</span>
<span class="line">C: \\<span class="token operator">&gt;</span>mysql <span class="token operator">-</span>u root <span class="token operator">-</span>p student1<span class="token operator">&lt;</span>d:\\all_tables<span class="token punctuation">.</span><span class="token keyword">sql</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#3. 使用mysqldump命令备份数据库studentsdb的所有表，存于D:\\下，文件名为s_c.sql。</span></span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqldump <span class="token operator">-</span>u root <span class="token operator">-</span>h localhost <span class="token operator">-</span>p studentsdb student_info curriculum<span class="token operator">&gt;</span>d:\\s_c<span class="token punctuation">.</span><span class="token keyword">sql</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#4. 在MySQL服务器上创建数据库student2，使用mysql命令将备份文件s_c.sql恢复到数据库student2中。</span></span>
<span class="line">在MySQL服务器上创建数据库student2</span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> student2<span class="token punctuation">;</span></span>
<span class="line">然后在CMD命令提示符窗口中执行命令。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysql <span class="token operator">-</span>u root <span class="token operator">-</span>p student2<span class="token operator">&lt;</span>d:\\s_c<span class="token punctuation">.</span><span class="token keyword">sql</span></span>
<span class="line"></span>
<span class="line">在使用<span class="token keyword">SELECT</span> …<span class="token keyword">INTO</span> <span class="token keyword">OUTFILE</span>语句时，目标文件的路径只能是MySQL的secure_file_priv参数所指定的位置，可通过以下语句获取。</span>
<span class="line"><span class="token keyword">SELECT</span> @<span class="token variable">@secure_file_priv</span><span class="token punctuation">;</span>没有就查资料设置一下</span>
<span class="line"><span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;secure%&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#5. 使用mysqldump命令将 studentsdb数据库中的grade表中的记录导出到文本文件。</span></span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqldump <span class="token operator">-</span>u root <span class="token operator">-</span>p <span class="token operator">-</span>T <span class="token string">&quot;C:\\Users\\zjj\\Desktop\\数据库原理及应用\\环境\\mysql-8.0.23-winx64\\Uploads&quot;</span> studentsdb grade <span class="token comment">--lines-terminated-by=\\r\\n </span></span>
<span class="line"><span class="token comment">#路径的最后一个\\不能要</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#6. 删除数据库student1的grade表中全部记录。</span></span>
<span class="line">   使用mysqlimport命令将grade<span class="token punctuation">.</span>txt文件中的数据导入到student1的grade表中。</span>
<span class="line"><span class="token keyword">USE</span> student1<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SET</span> SQL_SAFE_UPDATES<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> grade<span class="token punctuation">;</span></span>
<span class="line">然后在CMD命令提示符窗口中执行命令。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqlimport <span class="token operator">-</span>u root <span class="token operator">-</span>p student1 <span class="token string">&quot;C:\\Users\\zjj\\Desktop\\数据库原理及应用\\环境\\mysql-8.0.23-winx64\\Uploads\\grade.txt&quot;</span> <span class="token comment">--lines-terminated-by=\\r\\n</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#7. 使用SELECT…INTO OUTFILE语句备份studentsdb数据库中的curriculum表的数据到文本文件c.txt。要求字段之间用“｜”隔开，字符型数据用双引号括起来。</span></span>
<span class="line"><span class="token keyword">USE</span> studentsdb<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> curriculum</span>
<span class="line"><span class="token keyword">INTO</span> <span class="token keyword">OUTFILE</span> <span class="token string">&#39;C:\\Users\\zjj\\Desktop\\数据库原理及应用\\环境\\mysql-8.0.23-winx64\\Uploads\\c.txt&#39;</span> <span class="token keyword">FIELDS</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token string">&#39;|&#39;</span><span class="token keyword">OPTIONALLY</span> <span class="token keyword">ENCLOSED</span> <span class="token keyword">BY</span><span class="token string">&#39;&quot;&#39;</span></span>
<span class="line"><span class="token keyword">LINES</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span><span class="token string">&#39;\\r\\n&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#8. 删除数据库student1的curriculum表中全部记录。</span></span>
<span class="line">   使用<span class="token keyword">LOAD</span> <span class="token keyword">DATA</span> <span class="token keyword">INFILE</span>语句将c<span class="token punctuation">.</span>txt文件中的数据导入到student1的curriculum表中。</span>
<span class="line">在MySQL服务器上执行语句。</span>
<span class="line"><span class="token keyword">USE</span> student1<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SET</span> SQL_SAFE_UPDATES<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> curriculum<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">LOAD</span> <span class="token keyword">DATA</span> <span class="token keyword">INFILE</span> <span class="token string">&#39;C:\\Users\\zjj\\Desktop\\数据库原理及应用\\环境\\mysql-8.0.23-winx64\\Uploads\\c.txt&#39;</span> <span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> student1<span class="token punctuation">.</span>curriculum</span>
<span class="line"><span class="token keyword">FIELDS</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token string">&#39;|&#39;</span><span class="token keyword">OPTIONALLY</span> <span class="token keyword">ENCLOSED</span> <span class="token keyword">BY</span><span class="token string">&#39;&quot;&#39;</span> <span class="token keyword">LINES</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span><span class="token string">&#39;\\r\\n&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#9.使用二进制日志恢复数据库。</span></span>
<span class="line">（<span class="token number">1</span>）完全备份数据库。使用mysqldump命令备份所有数据库到D:\\的all_db<span class="token punctuation">.</span><span class="token keyword">sql</span>。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqldump <span class="token operator">-</span>u root <span class="token operator">-</span>h localhost <span class="token operator">-</span>p <span class="token comment">--single-transaction --flush-logs --master-data=2 --all-databases&gt;d:\\all_db.sql</span></span>
<span class="line"></span>
<span class="line">（<span class="token number">2</span>）删除studentsdb数据库student_info表的所有记录。</span>
<span class="line">在MySQL服务器上执行语句。</span>
<span class="line"><span class="token keyword">USE</span> studentsdb<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SET</span> SQL_SAFE_UPDATES<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> student_info<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">（<span class="token number">3</span>）使用mysqladmin进行增量备份。</span>
<span class="line">在CMD命令提示符窗口中执行命令。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqladmin <span class="token operator">-</span>u root <span class="token operator">-</span>h localhost <span class="token operator">-</span>p flush<span class="token operator">-</span>logs </span>
<span class="line"></span>
<span class="line">（<span class="token number">4</span>）使用mysql命令恢复all_db<span class="token punctuation">.</span><span class="token keyword">sql</span>文件的完全备份。</span>
<span class="line">在CMD命令提示符窗口中执行命令。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysql <span class="token operator">-</span>u root <span class="token operator">-</span>p<span class="token operator">&lt;</span>d:\\all_db<span class="token punctuation">.</span><span class="token keyword">sql</span></span>
<span class="line"></span>
<span class="line">（<span class="token number">5</span>）使用mysqlbinlog命令恢复增量备份。</span>
<span class="line"><span class="token comment">-- 查看当前数据库是否开启binlog</span></span>
<span class="line"><span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%log_bin%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- 查看当前数据库binary log的位置</span></span>
<span class="line"><span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>     </span>
<span class="line"><span class="token comment">-- 查看binlog日志文件有哪些</span></span>
<span class="line"><span class="token keyword">show</span> <span class="token keyword">binary</span> logs<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- 查看具体日志文件</span></span>
<span class="line"><span class="token keyword">show</span> binlog events <span class="token operator">in</span> <span class="token string">&#39;binlog.000001&#39;</span><span class="token punctuation">;</span></span>
<span class="line">在CMD命令提示符窗口中执行命令。</span>
<span class="line">C:\\<span class="token operator">&gt;</span>mysqlbinlog <span class="token string">&quot;C:\\Users\\zjj\\Desktop\\数据库原理及应用\\环境\\mysql-8.0.23-winx64\\data\\binlog.000001&quot;</span> <span class="token operator">|</span> mysql <span class="token operator">-</span>u root <span class="token operator">-</span>p</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)])])}const c=n(l,[["render",t]]),r=JSON.parse('{"path":"/tutorials/java-backend/mysql/di04zhang-shijianlianxi/7.shujukudebeifenyuhuifu.html","title":"数据库的备份与恢复","lang":"zh-CN","frontmatter":{"title":"数据库的备份与恢复"},"headers":[],"git":{"createdTime":1765629206000,"updatedTime":1765629206000,"contributors":[{"name":"CambridgeFoldingKnife","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"tutorials/java-backend/mysql/第04章-实践练习/7.数据库的备份与恢复.md"}');export{c as comp,r as data};
