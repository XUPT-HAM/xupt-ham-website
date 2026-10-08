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
│   ├── components/         # 自定义组件（如覆盖 Starlight 的 Header.astro）
│   ├── data/               # 结构化配置数据（如社员风采成员 members.ts）
│   ├── content/
│   │   ├── activities/     # 近期活动帖子（每篇一个 .md/.mdx，详见下方「发布一篇活动」）
│   │   ├── docs/           # 文档内容（知识库）
│   │   │   ├── en/         # 英文版文档
│   │   │   ├── start/      # 开始
│   │   │   ├── legislation/# 法律法规
│   │   │   ├── communication/ # 通联部
│   │   │   ├── technical/  # 技术部
│   │   │   ├── satellite/  # 卫星部
│   │   │   ├── guides/     # 指南
│   │   │   ├── reference/  # 参考
│   │   │   ├── 404.md      # 自定义 404 页面
│   │   │   └── index.mdx   # 首页（默认语言）
│   │   ├── i18n/           # UI 文案翻译（zh-CN.json / en.json）
│   │   └── content.config.ts  # 内容集合配置（activities / docs / i18n 三个集合）
│   ├── pages/             # 自定义页面路由（含 activities/ 活动列表与帖子详情）
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

## 发布一篇活动（近期活动子站）

「近期活动」是一个独立的博客式子站，位于 `src/content/activities/`。**每发布一篇活动，只需在内容目录里新建一个 Markdown 文件**，列表页与分页会自动汇总，无需改任何配置。

### 1. 在哪里建文件

在 `src/content/activities/` 下新建一个 `.md` 或 `.mdx` 文件：

- 文件名 = 该活动的 URL slug（不含扩展名）。
  - `src/content/activities/2026-10-08-field-day.md` → 访问地址 `/activities/2026-10-08-field-day/`
  - 也支持子目录，如 `src/content/activities/2026/field-day.md` → `/activities/2026/field-day/`（一般平铺即可）。
- 内容集合由 `src/content.config.ts` 里的 `activities` 定义（`glob` 加载器，自动匹配 `src/content/activities/**/*.{md,mdx}`）。

### 2. frontmatter 要设置什么

字段以 `src/content.config.ts` 的 schema 为准（当前为）：

| 字段          | 是否必填 | 说明 |
| ----------- | ---- | ---- |
| `title`     | 必填   | 活动标题，同时作为页面 H1 与列表卡片标题 |
| `description` | 选填 | 一句话简介，用于卡片摘要与 SEO；默认空 |
| `date`      | 必填   | 活动日期。写 `2026-10-08` 或 `2026-10-08T09:00:00` 均可（会被自动解析为 Date） |
| `cover`     | 选填   | 封面图路径，**相对于本 `.md` 文件**。推荐每篇建一个同名子目录集中放图，例如 `./2026-10-08-field-day/field-day-cover.png`（图片实际位于 `src/content/activities/2026-10-08-field-day/field-day-cover.png`）。显示在列表卡片右侧（窄屏自动变为顶部整宽）。留空则不显示封面 |
| `coverAlt`  | 选填   | 封面的替代文本（无障碍 / SEO）；缺省时回退到 `title` |

> 想加封面图、草稿（`draft`）等额外字段，需要在 `src/content.config.ts` 的 `activities` schema 中扩展（目前未启用 `draft` 隐藏逻辑）。

### 3. 正文怎么写

- 正文用普通 Markdown。帖子右侧的「本页内容」目录会**自动根据正文里的 `## 二级标题` 生成**，请按小节用 `##` 起头（例如 `## 活动概况`、`## 装备清单`、`## 活动流程`、`## 通联战果`、`## 报名下一次`）。
- 不要在正文里写 `# 一级标题`：页面大标题由 frontmatter 的 `title` 提供。
- 正文同样支持已配置好的数学公式（`$...$` / `$$...$$`）。

最小模板：

```markdown
---
title: 2026 秋季户外架设与通联活动（Field Day）
description: 社团秋季户外架设、应急通信演练与通联日志。
date: 2026-10-08
cover: ./2026-10-08-field-day/field-day-cover.png
coverAlt: 活动合影
---

## 活动概况

社团于……

## 装备清单

- 收发信机：……
- 天线：……

## 活动流程

1. ……
2. ……

## 通联战果

| 呼号 | 模式 | 备注 |
| ---- | ---- | ---- |
| BG9XXX | SSB | …… |

## 报名下一次

扫码或邮件报名……
```

### 4. 发布后

- 列表页 `/activities/` 会按 `date` **倒序**自动汇总，并在 `/activities/page/2/`、`/activities/page/3/` … 自动分页（由 `src/pages/activities/` 下的 `index.astro` 与 `page/[page].astro` 实现）。
- 帖子详情页由 `src/pages/activities/[slug].astro` 渲染，自带「← 返回活动列表」主题按钮与右侧真实目录。

预览：`pnpm dev`；构建：`pnpm build`。

## 社员风采页面（成员名片）

「社员风采」是一个独立页面（`/members/`），顶部导航可直接进入。页面**无左右侧边栏**，按分组展示网格状成员名片；每张名片左侧是圆形头像，**点击名片（或键盘聚焦后按回车）**会在屏幕中央弹出该成员的详细信息窗口，背景变暗并模糊，点右上角叉号、点击空白处或按 Esc 均可关闭。

### 1. 在哪里配置成员
所有成员数据集中在 `src/data/members.ts`：
- `memberSections`：页面分组数组，**顺序即展示顺序**。现含：现任管理层成员、2026 级、2025 级、2024 级、2023 级、校外友台。
- 每个分组下的 `members` 是 `Member` 对象数组。

### 2. 每个人能填哪些字段（全部选填）
`Member` 接口字段（在 `src/data/members.ts` 顶部定义）：

| 字段 | 含义 |
| --- | --- |
| `callSign` | 呼号，如 `BG9ABC` |
| `swl` | SWL（收听）呼号；没有正式呼号时填这个 |
| `nickname` | 网名 / 论坛 ID |
| `realName` | 真实姓名 |
| `school` | 学校 |
| `college` | 学院 |
| `className` | 班级 |
| `qth` | 现 QTH（常驻地） |
| `email` | E-mail（自动生成 `mailto:` 链接） |
| `qrz` | QRZ 主页（自动生成外链） |
| `blog` | 个人博客主页（自动生成外链） |
| `github` | GitHub 主页（完整 URL，自动生成外链） |
| `qq` | QQ 号 |
| `note` | 备注 |
| `motto` | 座右铭 |
| `avatar` | 头像路径，如 `/members/xupt-icon.png`；留空则用首字占位 |

名片默认只显示「主标识」：`呼号 > SWL 呼号 > 网名 ID > 真实姓名 > 匿名成员`；点开名片后展开所有**非空**字段。字段展示顺序由 `memberFields` 数组控制，可自行调整。

### 3. 头像放哪
统一放在 `public/members/` 目录（如 `public/members/xupt-icon.png`），`avatar` 填相对站点的绝对路径 `/members/文件名`。把图片丢进该目录、在 `members.ts` 里写对应路径即可，无需改页面代码。

### 4. 加一个人 / 加一个分组
- 加人：在对应分组的 `members` 数组里追加一个 `Member` 对象。
- 加分组：在 `memberSections` 数组里追加 `{ title: '新分组', members: [...] }`，位置决定展示先后。

预览：`pnpm dev`；构建：`pnpm build`。

## 友情链接页面（友链管理）

「友情链接」是一个独立页面（`/links/`），顶部导航栏可直接进入，使用 Starlight 的 `CardGrid` + `LinkCard` 两个组件，分成「校内」「校外」两组展示。

### 文件位置

- 中文：`src/pages/links.mdx`
- 英文：`src/pages/en/links.mdx`

> 页面用 `StarlightPage` 包裹且 `hasSidebar={false}`，因此不会进入左侧知识库目录树；入口只在顶部导航栏。

### 1. 增加一条友链

在对应分组（校内 / 校外）的 `<CardGrid>` 里追加一个 `<LinkCard>`：

```mdx
<LinkCard title="站点名称" description="一句话简介" href="https://example.com/" />
```

字段说明：

- `title`：卡片标题（站点名）。
- `description`：卡片描述（一句话即可）。
- `href`：跳转地址。站内路径写 `/xxx/`，外链写完整 `https://...`。

### 2. 修改一条友链

直接改对应 `<LinkCard>` 的 `title` / `description` / `href` 即可，保存后即时生效。

### 3. 删除一条友链

把对应的整行 `<LinkCard ... />` 删掉即可；若整个分组都不再需要，连 `<CardGrid> ... </CardGrid>` 一起删除。

预览：`pnpm dev`；构建：`pnpm build`。

## 知识库侧边栏：autogenerate（自动）与 手动 配置

左侧知识库导航在 `astro.config.mjs` 的 `starlight({ sidebar: [...] })` 中配置，是一个**顶层分组的数组**。每个分组可用「自动生成」或「手动列举」，也能两者混合。

### autogenerate（自动生成）

```js
{ label: '开始', autogenerate: { directory: 'start' } }
```

- 会把 `src/content/docs/start/` 下的所有页面**自动**收进该分组，**无需逐条登记**；新增/删除/改名文档文件即自动反映到侧边栏。
- 排序默认按文件名；如需自定义顺序，在对应文档的 frontmatter 写：

  ```md
  ---
  title: 某文档
  sidebar:
    order: 2   # 数字越小越靠前；也可用 label 覆盖显示名
  ---
  ```

### 手动 link（单条链接）

```js
{ label: '关于卫星部', link: '/satellite/01-about-satellite/' }
```

指向一个固定页面（可指向站内任意路径或外部 URL）。

### 手动 group（嵌套分组，可混合 autogenerate）

```js
{
  label: '卫星部',
  items: [
    { label: '关于卫星部', link: '/satellite/01-about-satellite/' },
    { label: 'SSTV 慢扫描电视', autogenerate: { directory: 'satellite/02-sstv' } },
    { label: '测试', link: '/satellite/03-md-test/' },
  ],
}
```

`items` 里既能放手动 `link`，也能再套 `autogenerate`（如上例的 SSTV 子目录）——这就是**「自动 + 手动混合」**的标准写法。

### 怎么选

- 某目录下文档会持续增长、希望免维护 → 用 `autogenerate`。
- 需要精确控制顺序、跨目录拼装、或放外部/跨语言链接 → 用 手动 `items` / `link`，其中局部仍可对某个子目录用 `autogenerate`。
- 多语言：autogenerate 会按当前语言目录自动切换链接；手动 `link` 是固定路径，双语站点需中英文各自配置或使用随语言切换的写法。

## 依赖升级与「自定义内容是否会保留」

### 结论：自定义内容会保留

本项目所有「自定义」都写在**源码目录**，不在 `node_modules` 里：

- `src/pages/`（含 `activities/` 活动子站、`about.mdx` 等自定义页）
- `src/components/`（覆盖 Starlight 的 `Header.astro` 等）
- `src/content/`（activities / docs / i18n 内容）
- `src/styles/`（custom.css / katex.css）
- `astro.config.mjs`、`src/content.config.ts`、`src/content/i18n/*`
- 本 README

`pnpm update` / `pnpm upgrade` 只会改写 `node_modules/` 与 `pnpm-lock.yaml`，**不会动 `src/` 下的任何文件**。因此活动子站、Header 覆盖、目录逻辑、样式全部保留。

### 唯一要注意的例外：大版本（major）升级

- Astro / Starlight 的**大版本**可能改动 API（组件 prop 名称、内容 loader 写法、配置项等）。升级后若 `pnpm build` 报错，按报错信息改对应源码即可（例如 `StarlightPage` 的 props、`tableOfContents` 字段、内容集合 loader）。
- 本仓库对 Starlight 的覆盖**只用公开支持的** `components: { Header }` 映射，未改写其内部组件，比直接覆盖内部文件更安全；但大版本后仍建议对照新版的 Header 组件复查 `src/components/Header.astro`。

### 升级命令

```bash
# 1) 仅更新到 package.json 范围内的最新兼容版本（补丁/次版本）
pnpm update

# 2) 升级到 Astro + 官方 @astrojs/* 集成（含 @astrojs/starlight）的最新版，可跨大版本
#    官方升级 CLI 会一并处理 astro 与各官方集成：
pnpm dlx @astrojs/upgrade
#    随后按 Starlight 升级指南复查配置：
#    https://starlight.astro.build/guides/upgrading/

# 3) 也可手动指定版本：
pnpm add @astrojs/starlight@latest astro@latest
```

升级后务必执行：`pnpm install` → `pnpm build` 验证无误；并把 `pnpm-lock.yaml` 提交进仓库以保证可复现。

> 环境要求：Node ≥ 24；升级前留意 Astro / Starlight 新版本的 Node 下限。

## 相关链接

- 仓库地址：<https://github.com/XUPT-HAM/xupt-ham-website>
