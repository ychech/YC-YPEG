import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'zh',  // 默认语言
  globalStyles: path.join(__dirname, 'docs', 'styles', 'custom.css'),
  icon: '/cs2.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  logoText: 'YPEG',
  logoHref: '/zh/',
  
  themeConfig: {
    appearance: true,
    
    // 导航配置
    nav: [
      { text: '提示词指南', link: '/zh/guide/prompt-engineering/', position: 'left' },
      { text: '更新日志', link: '/zh/changelog', position: 'left' },
    ],
    
    // 侧边栏配置
    sidebar: {
      '/zh/guide/prompt-engineering/': [
        {
          text: 'YC-提示词指南',
          items: [
            { text: '指南概览', link: '/zh/guide/prompt-engineering/' },
            { text: '文本生成控制参数', link: '/zh/guide/prompt-engineering/text-generation-params' },
            { text: '提示词结构', link: '/zh/guide/prompt-engineering/prompt-structure' },
            { text: '评估与迭代', link: '/zh/guide/prompt-engineering/evaluation-and-iteration' },
            { text: '常用提示技术', link: '/zh/guide/prompt-engineering/prompt-techniques' },
            { text: 'ReAct（工具调用）', link: '/zh/guide/prompt-engineering/react' },
            { text: 'DSP（方向性刺激）', link: '/zh/guide/prompt-engineering/dsp' },
            { text: '首页动态效果', link: '/zh/guide/prompt-engineering/home-motion' },
            { text: '模型幻觉与校验', link: '/zh/guide/prompt-engineering/hallucination' },
            { text: '提示词安全', link: '/zh/guide/prompt-engineering/prompt-security' },
            { text: '参考资料', link: '/zh/guide/prompt-engineering/references' },
          ],
        },
      ],
    },
    
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/ychech/YC-YPEG' },
    ],
    
    footer: {
      message: '© 2026 YC Prompt Guide',
      copyright: 'Built with Rspress',
    },
  },
  
  // SSG-MD 配置（AI-native）
  llms: true,
  
  // 使用自定义主题
  builderConfig: {
    source: {
      alias: {
        '@theme': path.join(__dirname, 'theme'),
      },
    },
  },
});
