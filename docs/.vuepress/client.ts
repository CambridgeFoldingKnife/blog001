import { defineClientConfig } from '@vuepress/client'
import IconHome from './components/IconHome.vue'
import IconBook from './components/IconBook.vue'
import IconArticle from './components/IconArticle.vue'
import IconGift from './components/IconGift.vue'
import IconPen from './components/IconPen.vue'
import IconUser from './components/IconUser.vue'
import FriendshipLinks from './components/FriendshipLinks.vue'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // 注册图标组件
        app.component('IconHome', IconHome)
        app.component('IconBook', IconBook)
        app.component('IconArticle', IconArticle)
        app.component('IconGift', IconGift)
        app.component('IconPen', IconPen)
        app.component('IconUser', IconUser)
        // 注册友情链接组件
        app.component('FriendshipLinks', FriendshipLinks)
        // 添加搜索框快捷键提示
        if (typeof window !== 'undefined') {
            const addSearchShortcut = () => {
                const searchBox = document.querySelector('.navbar-search input, .search-box input, input[type="search"]');
                if (searchBox && !document.querySelector('.search-shortcut-hint')) {
                    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                    const shortcutKey = isMac ? '⌘ K' : 'Ctrl K';
                    
                    const hint = document.createElement('div');
                    hint.className = 'search-shortcut-hint';
                    hint.textContent = shortcutKey;
                    hint.style.cssText = `
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: rgba(0, 0, 0, 0.05);
                        color: #666;
                        padding: 2px 6px;
                        border-radius: 3px;
                        font-size: 11px;
                        font-weight: 600;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        pointer-events: none;
                        font-family: 'Segoe UI', system-ui, sans-serif;
                        z-index: 10;
                        line-height: 1.3;
                        display: inline-flex;
                        align-items: center;
                        height: 20px;
                    `;
                    
                    const searchContainer = searchBox.parentElement;
                    if (searchContainer) {
                        searchContainer.style.position = 'relative';
                        searchContainer.appendChild(hint);
                        
                        // 调整输入框padding
                        (searchBox as HTMLInputElement).style.paddingRight = '65px';
                        
                        // 暗黑模式适配
                        const updateTheme = () => {
                            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            if (isDark) {
                                hint.style.background = 'rgba(255, 255, 255, 0.1)';
                                hint.style.color = 'rgba(255, 255, 255, 0.6)';
                                hint.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            } else {
                                hint.style.background = 'rgba(0, 0, 0, 0.05)';
                                hint.style.color = '#666';
                                hint.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                            }
                        };
                        
                        updateTheme();
                        
                        // 监听主题变化
                        const observer = new MutationObserver(updateTheme);
                        observer.observe(document.documentElement, {
                            attributes: true,
                            attributeFilter: ['data-theme']
                        });
                    }
                }
            };
            
            // 延迟执行，确保DOM加载完成
            setTimeout(addSearchShortcut, 1000);
            setTimeout(addSearchShortcut, 2000);
            
            // 添加搜索快捷键功能
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    const searchInput = document.querySelector<HTMLInputElement>('.navbar-search input, .search-box input, input[type="search"]');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            });
        }
        
        // 图片懒加载
        if (typeof window !== 'undefined') {
            // 延迟加载以确保 DOM 已加载
            setTimeout(() => {
                const images = document.querySelectorAll('img[loading="lazy"]');

                if ('IntersectionObserver' in window) {
                    const imageObserver = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const img = entry.target as HTMLImageElement;
                                img.src = img.dataset.src || img.src;
                                img.classList.add('loaded');
                                imageObserver.unobserve(img);
                            }
                        });
                    });

                    images.forEach((img) => imageObserver.observe(img));
                }
            }, 1000);
        }
    },

    setup() {
        // 添加阅读进度条
        if (typeof window !== 'undefined') {
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #a78bfa, #7c3aed, #6d28d9);
        z-index: 9999;
        transition: width 0.2s ease;
        box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
      `;
            document.body.appendChild(progressBar);

            const updateProgress = () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = progress + '%';
            };

            window.addEventListener('scroll', updateProgress);
            updateProgress();

            // 个人信息卡片交互
            const initProfileCard = () => {
                const trigger = document.getElementById('profileTrigger');
                const card = document.getElementById('profileCard');
                const closeBtn = document.getElementById('closeBtn');

                if (!trigger || !card) {
                    // 如果元素还没有加载，稍后再试
                    return;
                }

                console.log('Profile card found, initializing...');

                // 移除可能存在的旧事件监听器（通过克隆节点）
                const newTrigger = trigger.cloneNode(true) as HTMLElement;
                trigger.parentNode?.replaceChild(newTrigger, trigger);

                // 切换卡片显示状态
                const toggleCard = (e: Event) => {
                    e.stopPropagation();
                    console.log('Toggle card clicked');

                    if (card.classList.contains('active')) {
                        card.classList.remove('active');
                        newTrigger.classList.remove('active');
                    } else {
                        card.classList.add('active');
                        newTrigger.classList.add('active');
                    }
                };

                // 点击触发按钮
                newTrigger.addEventListener('click', toggleCard);

                // 点击关闭按钮
                if (closeBtn) {
                    closeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        card.classList.remove('active');
                        newTrigger.classList.remove('active');
                    });
                }

                // 点击卡片外部关闭
                const closeOnClickOutside = (e: MouseEvent) => {
                    if (card.classList.contains('active') &&
                        !card.contains(e.target as Node) &&
                        !newTrigger.contains(e.target as Node)) {
                        card.classList.remove('active');
                        newTrigger.classList.remove('active');
                    }
                };
                document.addEventListener('click', closeOnClickOutside);

                // 阻止卡片内部点击事件冒泡（但不阻止链接点击）
                card.addEventListener('click', (e) => {
                    // 允许链接正常工作
                    if ((e.target as HTMLElement).tagName === 'A' ||
                        (e.target as HTMLElement).closest('a')) {
                        return;
                    }
                    e.stopPropagation();
                });
            };

            // 多次尝试初始化以确保成功
            setTimeout(initProfileCard, 500);
            setTimeout(initProfileCard, 1000);
            setTimeout(initProfileCard, 2000);

            // 路由变化后重新初始化
            if (typeof window !== 'undefined' && (window as any).__VUEPRESS_ROUTER__) {
                (window as any).__VUEPRESS_ROUTER__.afterEach(() => {
                    setTimeout(initProfileCard, 1000);
                    
                    // 路由变化后重新添加搜索快捷键
                    setTimeout(() => {
                        const addSearchShortcut = () => {
                            const searchBox = document.querySelector('.navbar-search input, .search-box input, input[type="search"]');
                            if (searchBox && !document.querySelector('.search-shortcut-hint')) {
                                const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                                const shortcutKey = isMac ? '⌘ K' : 'Ctrl K';
                                
                                const hint = document.createElement('div');
                                hint.className = 'search-shortcut-hint';
                                hint.textContent = shortcutKey;
                                hint.style.cssText = `
                                    position: absolute;
                                    right: 10px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background: rgba(0, 0, 0, 0.05);
                                    color: #666;
                                    padding: 2px 6px;
                                    border-radius: 3px;
                                    font-size: 11px;
                                    font-weight: 600;
                                    border: 1px solid rgba(0, 0, 0, 0.1);
                                    pointer-events: none;
                                    font-family: 'Segoe UI', system-ui, sans-serif;
                                    z-index: 10;
                                    line-height: 1.3;
                                    display: inline-flex;
                                    align-items: center;
                                    height: 20px;
                                `;
                                
                                const searchContainer = searchBox.parentElement;
                                if (searchContainer) {
                                    searchContainer.style.position = 'relative';
                                    searchContainer.appendChild(hint);
                                    (searchBox as HTMLInputElement).style.paddingRight = '65px';
                                    
                                    const updateTheme = () => {
                                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                                        if (isDark) {
                                            hint.style.background = 'rgba(255, 255, 255, 0.1)';
                                            hint.style.color = 'rgba(255, 255, 255, 0.6)';
                                            hint.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                        } else {
                                            hint.style.background = 'rgba(0, 0, 0, 0.05)';
                                            hint.style.color = '#666';
                                            hint.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                                        }
                                    };
                                    
                                    updateTheme();
                                }
                            }
                        };
                        addSearchShortcut();
                    }, 500);
                });
            }
        }
    },

    rootComponents: [],
})


