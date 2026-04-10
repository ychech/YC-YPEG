// YC-提示词指南 - 主题色切换器
(function() {
  const themes = {
    blue: { brand: '#0095ff', light: '#33adff', dark: '#0077ff' },
    purple: { brand: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
    green: { brand: '#10b981', light: '#34d399', dark: '#059669' },
    orange: { brand: '#f97316', light: '#fb923c', dark: '#ea580c' },
    pink: { brand: '#ec4899', light: '#f472b6', dark: '#db2777' },
    red: { brand: '#ef4444', light: '#f87171', dark: '#dc2626' },
  };

  // 将切换函数挂载到 window，供导航菜单调用
  window.applyThemeColor = function(name) {
    const t = themes[name];
    if (!t) return;
    
    const r = document.documentElement;
    r.style.setProperty('--rp-c-brand', t.brand);
    r.style.setProperty('--rp-c-brand-light', t.light);
    r.style.setProperty('--rp-c-brand-dark', t.dark);
    r.style.setProperty('--rp-c-brand-tint', t.brand + '29');
    
    localStorage.setItem('yc-theme', name);
    
    // 显示提示
    showToast('已切换到' + ({
      blue: '蓝色', purple: '紫色', green: '绿色',
      orange: '橙色', pink: '粉色', red: '红色'
    }[name] || name) + '主题');
  };

  function showToast(message) {
    // 移除旧的 toast
    const old = document.getElementById('yc-toast');
    if (old) old.remove();
    
    const toast = document.createElement('div');
    toast.id = 'yc-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--rp-c-brand);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 14px;
      z-index: 99999;
      animation: yc-fade-in-out 2s ease forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes yc-fade-in-out {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
  }

  // 初始化
  function init() {
    const saved = localStorage.getItem('yc-theme') || 'blue';
    window.applyThemeColor(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
