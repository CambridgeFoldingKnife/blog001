import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { recoTheme } from 'vuepress-theme-reco'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch' // 已改用主题内置 Algolia

export default defineUserConfig({
    lang: 'zh-CN',
    title: '剑桥折刀的博客',
    description: '分享技术、记录生活 | Cambridge Folding Knife\'s Blog',

    // 根据部署环境设置 base 路径
    // 本地开发: 使用根路径 /
    // Vercel: 使用根路径 /
    // GitHub Pages: 使用 /YIXUAN-Blog/
     base: process.env.NODE_ENV === 'development' ? '/' : '/blog001/',

    // 使用 Vite 打包工具
    bundler: viteBundler(),
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'keywords', content: '剑桥折刀,Cambridge Folding Knife,博客,技术博客,Java,Python,前端开发' }],
        ['meta', { name: 'author', content: '剑桥折刀' }],
        ['meta', { name: 'algolia-site-verification', content: '965773E690A426DF' }],
        ['link', { rel: 'icon', href: '/favicon.png' }],

        // 自定义搜索框样式
        ['style', {}, `
            .search-box { width: 280px !important; min-width: 280px !important; max-width: 280px !important; }
            .search-box input { width: 100% !important; }
            @media (max-width: 768px) {
                .search-box { width: 200px !important; min-width: 200px !important; max-width: 200px !important; }
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
            '/tutorials/database/redis/': []
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


