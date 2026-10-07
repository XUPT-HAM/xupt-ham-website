import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// https://starlight.astro.build/reference/configuration/
export default defineConfig({
	// `site` 是站点的正式部署域名，@astrojs/sitemap 集成（Starlight 内置）需要它才能生成 sitemap
	site: 'https://xupt-ham.example.com',
	integrations: [
		starlight({
			title: '西邮五九电波社',
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
				{ label: '指南', items: [{ autogenerate: { directory: 'guides' } }] },
				{ label: '参考', items: [{ autogenerate: { directory: 'reference' } }] },
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/' }],
		}),
	],
});
