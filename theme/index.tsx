import {
  Layout as BasicLayout,
  Banner,
} from '@rspress/core/theme-original';
import { HomeBackground, HomeFooter, HomeHero, PackageManagerTabs } from '@rspress/core/theme';
import { useFrontmatter, usePage } from '@rspress/core/runtime';
import { useEffect, useState } from 'react';
import { HeroMotion } from './components/HeroMotion';
import { useHead } from '@unhead/react';

const themes = {
  blackgold: { brand: '#C89A3C', light: '#E9C46A', dark: '#8C5A1C', name: '黑金' },
  blue: { brand: '#0095ff', light: '#33adff', dark: '#0077ff', name: '蓝色' },
  purple: { brand: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed', name: '紫色' },
  green: { brand: '#10b981', light: '#34d399', dark: '#059669', name: '绿色' },
  orange: { brand: '#f97316', light: '#fb923c', dark: '#ea580c', name: '橙色' },
  pink: { brand: '#ec4899', light: '#f472b6', dark: '#db2777', name: '粉色' },
  red: { brand: '#ef4444', light: '#f87171', dark: '#dc2626', name: '红色' },
};

function ThemeColorSwitcher() {
  const [current, setCurrent] = useState('blackgold');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const v2 = 'yc-theme-v2';
    const savedV2 = localStorage.getItem(v2);
    const savedV1 = localStorage.getItem('yc-theme');
    const saved = savedV2 || savedV1 || 'blackgold';
    const normalized = !savedV2 && savedV1 === 'blue' ? 'blackgold' : saved;
    applyTheme(normalized);
    localStorage.setItem(v2, normalized);
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
  const { frontmatter } = useFrontmatter();
  const isZh = page.lang === 'zh';
  const isZhHome = isZh && page.routePath === '/';
  const showHomeHero = page.routePath === '/' || page.routePath === '/en/';
  const tileFeatures = (frontmatter?.features || []).slice(0, 6);
  const extraFeatures = [
    {
      title: '指南概览',
      details: '从整体结构开始，快速建立提示词工程的知识地图。',
      icon: '/feat-1.png',
      link: '/guide/prompt-engineering/',
    },
    {
      title: '文本生成控制参数',
      details: 'Temperature、Top_p 等参数如何影响随机性与稳定性。',
      icon: '/feat-2.png',
      link: '/guide/prompt-engineering/text-generation-params',
    },
    {
      title: '提示词结构',
      details: '角色 / 指令 / 约束 / 输出格式，让提示词更清晰可控。',
      icon: '/feat-3.png',
      link: '/guide/prompt-engineering/prompt-structure',
    },
    {
      title: '评估与迭代',
      details: '建立评估集与回归流程，避免越改越差。',
      icon: '/feat-4.png',
      link: '/guide/prompt-engineering/evaluation-and-iteration',
    },
    {
      title: '常用提示技术',
      details: '零样本 / 少样本 / CoT 等常用技巧与适用场景。',
      icon: '/feat-1.png',
      link: '/guide/prompt-engineering/prompt-techniques',
    },
    {
      title: 'ReAct（工具调用）',
      details: '把思考和动作分离，适配工具与外部系统。',
      icon: '/feat-2.png',
      link: '/guide/prompt-engineering/react',
    },
    {
      title: 'DSP（方向性刺激）',
      details: '用方向性线索提升摘要/改写/抽取的贴合度与稳定性。',
      icon: '/feat-3.png',
      link: '/guide/prompt-engineering/dsp',
    },
    {
      title: '安全与校验',
      details: '提示词注入与防护、幻觉识别与三角验证。',
      icon: '/feat-4.png',
      link: '/guide/prompt-engineering/prompt-security',
    },
  ];

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.yc-reveal')) as HTMLElement[];
    if (els.length === 0) return;
    if (typeof IntersectionObserver === 'undefined') {
      for (const el of els) el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <HomeBackground />
      {beforeHero}
      {page.pageType === 'home' && showHomeHero ? (
        <HomeHero
          image={isZhHome ? <HeroMotion /> : undefined}
          afterHeroActions={
            isZhHome ? (
              <div className="yc-home-quickstart yc-reveal">
                <PackageManagerTabs
                  command={
                    {
                      git: 'git clone https://github.com/ychech/YC-YPEG.git',
                    } as any
                  }
                  additionalTabs={[
                    {
                      tool: 'git',
                      icon: (
                        <svg viewBox="0 0 128 128" width="16" height="16" aria-hidden="true">
                          <path
                            fill="#F1502F"
                            d="M126.315 62.5L65.488 1.674a6.67 6.67 0 0 0-9.432 0L42.274 15.456l13.606 13.605c3.551-1.12 7.643-.223 10.373 2.508c3.153 3.153 3.823 7.82 2.012 11.644l13.064 13.064c3.823-1.81 8.491-1.14 11.644 2.012c4.116 4.116 4.116 10.79 0 14.907c-4.116 4.116-10.79 4.116-14.907 0c-3.153-3.152-3.823-7.82-2.012-11.644L63.535 49.034v33.486c1.657 1.572 2.701 3.824 2.701 6.347c0 4.773-3.87 8.643-8.643 8.643c-4.773 0-8.643-3.87-8.643-8.643c0-2.616 1.139-4.945 2.91-6.52V42.502c-1.77-1.575-2.91-3.904-2.91-6.52c0-1.89.605-3.639 1.636-5.05L36.31 16.657L1.685 61.282a6.67 6.67 0 0 0 0 9.432l60.827 60.827a6.67 6.67 0 0 0 9.432 0l54.37-54.37v-.24a6.67 6.67 0 0 0 0-9.432z"
                          />
                        </svg>
                      ),
                    },
                  ]}
                />
              </div>
            ) : null
          }
        />
      ) : null}
      {afterHero}
      {beforeFeatures}
      {isZhHome ? (
        <section className="yc-home-tiles yc-reveal">
          <div className="yc-home-tiles__container">
            <div className="yc-home-tiles__grid">
              {tileFeatures.map((f: any) => {
                return (
                  <a key={f.title} href={f.link || '#'} className="yc-tile yc-reveal">
                    {f.icon ? <img className="yc-tile__icon" src={f.icon} alt="" /> : null}
                    <div className="yc-tile__title">{f.title}</div>
                    <div className="yc-tile__desc">{f.details}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
      {afterFeatures}
      {isZhHome ? (
        <section className="yc-home-section yc-reveal">
          <div className="yc-home-section__container">
            <h2 className="yc-home-section__title">指南导航</h2>
            <p className="yc-home-section__subtitle">按主题快速进入你需要的章节</p>
            <div className="yc-guide-grid">
              {extraFeatures.map((f) => {
                return (
                  <a
                    key={f.title}
                    href={f.link}
                    className="yc-guide-card"
                    style={{ '--yc-guide-card-bg': `url('${f.icon}')` } as any}
                  >
                    <div className="yc-guide-card__bg" />
                    <div className="yc-guide-card__content">
                      <div className="yc-guide-card__icon">
                        <img src={f.icon} alt="" />
                      </div>
                      <div className="yc-guide-card__title">{f.title}</div>
                      <div className="yc-guide-card__desc">{f.details}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
      <HomeFooter />
    </>
  );
}

function Layout(props: any) {
  const { page } = usePage();
  useHead({
    htmlAttrs: {
      'data-route': page.routePath,
      'data-page-type': page.pageType,
    },
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
      beforeNav={
        <Banner
          href="/update/2026-04-13"
          message={page.lang === 'en' ? '🚧 Documentation is still being polished.' : '🚧 文档仍在完善中，内容持续更新。'}
        />
      }
      beforeNavMenu={<ThemeColorSwitcher />}
      HomeLayout={HomeLayout as any}
    />
  );
}

export { Layout };
export * from '@rspress/core/theme-original';
