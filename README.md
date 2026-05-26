# YPEG（YC Prompt Engineering Guide）

基于 Rspress v2 的静态文档站点，内容目录在 `docs/`，自定义主题在 `theme/`。

- 在线访问（GitHub Pages）：https://ychech.github.io/YC-YPEG/

## 主要内容

- 提示词工程的知识地图与学习路径（指南概览）
- 技术结构基石：文本生成参数、提示词结构、评估与迭代
- 思维能力设计：常用/进阶/扩展提示技术，以及六大整合
- 安全突破防守：幻觉与校验、提示词安全、参考资料

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

## 部署到 GitHub Pages

- 仓库：Settings → Pages → Source 选择 `GitHub Actions`
- 推送到 `main` 分支后会自动构建并发布
