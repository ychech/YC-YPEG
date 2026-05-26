import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

const base = '/YC-YPEG/';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base,
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
  markdown: {
    link: {
      autoPrefix: true,
    },
  },
  
  // 使用自定义主题
  builderConfig: {
    server: {
      setup: ({ server }: any) => {
        server.middlewares.use((req: any, res: any, next: any) => {
          const url = req.url || '/';
          const pathname = url.split('?')[0] || '/';
          if (
            pathname.startsWith(base) ||
            pathname.startsWith('/@') ||
            pathname.startsWith('/rsbuild-dev-server')
          ) {
            next();
            return;
          }

          const shouldRedirect =
            pathname === '/' ||
            pathname === '/en/' ||
            pathname === '/license' ||
            pathname.startsWith('/guide/') ||
            pathname.startsWith('/en/guide/') ||
            pathname.startsWith('/update/') ||
            pathname.startsWith('/en/update/') ||
            pathname.startsWith('/other/');
          if (!shouldRedirect) {
            next();
            return;
          }

          const lastSegment = pathname.split('/').pop() || '';
          if (lastSegment.includes('.') && !lastSegment.endsWith('.html')) {
            next();
            return;
          }

          const method = req.method || 'GET';
          if (method !== 'GET' && method !== 'HEAD') {
            next();
            return;
          }

          const accept = req.headers.accept || '';
          const fetchDest = req.headers['sec-fetch-dest'] || '';
          const isDocumentRequest = fetchDest === 'document' || accept.includes('text/html');
          if (!isDocumentRequest) {
            next();
            return;
          }

          const target = base + (url.startsWith('/') ? url.slice(1) : url);
          res.statusCode = 302;
          res.setHeader('Location', target);
          res.end();
        });
      },
    },
    source: {
      alias: {
        '@theme': path.join(__dirname, 'theme'),
      },
    },
  },
});
