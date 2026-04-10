---
title: 首页动态效果实现方案
---

# 🦀 Rspress 首页这种动态效果的实现方案

你图里这种龙虾悬浮 + 视差 + 页面元素联动的动态效果，在 Rspress 里是通过「自定义主题 + React 动画 + CSS 交互」实现的。

## 一、核心原理

Rspress 是基于 React + Rsbuild 的静态站点生成器，官网首页的动画本质是：

1. 完全自定义首页布局：替换默认的 `HomeLayout` 组件，自己写 Hero 区、动画元素
2. React 状态 + 事件监听：监听鼠标移动/滚动，驱动元素位移，实现视差、悬浮效果
3. CSS 动画 + 过渡：用 `@keyframes` 做循环悬浮、淡入，用 `transform` 做高性能位移
4. 分层渲染：背景、窗口、龙虾分三层，不同速度运动，营造 3D 空间感

## 二、分步实现（可直接复制）

### 1. 开启自定义主题（Rspress 2.0+）

首先在项目中创建自定义主题目录，让 Rspress 加载你的自定义组件：

```bash
# 1. 创建主题目录
mkdir -p theme
# 2. 创建入口文件
touch theme/index.tsx
# 3. 在 rspress.config.ts 中配置主题
```

`rspress.config.ts` 配置：

```ts
import { defineConfig } from 'rspress/config';

export default defineConfig({
  // 其他配置...
  theme: './theme', // 指定自定义主题目录
});
```

### 2. 自定义 HomeLayout 组件（核心）

在 `theme/index.tsx` 中重写首页布局，加入动画逻辑：

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { HomeLayout as DefaultHomeLayout } from '@rspress/theme-default';

export const HomeLayout = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getTransform = (factor: number) => {
    return `translate(${mousePos.x * factor}px, ${mousePos.y * factor}px)`;
  };

  return (
    <DefaultHomeLayout>
      <div ref={heroRef} className="custom-hero">
        <div className="hero-bg" style={{ transform: getTransform(-10) }} />

        <div className="hero-window" style={{ transform: getTransform(-20) }}>
          <div className="window-header">
            <span className="logo">Rspress</span>
          </div>
          <div className="window-content">
            <h1># Hello Rspress</h1>
            <pre>
              <code>
                {`\\\`\\\`\\\`ts title="index.ts"
console.log('Hello Rspress');
\\\`\\\`\\\``}
              </code>
            </pre>
          </div>
        </div>

        <div className="hero-lobster" style={{ transform: getTransform(-30) }}>
          <img src="/lobster.png" alt="Rspress Lobster" />
        </div>
      </div>
    </DefaultHomeLayout>
  );
};
```

### 3. 加 CSS 动画（关键）

在 `theme/index.css` 中写样式，实现悬浮、视差、入场动画：

```css
.custom-hero {
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, #1a5fb4 0%, #0a0e27 70%);
  transition: transform 0.1s ease-out;
  z-index: 0;
}

.hero-window {
  position: relative;
  width: 600px;
  background: #1e1e2e;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: transform 0.1s ease-out;
  z-index: 1;
  animation: windowFadeIn 0.8s ease-out forwards;
}

.hero-lobster {
  position: absolute;
  left: 10%;
  bottom: 10%;
  transition: transform 0.1s ease-out;
  z-index: 2;
  animation: lobsterFloat 3s ease-in-out infinite;
}

.hero-lobster img {
  width: 200px;
  height: auto;
}

@keyframes windowFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes lobsterFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

:root {
  --bg-color: #0a0e27;
}
[data-theme='light'] {
  --bg-color: #f0f4f8;
}
```

### 4. 进阶优化（官网同款效果）

#### (1) 滚动视差

监听滚动，让元素随滚动位移：

```tsx
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setLobsterY(scrollY * 0.5);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### (2) GSAP 增强动画（可选）

```bash
npm install gsap
```

```tsx
import { gsap } from 'gsap';

useEffect(() => {
  gsap
    .timeline()
    .to('.hero-bg', { opacity: 1, duration: 0.5 })
    .to('.hero-window', { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    .to('.hero-lobster', { x: 0, opacity: 1, duration: 0.6 }, '-=0.5');
}, []);
```

#### (3) View Transition 页面转场（Rspress 内置）

Rspress 2.0+ 原生支持页面跳转动画，在配置中开启即可：

```ts
export default defineConfig({
  themeConfig: {
    enableContentAnimation: true,
    enableAppearanceAnimation: true,
  },
});
```

## 三、两种实现方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
| --- | --- | --- | --- |
| 纯 CSS + React 状态 | 零依赖、性能好、体积小 | 复杂动画编写繁琐 | 简单悬浮、视差、入场动画 |
| GSAP 动画库 | 动画能力强、时间线可控、兼容性好 | 增加依赖、学习成本 | 复杂序列动画、交互特效 |
| Lottie SVG 动画 | 矢量无损、设计师友好、交互可控 | 动画文件体积、开发成本 | 品牌吉祥物、复杂逐帧动画 |

## 四、避坑指南

1. 性能优化：用 `transform` 做位移，不要改 `top/left`，避免重排；用 `will-change: transform` 提前告知浏览器
2. SSR 兼容：动画逻辑要放在 `useEffect` 里，避免服务端渲染报错
3. 响应式适配：给不同屏幕尺寸设置不同的视差系数，避免移动端元素溢出
4. 主题兼容：用 CSS 变量适配亮色/暗色模式，保证动画元素在两种主题下都美观

## 五、快速上手

1. 把 `HomeLayout` 组件和 CSS 复制到你的 `theme` 目录
2. 替换龙虾图片为你的品牌吉祥物
3. 调整视差系数、动画时长，匹配你的设计
4. 运行 `rspress dev` 预览效果

