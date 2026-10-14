import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightRosePine from 'starlight-theme-rose-pine';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

// https://starlight.astro.build/reference/configuration/
export default defineConfig({
	// `site` 是站点的正式部署域名，@astrojs/sitemap 集成（Starlight 内置）需要它才能生成 sitemap
	site: 'https://xupt-ham.example.com',
	// 关闭 Astro 自带的开发工具栏（dev 模式下浮现在页面底部的悬浮条）
	devToolbar: { enabled: false },
	// 数学公式渲染：Astro 7 推荐用 `unified` 处理器写法（Sätteri 时代不再直接用已弃用的 markdown.remarkPlugins）。
	// remark-math 解析 $...$（行内）与 $$...$$（块级），rehype-katex 负责渲染，样式见 customCss 中的 katex.css。
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex],
		}),
	},
	integrations: [
		starlight({
			plugins: [starlightRosePine()],
			title: '五九电波社',
			// 自定义全局样式（如首页卡片里的按钮样式 .club-btn）
			customCss: ['./src/styles/custom.css', './src/styles/katex.css'],
			// 默认语言放在站点根路径 `/`（不加前缀），这是 Astro/Starlight 推荐的 i18n 模式。
			// 用 `root` 伪语言承载默认语言，内容直接放在 src/content/docs/ 下；
			// 其它语言（如 en）才使用子文件夹 src/content/docs/en/。
			defaultLocale: 'root',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English', lang: 'en' },
			},
			// 使用 autogenerate 让侧边栏按各语言目录自动生成，链接会随 locale 正确切换，
			// 不会出现「英文版侧边栏指向中文页面」的问题。
			sidebar: [
				{ label: '开始', items: [{ autogenerate: { directory: 'start' } }] },
				{
				label: '操作证考试知识点',
				items: [
					{ label: '无线电管理法规', items: [{ autogenerate: { directory: 'exam/01-radio-regulation' } }] },
					{ label: '操作基础', items: [{ autogenerate: { directory: 'exam/02-operation' } }] },
					{ label: '收发信机与天线', items: [{ autogenerate: { directory: 'exam/03-transceiver-antenna' } }] },
					{ label: '电学基础', items: [{ autogenerate: { directory: 'exam/04-electronics' } }] },
					{ label: '发射设备与电磁环境', items: [{ autogenerate: { directory: 'exam/05-transmitter-emc' } }] },
				],
			},
				{ label: '通联部', items: [{ autogenerate: { directory: 'communication' } }] },
				{ label: '技术部', items: [{ autogenerate: { directory: 'technical' } }] },
				{
					label: '卫星部',
					items: [
						{ label: '关于卫星部', link: '/satellite/01-about-satellite/' },
						{ label: '追星方法', link: '/satellite/02-sat-chasing/' },
						{
							label: '慢扫描电视',
							items: [{ autogenerate: { directory: 'satellite/03-sstv' } }],
						},
						{ label: '测试', link: '/satellite/04-md-test/' },
					],
				},
			],
			// 覆盖默认 Header 组件，加入随语言切换的顶部导航（见 src/components/Header.astro）
			components: {
				Header: './src/components/Header.astro',
				Hero: './src/components/Hero.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
		}),
	],
});
