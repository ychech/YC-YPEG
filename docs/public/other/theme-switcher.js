// YC-提示词指南 - 主题色切换器
(function() {
  // 主题配置
  const themeColors = {
    blue: {
      brand: '#0095ff',
      brandLight: '#33adff',
      brandDark: '#0077ff',
      brandTint: 'rgba(127, 163, 255, 0.16)',
      secondary: '#a673ff',
      name: '蓝色',
    },
    purple: {
      brand: '#8b5cf6',
      brandLight: '#a78bfa',
      brandDark: '#7c3aed',
      brandTint: 'rgba(139, 92, 246, 0.16)',
      secondary: '#ec4899',
      name: '紫色',
    },
    green: {
      brand: '#10b981',
      brandLight: '#34d399',
      brandDark: '#059669',
      brandTint: 'rgba(16, 185, 129, 0.16)',
      secondary: '#3b82f6',
      name: '绿色',
    },
    orange: {
      brand: '#f97316',
      brandLight: '#fb923c',
      brandDark: '#ea580c',
      brandTint: 'rgba(249, 115, 22, 0.16)',
      secondary: '#8b5cf6',
      name: '橙色',
    },
    pink: {
      brand: '#ec4899',
      brandLight: '#f472b6',
      brandDark: '#db2777',
      brandTint: 'rgba(236, 72, 153, 0.16)',
      secondary: '#f97316',
      name: '粉色',
    },
    red: {
      brand: '#ef4444',
      brandLight: '#f87171',
      brandDark: '#dc2626',
      brandTint: 'rgba(239, 68, 68, 0.16)',
      secondary: '#f97316',
      name: '红色',
    },
  };

  // 当前主题
  let currentTheme = localStorage.getItem('yc-theme-color') || 'blue';

  // 应用主题
  function applyTheme(themeName) {
    const theme = themeColors[themeName];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--rp-c-brand', theme.brand);
    root.style.setProperty('--rp-c-brand-light', theme.brandLight);
    root.style.setProperty('--rp-c-brand-dark', theme.brandDark);
    root.style.setProperty('--rp-c-brand-tint', theme.brandTint);
    root.style.setProperty('--rp-home-hero-secondary-color', theme.secondary);
    
    // 更新标题渐变
    const titleBg = `linear-gradient(90deg, ${theme.brandDark} 0%, ${theme.brandDark} 30%, ${theme.secondary} 100%)`;
    root.style.setProperty('--rp-home-hero-title-bg', titleBg);

    // 更新按钮选中状态
    document.querySelectorAll('.theme-color-dot').forEach(dot => {
      dot.style.border = dot.dataset.theme === themeName 
        ? '3px solid var(--rp-c-text-1)' 
        : '2px solid transparent';
      dot.style.transform = dot.dataset.theme === themeName 
        ? 'scale(1.2)' 
        : 'scale(1)';
    });

    // 保存到 localStorage
    localStorage.setItem('yc-theme-color', themeName);
    currentTheme = themeName;
  }

  // 创建主题切换器 UI
  function createThemeSwitcher() {
    // 检查是否已存在
    if (document.getElementById('theme-color-switcher')) return;

    const container = document.createElement('div');
    container.id = 'theme-color-switcher';
    container.innerHTML = `
      <div class="theme-switcher-wrapper">
        <button class="theme-switcher-toggle" title="切换主题色">
          <span class="current-color-dot"></span>
          <span class="theme-label">主题</span>
          <svg class="dropdown-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="theme-dropdown">
          ${Object.entries(themeColors).map(([key, theme]) => `
            <button class="theme-option" data-theme="${key}">
              <span class="theme-color-dot" data-theme="${key}" style="background: ${theme.brand}"></span>
              <span class="theme-name">${theme.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // 插入到导航栏
    const nav = document.querySelector('.rp-nav');
    if (nav) {
      nav.appendChild(container);
    }

    // 添加样式
    addStyles();

    // 绑定事件
    bindEvents();

    // 应用当前主题
    applyTheme(currentTheme);
  }

  // 添加样式
  function addStyles() {
    if (document.getElementById('theme-switcher-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'theme-switcher-styles';
    styles.textContent = `
      #theme-color-switcher {
        position: absolute;
        right: 100px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
      }

      .theme-switcher-wrapper {
        position: relative;
      }

      .theme-switcher-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: 1px solid var(--rp-c-divider-light);
        border-radius: 20px;
        background: var(--rp-c-bg-soft);
        cursor: pointer;
        font-size: 13px;
        color: var(--rp-c-text-2);
        transition: all 0.2s ease;
      }

      .theme-switcher-toggle:hover {
        border-color: var(--rp-c-divider);
        color: var(--rp-c-text-1);
      }

      .current-color-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--rp-c-brand);
        transition: background 0.3s ease;
      }

      .theme-label {
        font-weight: 500;
      }

      .dropdown-icon {
        transition: transform 0.2s ease;
      }

      .theme-switcher-wrapper.open .dropdown-icon {
        transform: rotate(180deg);
      }

      .theme-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: var(--rp-c-bg);
        border: 1px solid var(--rp-c-divider-light);
        border-radius: 12px;
        padding: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        min-width: 140px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
      }

      .theme-switcher-wrapper.open .theme-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .theme-option {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        background: transparent;
        cursor: pointer;
        font-size: 13px;
        color: var(--rp-c-text-2);
        transition: all 0.2s ease;
      }

      .theme-option:hover {
        background: var(--rp-c-bg-soft);
      }

      .theme-color-dot {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .theme-name {
        font-weight: 500;
      }

      @media (max-width: 768px) {
        #theme-color-switcher {
          right: 60px;
        }
        .theme-label {
          display: none;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // 绑定事件
  function bindEvents() {
    const wrapper = document.querySelector('.theme-switcher-wrapper');
    const toggle = document.querySelector('.theme-switcher-toggle');
    const dropdown = document.querySelector('.theme-dropdown');

    // 切换下拉框
    toggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.classList.toggle('open');
    });

    // 选择主题
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const theme = btn.dataset.theme;
        applyTheme(theme);
        wrapper.classList.remove('open');
      });
    });

    // 点击外部关闭
    document.addEventListener('click', () => {
      wrapper?.classList.remove('open');
    });

    dropdown?.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createThemeSwitcher);
  } else {
    createThemeSwitcher();
  }

  // 监听导航栏变化（SPA 路由切换）
  const observer = new MutationObserver(() => {
    createThemeSwitcher();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
})();
