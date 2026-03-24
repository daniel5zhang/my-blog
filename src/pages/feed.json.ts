import { getCollection } from 'astro:content';
import { siteConfig } from '../lib/site';

export async function GET() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const items = articles
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
    .map((article) => ({
      id: `${siteConfig.siteUrl}/articles/${article.slug}/`,
      url: `${siteConfig.siteUrl}/articles/${article.slug}/`,
      title: article.data.title,
      content_text: article.body,
      summary: article.data.summary,
      date_published: article.data.publishedAt.toISOString(),
      date_modified: (article.data.updatedAt ?? article.data.publishedAt).toISOString(),
      tags: [article.data.category, ...article.data.tags].filter(Boolean),
    }));

  return new Response(
    JSON.stringify(
      {
        version: 'https://jsonfeed.org/version/1.1',
        title: siteConfig.title,
        home_page_url: siteConfig.siteUrl,
        feed_url: `${siteConfig.siteUrl}/feed.json`,
        description: `${siteConfig.description} - 最新文章订阅`,
        language: siteConfig.locale,
        items,
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8',
      },
    },
  );
}
