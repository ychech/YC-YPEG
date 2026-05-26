# YPEG（YC Prompt Engineering Guide）

YPEG 是一个基于 Rspress v2 的静态文档站点，用于沉淀「提示词工程（Prompt Engineering）」相关的学习路线、知识地图、方法论与案例，并持续以更新日志的方式维护迭代记录。

- 线上地址：https://ychech.github.io/YC-YPEG/
- 部署子路径：`/YC-YPEG/`（见 `rspress.config.ts` 的 `base`）

## 主要内容

- **指南概览**：整体结构与学习路径（入口：`docs/zh/guide/prompt-engineering/index.mdx`）
- **基础能力**：文本生成控制参数、提示词结构、评估与迭代、常用提示技术等
- **六大整合**：行业认知、思维方式、格式规范、行业拓展、实战演练、未来创新
- **进阶与扩展**：ReAct（工具调用）、高级技巧、扩展技巧、幻觉与校验、安全与防护、参考资料
- **维护与规范**：目录结构与使用教程（入口：`docs/zh/other/api/usage-guide.mdx`）

## 目录结构

下面是代码与内容目录的最小心智模型（按“改哪里影响哪里”组织）：

- `docs/`：站点内容与资源
  - `docs/zh/`、`docs/en/`：中英文文档内容与导航（`_nav.json`、`_meta.json`）
  - `docs/styles/custom.css`：全站/首页样式覆盖（首页“指南导航”在这里）
  - `docs/public/`：静态资源（图片、图标、manifest 等）
  - `docs/zh/update/`：更新日志（按日期文件维护）
- `theme/`：自定义主题代码（首页卡片、链接/图片 base 处理、Hero 等）
- `rspress.config.ts`：站点配置（base、locales、dev server 行为等）
- `.github/workflows/deploy.yml`：GitHub Pages 部署流水线

## 环境要求

- Node.js 20+（建议与 CI 保持一致）
- npm 10+

## 本地开发

在 `rspress-docs-template/` 目录下执行：

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

构建产物输出到 `doc_build/`。

## 写文档与资源引用

- **新增/修改文档**：直接编辑 `docs/zh/**` 或 `docs/en/**` 下的 `md/mdx` 文件。
- **站内链接**：建议使用站内路由（如 `/guide/...`、`/update/...`），站点会在渲染时自动处理 base 与尾斜杠。
- **图片/静态资源**：统一放在 `docs/public/` 下，通过 `/assets/...`、`/prompt-assets/...` 等路径引用；部署到 GitHub Pages 时会自动带上 `/YC-YPEG/` 前缀。

## 更新日志（按日期维护）

更新日志位于 `docs/zh/update/`：

- 每次更新新增一个日期文件（如 `2026-05-26.mdx`）
- 同步更新 `docs/zh/update/_meta.json` 以确保导航与顺序正确

## 部署说明（GitHub Pages）

- 站点以子路径方式部署：`base = '/YC-YPEG/'`
- GitHub Actions 通过 [deploy.yml](./.github/workflows/deploy.yml) 构建并发布到 Pages
- 如果你在本地访问时出现路径前缀、刷新 404 或资源丢失，多半与 base/尾斜杠/站内链接写法有关，优先检查 `rspress.config.ts` 和 `theme/index.tsx` 的链接处理逻辑

## License

本项目文档使用 CC BY-NC 4.0（署名-非商业）授权，详见 [LICENSE.md](./LICENSE.md)。
