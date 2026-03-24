import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../lib/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: siteConfig.title,
    description: `${siteConfig.description} - 最新文章订阅`,
    site: context.site ?? siteConfig.siteUrl,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.summary,
      pubDate: article.data.publishedAt,
      link: `/articles/${article.slug}/`,
      categories: [article.data.category, ...article.data.tags].filter(
        (value): value is string => Boolean(value),
      ),
    })),
    customData: `<language>${siteConfig.locale}</language>`,
  });
}
