import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/YC-YPEG/',
  route: {
    exclude: ['**/components/**', '**/fragments/**'],
  },
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'YPEG',
      description: 'YC Prompt Guide',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'YPEG',
      description: 'YC-提示词指南',
    },
  ],
  lang: 'zh',
  globalStyles: path.join(__dirname, 'docs', 'styles', 'custom.css'),
  icon: '/assets/brand/logo.png',
  logo: {
    light: '/assets/brand/logo.png',
    dark: '/assets/brand/logo.png',
  },
  logoText: 'YPEG',
  logoHref: '/',
  
  themeConfig: {
    appearance: true,
    
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/ychech/YC-YPEG' },
    ],
    
    footer: {
      message: '版权所有 © 2026 逸尘 · 仅限非商业使用与分享（CC BY-NC 4.0）· <a class="rp-link" href="/license">许可声明</a>',
      copyright: '',
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
