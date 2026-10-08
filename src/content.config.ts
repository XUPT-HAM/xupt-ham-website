import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// 近期活动（博客式）内容集合：每篇活动帖放在 src/content/activities/ 下
const activities = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string().default(''),
		date: z.coerce.date(),
		cover: image().optional(),
		coverAlt: z.string().optional(),
	}),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
	activities,
};
