import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightRosePine from 'starlight-theme-rose-pine';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

// https://starlight.astro.build/reference/configuration/
export default defineConfig({
	// `site` 是站点的正式部署域名，@astrojs/sitemap 集成（Starlight 内置）需要它才能生成 sitemap
	site: 'https://xupt-ham.pages.dev',
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
		sitemap(),
		starlight({
			plugins: [starlightRosePine()],
			title: '五九电波社',
			// 站点图标：改用 src/assets/club-icon.png 的副本（放在 public/ 下才能被直接引用）
			favicon: '/club-icon.png',
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
				{ label: '开始', collapsed: true, items: [{ autogenerate: { directory: 'start' } }] },
				{
					label: '操作证考试知识点',
					collapsed: true,
					items: [
						{ label: '无线电管理法规', collapsed: true, items: [{ autogenerate: { directory: 'exam/01-radio-regulation' } }] },
						{ label: '操作基础', collapsed: true, items: [{ autogenerate: { directory: 'exam/02-operation' } }] },
						{ label: '收发信机与天线', collapsed: true, items: [{ autogenerate: { directory: 'exam/03-transceiver-antenna' } }] },
						{ label: '电学基础', collapsed: true, items: [{ autogenerate: { directory: 'exam/04-electronics' } }] },
						{ label: '发射设备与电磁环境', collapsed: true, items: [{ autogenerate: { directory: 'exam/05-transmitter-emc' } }] },
					],
				},
				{
					label: '通联部',
					collapsed: true,
					items: [
						{ label: '关于通联部', link: '/communication/01-about-communication/' },
						{
							label: 'U/V段超短波通联',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/01-uv-comm' } }],
						},
						{
							label: 'QSL卡',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/02-qsl' } }],
						},
						{
							label: '短波通联',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/03-shortwave' } }],
						},
						{
							label: '莫尔斯电码（CW）',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/04-cw' } }],
						},
						{
							label: 'FT8 数字模式',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/05-ft8' } }],
						},
						{
							label: 'C4FM（Fusion 数字语音）',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/06-c4fm' } }],
						},
						{
							label: 'FMO 互联网模拟通联',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/07-fmo' } }],
						},
						{
							label: 'MMDVM 数字热点',
							collapsed: true,
							items: [{ autogenerate: { directory: 'communication/08-mmdvm' } }],
						},
					],
				},
				{
					label: '技术部',
					collapsed: true,
					items: [
						{ label: '关于技术部', link: '/technical/01-about-technical/' },
						{
							label: '国家授时中心守听',
							collapsed: true,
							items: [{ autogenerate: { directory: 'technical/01-national-time-center' } }],
						},
						{
							label: '自动位置报告系统',
							collapsed: true,
							items: [{ autogenerate: { directory: 'technical/02-aprs' } }],
						},
						{
							label: 'SDR 软件无线电',
							collapsed: true,
							items: [{ autogenerate: { directory: 'technical/03-sdr' } }],
						},
						{
							label: 'QRP 低功率',
							collapsed: true,
							items: [{ autogenerate: { directory: 'technical/04-qrp' } }],
						},
						{
							label: '天线',
							collapsed: true,
							items: [
								{ label: '偶极天线', collapsed: true, items: [{ autogenerate: { directory: 'technical/05-antenna/01-dipole' } }] },
								{ label: 'GP 天线', collapsed: true, items: [{ autogenerate: { directory: 'technical/05-antenna/02-gp' } }] },
								{ label: '八木天线', collapsed: true, items: [{ autogenerate: { directory: 'technical/05-antenna/03-yagi' } }] },
								{ label: '螺旋天线', collapsed: true, items: [{ autogenerate: { directory: 'technical/05-antenna/04-helical' } }] },
							],
						},
						{
							label: '无线电测向',
							collapsed: true,
							items: [{ autogenerate: { directory: 'technical/06-ardf' } }],
						},
					],
				},
				{
					label: '卫星部',
					collapsed: true,
					items: [
						{ label: '关于卫星部', link: '/satellite/01-about-satellite/' },
						{ label: '追星方法', link: '/satellite/02-sat-chasing/' },
						{
							label: 'AAAA 天文与天体学',
							collapsed: true,
							items: [{ autogenerate: { directory: 'satellite/01-astronomy' } }],
						},
						{
							label: '慢扫描电视',
							collapsed: true,
							items: [{ autogenerate: { directory: 'satellite/03-sstv' } }],
						},
						{
							label: '数字视频',
							collapsed: true,
							items: [{ autogenerate: { directory: 'satellite/04-ssdv' } }],
						},
						{
							label: '卫星通联',
							collapsed: true,
							items: [{ autogenerate: { directory: 'satellite/05-sat-comm' } }],
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
