import { useEffect, useState } from 'react';

const themes = {
  blue: { brand: '#146198ff', name: '蓝色' },
  purple: { brand: '#8b5cf6', name: '紫色' },
  green: { brand: '#10b981', name: '绿色' },
  orange: { brand: '#f97316', name: '橙色' },
  pink: { brand: '#ec4899', name: '粉色' },
  red: { brand: '#ef4444', name: '红色' },
};

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('yc-theme-color') || 'blue';
    setCurrentTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (themeName: string) => {
    const theme = themes[themeName as keyof typeof themes];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--rp-c-brand', theme.brand);
    
    // 计算亮色和暗色变体
    root.style.setProperty('--rp-c-brand-light', adjustBrightness(theme.brand, 20));
    root.style.setProperty('--rp-c-brand-dark', adjustBrightness(theme.brand, -20));
    root.style.setProperty('--rp-c-brand-tint', theme.brand + '29'); // 16% opacity
    
    localStorage.setItem('yc-theme-color', themeName);
  };

  const adjustBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
  };

  if (!mounted) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      zIndex: 1000,
      background: 'var(--rp-c-bg)',
      border: '1px solid var(--rp-c-divider-light)',
      borderRadius: '12px',
      padding: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    }}>
      <h4 style={{
        margin: '0 0 10px 0',
        fontSize: '12px',
        color: 'var(--rp-c-text-3)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>🎨 主题色</h4>
      <div style={{ display: 'flex', gap: '8px' }}>
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            title={theme.name}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: `3px solid ${currentTheme === key ? 'var(--rp-c-text-1)' : 'transparent'}`,
              background: theme.brand,
              cursor: 'pointer',
              transform: currentTheme === key ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              if (currentTheme !== key) {
                e.currentTarget.style.transform = 'scale(1.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentTheme !== key) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
