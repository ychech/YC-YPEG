# YPEG（YC Prompt Engineering Guide）

基于 Rspress v2 的静态文档站点，内容目录在 `docs/`，自定义主题在 `theme/`。

- 在线访问（GitHub Pages）：https://ychech.github.io/YC-YPEG/

## License / 版权声明

本文档仅供免费阅读、学习与非商业分享，未经作者书面许可，禁止复制售卖、收费传播、商业使用。转载时必须完整保留作者及来源声明。版权所有 © 2026 逸尘，保留所有权利。

本文档采用 知识共享 署名 - 非商业性使用 4.0 国际协议 (CC BY-NC 4.0) 授权。

## 环境要求

- Node.js 20+（建议与 GitHub Actions 保持一致）
- npm 10+（随 Node 安装）

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

生产构建（输出到 `doc_build/`）：

```bash
npm run build
```

本地预览构建产物：

```bash
npm run preview
```

## 部署到 GitHub Pages（原理与要点）

- 站点部署在子路径 `https://ychech.github.io/YC-YPEG/`，因此在 [rspress.config.ts](file:///Users/yc/Desktop/test/y/rspress-docs-template/rspress.config.ts) 配置了：
  - `base: '/YC-YPEG/'`（让路由与静态资源带正确前缀）
- 每次推送到 `main` 分支，会触发工作流 [.github/workflows/deploy.yml](file:///Users/yc/Desktop/test/y/rspress-docs-template/.github/workflows/deploy.yml)：
  - `npm ci` → `npm run build` → 上传 `doc_build/` → 发布到 Pages
- GitHub 仓库设置（只需要做一次）：
  - Settings → Pages → Source 选择 `GitHub Actions`
