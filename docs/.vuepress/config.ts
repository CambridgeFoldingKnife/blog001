import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { recoTheme } from 'vuepress-theme-reco'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch' // 已改用主题内置 Algolia

/**
 * 今日八股数据插件
 * 构建时扫描 docs/bagu/posts/ 下的文章，生成列表写入 .temp/bagu/posts.js，
 * 供 BaguIndex.vue 瀑布流组件导入。新增文章后重新构建即可自动收录。
 */
const baguPostsPlugin = () => ({
    name: 'bagu-posts-data',
    onInitialized(app: any) {
        const pad = (n: number, len = 2) => String(n).padStart(len, '0')
        const dateValue = (d: any) => {
            const t = new Date(d).getTime()
            return Number.isNaN(t) ? 0 : t
        }
        const dateLabel = (d: any) => {
            if (!d) return ''
            if (typeof d === 'string') return d.slice(0, 10)
            const t = new Date(d)
            if (Number.isNaN(t.getTime())) return ''
            return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
        }
        const posts = app.pages
            .filter((p: any) => {
                const fm = p.frontmatter || {}
                return (p.path || '').startsWith('/bagu/posts/') && !!fm.title && fm.publish !== false
            })
            .sort((a: any, b: any) => dateValue(a.frontmatter.date) - dateValue(b.frontmatter.date))
            .map((p: any, index: number) => {
                const fm = p.frontmatter || {}
                return {
                    path: p.path,
                    title: p.title || fm.title,
                    desc: fm.description || '',
                    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : fm.tags ? [String(fm.tags)] : [],
                    date: dateLabel(fm.date),
                    num: pad(index + 1, 3),
                }
            })
        app.writeTemp('bagu/posts.js', `export default ${JSON.stringify(posts)}`)
    },
})

export default defineUserConfig({
    lang: 'zh-CN',
    title: '剑桥折刀的博客',
    description: '分享技术、记录生活 | Cambridge Folding Knife\'s Blog',

    // 根据部署环境设置 base 路径
    // 本地开发：使用根路径 /
    // Vercel: 使用根路径 /
    // GitHub Pages (自定义域名 camknife.me): 使用根路径 / ✅ 当前配置
    // GitHub Pages (默认域名): 使用 /blog001/
    base: '/',

    // 使用 Vite 打包工具
    bundler: viteBundler(),

    // 插件：生成今日八股列表数据
    plugins: [baguPostsPlugin()],

    // Markdown 配置 - 启用 HTML 支持
    markdown: {
        html: true,
    },
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'keywords', content: '剑桥折刀,Cambridge Folding Knife,博客,技术博客,Java,Python,前端开发' }],
        ['meta', { name: 'author', content: '剑桥折刀' }],
        ['meta', { name: 'algolia-site-verification', content: '965773E690A426DF' }],
        ['link', { rel: 'icon', href: 'favicon.png' }],

        // 自定义搜索框 + 导航栏防重叠样式
        // 注意：必须放在 head 里。docs/.vuepress/styles/index.scss 与 palette.scss
        // 当前不会被加载（主题 palette 预设是 css，只认 styles/index.css），
        // 写在那里对页面没有任何作用。
        ['style', {}, `
            /* 搜索框宽度 */
            body .navbar-container .search-box,
            body .search-box {
                width: 200px !important;
                min-width: 200px !important;
                max-width: 200px !important;
            }
            body .navbar-container .search-box input,
            body .search-box input {
                width: 100% !important;
                padding-right: 66px !important;
            }

            /* 导航栏防重叠（结构性方案）
               主题把 .navbar-links-wrapper 设为 absolute + right-4 + white-space:nowrap，
               右边缘被钉死，内容一旦超宽就只能向左溢出压住站点标题，
               而 max-width 对 absolute + nowrap 的内容没有约束力。
               这里把它改回正常文档流（position:relative 仍是定位祖先，下拉菜单定位不变），
               于是 flex 会把空间缺口分配给可收缩的搜索框，标题永远不会被覆盖。 */
            @media (min-width: 768px) {
                body .navbar-container .navbar-inner > .site-brand {
                    flex: 0 0 auto;
                }
                body .navbar-container .navbar-inner .navbar-links-wrapper {
                    position: relative !important;
                    right: 0 !important;
                    top: 0 !important;
                    margin-left: auto;
                    flex: 0 1 auto;
                    min-width: 0;
                    max-width: 100%;
                }
                body .navbar-container .navbar-links-wrapper .navbar-links {
                    flex: 0 0 auto;
                }
                /* 菜单项间距由主题的 24px 收紧到 12px：
                   7 个菜单项共节省约 108px，正好补上搜索框的缺口，
                   使搜索框在 ≥1360px 的导航栏下仍保持完整 200px 宽度 */
                body .navbar-container .navbar-links-wrapper .navbar-links__item {
                    margin-left: 6px !important;
                    margin-right: 6px !important;
                }
                body .navbar-container .navbar-links-wrapper > div:first-child {
                    display: contents !important;
                }
                body .navbar-container .navbar-links-wrapper .search-box {
                    flex: 0 1 200px;
                    width: auto !important;
                    min-width: 0 !important;
                    max-width: 200px !important;
                }
            }

            /* 移动端：收窄搜索框并隐藏站点标题文字，只保留 logo */
            @media (max-width: 767px) {
                body .navbar-container .search-box,
                body .search-box {
                    width: 160px !important;
                    min-width: 160px !important;
                    max-width: 160px !important;
                }
                body .navbar-container .site-name.can-hide {
                    display: none !important;
                }
            }
        `],

        // Umami 统计分析
        ['script', {
            defer: true,
            src: 'https://cloud.umami.is/script.js',
            'data-website-id': '5842114b-aed4-4e47-b3a6-777e091ef357'
        }],
    ],

    theme: recoTheme({
        // 主题样式
        style: '@vuepress-reco/style-default',

        // Logo
        logo: '/logo.png',

        // 作者信息
  author: '剑桥折刀',
        authorAvatar: '/avatar.png',

        // 最后更新时间
        lastUpdatedText: '最后更新时间',

        // 自动设置分类
        autoSetBlogCategories: true,

        // 自动设置系列
        autoSetSeries: true,

        // 移动端优化
        catalogTitle: '目录',

        // 导航栏配置
        navbar: [
            { text: '首页', link: '/', icon: 'IconHome' },
            { text: '今日八股（秋招日记）', link: '/bagu/', icon: 'IconBagu' },
            { text: '教程中心', link: '/tutorials/', icon: 'IconBook' },
            { text: '技术文章', link: '/posts.html', icon: 'IconArticle' },
            { text: '友情链接', link: '/friendship/', icon: 'IconGift' },
            { text: '日常随笔', link: '/diary/', icon: 'IconPen' },
            { text: '关于', link: '/about/', icon: 'IconUser' },
        ],

        // 系列配置 - 禁用所有侧边栏
        series: {
            // Java后端
            '/tutorials/java-backend/java/': [],
            '/tutorials/java-backend/mysql/': [],
            '/tutorials/java-backend/redis/': [],
            '/tutorials/java-backend/maven/': [],
            '/tutorials/java-backend/mybatis/': [],
            '/tutorials/java-backend/mybatisPlus/': [],
            '/tutorials/java-backend/spring/': [],
            '/tutorials/java-backend/springboot/': [],
            '/tutorials/java-backend/springmvc/': [],
            '/tutorials/java-backend/springcloud/': [],
            '/tutorials/java-backend/elasticsearch/': [],
            '/tutorials/java-backend/rabbitmq/': [],
            '/tutorials/java-backend/jdbc/': [],
            '/tutorials/java-backend/servlet/': [],

            // Python人工智能
            '/tutorials/python-ai/python/': [],
            '/tutorials/python-ai/numpy/': [],
            '/tutorials/python-ai/pandas/': [],
            '/tutorials/python-ai/matplotlib/': [],
            '/tutorials/python-ai/scikitlearn/': [],
            '/tutorials/python-ai/tensorflow/': [],
            '/tutorials/python-ai/pytorch/': [],
            '/tutorials/python-ai/nlp/': [],
            '/tutorials/python-ai/cv/': [],

            // Java 转大模型开发
            '/tutorials/java-to-llm/01-prerequisites/': [],
            '/tutorials/java-to-llm/02-llm-fundamentals/': [],
            '/tutorials/java-to-llm/03-prompt-engineering/': [],
            '/tutorials/java-to-llm/04-api-integration/': [],
            '/tutorials/java-to-llm/05-spring-ai/': [],
            '/tutorials/java-to-llm/06-vector-databases/': [],
            '/tutorials/java-to-llm/07-rag-applications/': [],
            '/tutorials/java-to-llm/08-agent-development/': [],
            '/tutorials/java-to-llm/09-fine-tuning/': [],
            '/tutorials/java-to-llm/10-enterprise-practices/': [],
            '/tutorials/java-to-llm/11-projects/': [],

            // 计算机基础
            '/tutorials/computer-basics/network/': [],
            '/tutorials/computer-basics/operating-system/': [],
            '/tutorials/computer-basics/computer-organization/': [],
            '/tutorials/computer-basics/data-structures/': [],

            // 开发工具
            '/tutorials/development-tools/git/': [],

            // DevOps
            '/tutorials/devops-engineer/docker/': [],

            // HarmonyOS 开发
            '/tutorials/harmonyos-dev/': [],
            '/tutorials/harmonyos-dev/01-harmonyos-next-intro/': [],
            '/tutorials/harmonyos-dev/02-arkts-advanced/': [],
            '/tutorials/harmonyos-dev/03-arkui-next/': [],
            '/tutorials/harmonyos-dev/04-state-management-next/': [],
            '/tutorials/harmonyos-dev/05-ability-framework/': [],
            '/tutorials/harmonyos-dev/06-navigation-router/': [],
            '/tutorials/harmonyos-dev/07-data-management/': [],
            '/tutorials/harmonyos-dev/08-network-connect/': [],
            '/tutorials/harmonyos-dev/09-ai-native/': [],
            '/tutorials/harmonyos-dev/10-distributed-next/': [],
            '/tutorials/harmonyos-dev/11-graphics-animation/': [],
            '/tutorials/harmonyos-dev/12-multimedia-next/': [],
            '/tutorials/harmonyos-dev/13-service-card-next/': [],
            '/tutorials/harmonyos-dev/14-security-privacy/': [],
            '/tutorials/harmonyos-dev/15-performance-optimization/': [],
            '/tutorials/harmonyos-dev/16-testing-devops/': [],
            '/tutorials/harmonyos-dev/17-harmony-ecology/': [],

            // 数据库
            '/tutorials/database/mysql/': [],
            '/tutorials/database/redis/': [],

            // 今日八股（记录秋招八股学习日志）
            '/bagu/': []
        },

        // Algolia 搜索配置（已禁用，使用主题内置搜索）
        // algolia: {
        //     appId: 'MLKOH1MKDT',
        //     apiKey: '5af2979d2d290ce4e9247d7f89549455',
        //     indexName: '懿轩的博客_pages',
        //     // 可选：高级配置
        //     algoliaOptions: { 
        //         'facetFilters': ["lang:zh-CN"] 
        //     },
        //     debug: false // 调试时可设置为 true
        // },

        // 博客配置
        blog: {
            socialLinks: [
                { icon: 'BrandGithub', link: 'https://github.com/CambridgeFoldingKnife' },
                { icon: 'Mail', link: 'mailto:3144253125@qq.com' },
            ]
        },

        // 友情链接配置（已改用自定义组件 FriendshipLinks.vue）
        // 自定义组件支持分类显示，数据在组件内部维护

        // 评论配置（可选）
        // commentConfig: {
        //   type: 'giscus',
        //   options: {
        //     repo: 'YIXUAN-oss/YIXUAN-Blog',
        //     repoId: 'your-repo-id',
        //     category: 'Announcements',
        //     categoryId: 'your-category-id',
        //   },
        // },
    }),


    // 多语言支持
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '剑桥折刀的博客',
            description: '分享技术、记录生活',
        },
        '/en/': {
            lang: 'en-US',
            title: "Cambridge Folding Knife\'s Blog",
            description: 'Share technology, record life',
        }
    },
})


