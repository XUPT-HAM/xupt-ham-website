# 西邮五九电波社官网

> 西安邮电大学业余无线电通信协会（XUPT HAM）官方网站的源码仓库。

基于 [Astro](https://astro.build) 与 [Starlight](https://starlight.astro.build) 文档框架构建，内置**简体中文 / English** 双语支持。

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-ff5d01?logo=astro&logoColor=white)](https://astro.build)
[![Starlight](https://img.shields.io/badge/Docs-Starlight-2b259c?logo=astro&logoColor=white)](https://starlight.astro.build)
[![Node](https://img.shields.io/badge/Node-24-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/package%20manager-pnpm-f9ad00?logo=pnpm&logoColor=white)](https://pnpm.io)

## 技术栈

| 类别   | 技术                                                                               |
| ---- | -------------------------------------------------------------------------------- |
| 框架   | [Astro](https://astro.build) `^7`                                                |
| 文档主题 | [@astrojs/starlight](https://starlight.astro.build) `^0.42`                      |
| 视觉主题 | [starlight-theme-rose-pine](https://github.com/HiDeoo/starlight-theme-rose-pine) |
| 包管理器 | [pnpm](https://pnpm.io)                                                          |
| 部署平台 | [Cloudflare Pages](https://pages.cloudflare.com)                                 |

## 环境要求

- **Node.js ≥ 24**（开发与构建均使用此版本）
- **pnpm**（推荐；若使用 npm/yarn，请将下方命令中的 `pnpm` 替换即可）

## 本地开发

```bash
# 1. 克隆仓库
gh repo clone XUPT-HAM/xupt-ham-website
cd xupt-ham-website

# 2. 安装依赖
pnpm install

# 3. 启动本地开发服务器（默认地址 http://localhost:4321）
pnpm dev

# 4. 构建静态站点，产物输出至 dist/
pnpm build

# 5. 本地预览构建产物
pnpm preview
```

> 所有可用脚本见 `package.json` 的 `scripts` 字段：`dev` / `start` / `build` / `preview` / `astro`。

## 部署

本项目部署至 **Cloudflare Pages**。本地可使用 Wrangler 预览构建产物：

```bash
pnpm build
npx wrangler pages dev dist
```

在 Cloudflare Pages 控制台连接本仓库后，构建配置如下：

| 配置项  | 值            |
| ---- | ------------ |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist`       |

## 目录结构

```text
.
├── astro.config.mjs        # Astro / Starlight 站点配置（含 i18n 与 site 域名）
├── package.json
├── src/
│   ├── assets/             # 图片等静态资源
│   ├── content/
│   │   ├── docs/           # 文档内容
│   │   │   ├── en/         # 英文版文档
│   │   │   ├── guides/     # 指南
│   │   │   ├── reference/  # 参考
│   │   │   ├── 404.md      # 自定义 404 页面
│   │   │   └── index.mdx   # 首页（默认语言）
│   │   ├── i18n/           # UI 文案翻译（zh-CN.json / en.json）
│   │   └── content.config.ts  # 内容集合配置
│   └── ...
└── dist/                   # 构建产物（由 pnpm build 生成）
```

## 多语言

站点支持**简体中文**（默认，根路径 `/`）与**英文**（`/en/`）：

- 文档内容按语言分目录存放于 `src/content/docs/` —— 默认语言置于根目录，其它语言使用对应子文件夹（如 `en/`）。
- 界面文案（搜索、侧边栏等）翻译位于 `src/content/i18n/`，文件名对应 BCP-47 语言标签（如 `zh-CN.json`、`en.json`）。

## 内容编辑规范

> 日常内容编辑只需要动 `src/content/docs/` 下的 `.mdx` 文件；自定义页面在 `src/pages/`。
> `.astro` 文件是框架基础设施（如自定义 Header、StarlightPage 壳），初学者一般无需改动。

### 1. 添加一篇新文章（文档库内容）

文档内容放在 `src/content/docs/` 下，按语言分目录：

- 中文：`src/content/docs/guides/你的文章.mdx`
- 英文：`src/content/docs/en/guides/你的文章.mdx`

只要文件落在 `guides/` 或 `reference/` 目录里，左侧栏就会通过 `astro.config.mjs` 里的 `sidebar`
配置**自动收录**（无需手动登记），并自动生成中英文对应链接。

最小模板（`title` 为必填项）：

```mdx
---
title: 文章标题
description: 一句话简介（用于 SEO 与搜索结果）
---

正文用普通 Markdown 写即可。

## 二级标题

内容……
```

> 提示：对应语言都要各写一份（中文一份、英文一份），放在各自语言目录下，Starlight 会自动配对。

### 2. 添加一个新的独立页面（如「社团简介」这类不在文档树里的页面）

这类页面放在 `src/pages/`，用 `StarlightPage` 组件包裹，可控制是否显示左侧目录树：

- 中文：`src/pages/页面名.mdx`
- 英文：`src/pages/en/页面名.mdx`

```mdx
---
# 注意：StarlightPage 不读取文件顶部的 frontmatter，标题要通过组件 prop 传入
---
import StarlightPage from '@astrojs/starlight/components/StarlightPage.astro';

<StarlightPage frontmatter={{ title: '页面标题' }} hasSidebar={false}>

正文……

</StarlightPage>
```

- `hasSidebar={false}`：隐藏左侧目录树（适合「关于 / 联系」这类独立页）；文档库里的页面不要加这个，会保留目录树。
- 想让它在顶部导航出现：在 `src/components/Header.astro` 的 `links` 数组加一项，并在
  `src/content/i18n/zh-CN.json`、`en.json` 里补上对应的 `nav.xxx` 文案。

### 3. 插入图片

**推荐做法**：把图片和 `.mdx`/`.md` 放在同一目录，用相对路径引用，Astro 会自动优化：

```mdx
![图片说明](./示意图.png)
```

例如知识库演示文档 `src/content/docs/guides/example.md` 引用同目录的 `666.png`，即 `![...](./666.png)`。
同一张图若中英文都要用，分别在 `guides/` 和 `en/guides/` 各放一份（i18n 标准做法）。

**进阶做法**（仅 `.mdx`，可做更精细的尺寸 / 优化控制）：图片放 `src/assets/`，用 Starlight 的 `Image` 组件：

```mdx
import { Image } from '@astrojs/starlight/components';
import myImg from '../../assets/示意图.png';

<Image src={myImg} alt="图片说明" />
```

> 不要把图片直接扔在项目根目录；全局通用图标等可放 `public/`，以 `/xxx.png` 绝对路径引用。

### 4. 插入数学公式

项目已配置好数学渲染（`remark-math` + `rehype-katex`，写在 `astro.config.mjs` 的
`markdown.processor` 中，这是 Astro 7 官方推荐写法），直接写即可：

- 行内公式：`$E = mc^2$` 渲染为 $E = mc^2$
- 块级公式（独占一行、居中）：

```mdx
$$ \lambda = \frac{c}{f} $$
```

```mdx
$$ G_{\text{dB}} = 10 \log_{10}\!\left(\frac{P_{\text{out}}}{P_{\text{in}}}\right) $$
```

公式样式由 `src/styles/katex.css`（引入 KaTeX 官方 CSS）提供，已通过 `customCss` 接入，无需额外配置。

完整示例见 `src/content/docs/guides/example.md` 与 `src/content/docs/reference/example.md`。

## 相关链接

- 仓库地址：<https://github.com/XUPT-HAM/xupt-ham-website>
