import {
  Layout as BasicLayout,
} from '@rspress/core/theme-original';
import { HomeBackground, HomeFeature, HomeFooter, HomeHero, PackageManagerTabs } from '@rspress/core/theme';
import { useFrontmatter, usePage } from '@rspress/core/runtime';
import { useEffect, useState } from 'react';
import { HeroMotion } from './components/HeroMotion';
import { useHead } from '@unhead/react';

const themes = {
  blue: { brand: '#0095ff', light: '#33adff', dark: '#0077ff', name: '蓝色' },
  purple: { brand: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed', name: '紫色' },
  green: { brand: '#10b981', light: '#34d399', dark: '#059669', name: '绿色' },
  orange: { brand: '#f97316', light: '#fb923c', dark: '#ea580c', name: '橙色' },
  pink: { brand: '#ec4899', light: '#f472b6', dark: '#db2777', name: '粉色' },
  red: { brand: '#ef4444', light: '#f87171', dark: '#dc2626', name: '红色' },
};

function ThemeColorSwitcher() {
  const [current, setCurrent] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('yc-theme') || 'blue';
    setCurrent(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (name: string) => {
    const t = themes[name as keyof typeof themes];
    if (!t) return;
    
    const r = document.documentElement;
    r.style.setProperty('--rp-c-brand', t.brand);
    r.style.setProperty('--rp-c-brand-light', t.light);
    r.style.setProperty('--rp-c-brand-dark', t.dark);
    r.style.setProperty('--rp-c-brand-tint', t.brand + '29');
    
    localStorage.setItem('yc-theme', name);
    setCurrent(name);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'transparent',
          border: '1px solid var(--rp-c-divider-light)',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '13px',
          color: 'var(--rp-c-text-2)',
        }}
      >
        <span
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: themes[current as keyof typeof themes]?.brand,
          }}
        />
        <span>主题</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              display: 'flex',
              gap: '8px',
              padding: '12px',
              background: 'var(--rp-c-bg)',
              border: '1px solid var(--rp-c-divider-light)',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              zIndex: 9999,
            }}
          >
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => {
                  applyTheme(key);
                  setIsOpen(false);
                }}
                title={t.name}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `3px solid ${current === key ? 'var(--rp-c-text-1)' : 'transparent'}`,
                  background: t.brand,
                  cursor: 'pointer',
                  transform: current === key ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function HomeLayoutMarkdown() {
  const { frontmatter } = useFrontmatter();
  const hero = frontmatter?.hero;
  const features = frontmatter?.features;
  const lines: string[] = [];

  if (hero) {
    if (hero.name) {
      lines.push(`# ${hero.name}`);
      lines.push('');
    }
    if (hero.text) {
      lines.push(hero.text);
      lines.push('');
    }
    if (hero.tagline) {
      lines.push(`> ${hero.tagline}`);
      lines.push('');
    }
    if (hero.actions && hero.actions.length > 0) {
      const actionLinks = hero.actions
        .map((action: any) => `[${action.text}](${action.link})`)
        .join(' | ');
      lines.push(actionLinks);
      lines.push('');
    }
  }

  if (features && features.length > 0) {
    lines.push('## Features');
    lines.push('');
    for (const feature of features) {
      const icon = feature.icon ? `${feature.icon} ` : '';
      const title = feature.link
        ? `[${icon}**${feature.title}**](${feature.link})`
        : `${icon}**${feature.title}**`;
      lines.push(`- ${title}: ${feature.details}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function HomeLayout(homeProps: any) {
  if (process.env.__SSR_MD__) return <HomeLayoutMarkdown />;

  const { beforeHero, afterHero, beforeFeatures, afterFeatures } = homeProps;
  const { page } = usePage();
  const isZh = page.lang === 'zh';
  const extraFeatures = [
    {
      title: '指南概览',
      details: '从整体结构开始，快速建立提示词工程的知识地图。',
      icon: '🧭',
      link: '/zh/guide/prompt-engineering/',
    },
    {
      title: '文本生成控制参数',
      details: 'Temperature、Top_p 等参数如何影响随机性与稳定性。',
      icon: '🎚️',
      link: '/zh/guide/prompt-engineering/text-generation-params',
    },
    {
      title: '提示词结构',
      details: '角色 / 指令 / 约束 / 输出格式，让提示词更清晰可控。',
      icon: '🧩',
      link: '/zh/guide/prompt-engineering/prompt-structure',
    },
    {
      title: '评估与迭代',
      details: '建立评估集与回归流程，避免越改越差。',
      icon: '✅',
      link: '/zh/guide/prompt-engineering/evaluation-and-iteration',
    },
    {
      title: '常用提示技术',
      details: '零样本 / 少样本 / CoT 等常用技巧与适用场景。',
      icon: '🧠',
      link: '/zh/guide/prompt-engineering/prompt-techniques',
    },
    {
      title: 'ReAct（工具调用）',
      details: '把思考和动作分离，适配工具与外部系统。',
      icon: '🔗',
      link: '/zh/guide/prompt-engineering/react',
    },
    {
      title: 'DSP（方向性刺激）',
      details: '用方向性线索提升摘要/改写/抽取的贴合度与稳定性。',
      icon: '🎯',
      link: '/zh/guide/prompt-engineering/dsp',
    },
    {
      title: '安全与校验',
      details: '提示词注入与防护、幻觉识别与三角验证。',
      icon: '🛡️',
      link: '/zh/guide/prompt-engineering/prompt-security',
    },
  ];

  return (
    <>
      <HomeBackground />
      {beforeHero}
      <HomeHero
        image={<HeroMotion />}
        afterHeroActions={
          isZh ? (
            <div className="yc-home-pkg-tabs">
              <PackageManagerTabs command="create rspress@latest" />
            </div>
          ) : null
        }
      />
      {afterHero}
      {beforeFeatures}
      <HomeFeature />
      {afterFeatures}
      {isZh ? (
        <section className="yc-home-section">
          <div className="yc-home-section__container">
            <h2 className="yc-home-section__title">指南导航</h2>
            <p className="yc-home-section__subtitle">按主题快速进入你需要的章节</p>
            <HomeFeature features={extraFeatures as any} />
          </div>
        </section>
      ) : null}
      <HomeFooter />
    </>
  );
}

function Layout(props: any) {
  useHead({
    link: [
      { rel: 'icon', href: '/cs2.png?v=1' },
      { rel: 'shortcut icon', href: '/cs2.png?v=1' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=1' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
    meta: [{ name: 'theme-color', content: '#0B0B0B' }],
  });
  return (
    <BasicLayout
      {...props}
      beforeNavMenu={<ThemeColorSwitcher />}
      HomeLayout={HomeLayout as any}
    />
  );
}

export { Layout };
export * from '@rspress/core/theme-original';
