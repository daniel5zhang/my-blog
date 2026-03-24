import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../lib/site';

export async function GET(_context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  // 统一处理 item 数据
  const articleItems = articles.map((article) => ({
    id: `article-${article.slug}`,
    url: `${siteConfig.siteUrl}/articles/${article.slug}/`,
    title: article.data.title,
    summary: article.data.summary,
    content_text: article.data.summary,
    date_published: article.data.publishedAt.toISOString(),
    date_modified: (article.data.updatedAt || article.data.publishedAt).toISOString(),
    tags: article.data.tags,
    _type: 'article',
  }));

  const projectItems = projects.map((project) => ({
    id: `project-${project.slug}`,
    url: `${siteConfig.siteUrl}/projects/${project.slug}/`,
    title: project.data.name,
    summary: project.data.summary,
    content_text: project.data.summary,
    date_published: project.data.publishedAt.toISOString(),
    date_modified: (project.data.updatedAt || project.data.publishedAt).toISOString(),
    tags: project.data.tags,
    _type: 'project',
  }));

  // 合并并按时间倒序排序
  const allItems = [...articleItems, ...projectItems].sort(
    (a, b) => new Date(b.date_modified).valueOf() - new Date(a.date_modified).valueOf()
  );

  const feed = {
    version: 'https://jsonfeed.org/version/1',
    title: siteConfig.title,
    home_page_url: siteConfig.siteUrl,
    feed_url: `${siteConfig.siteUrl}/feed.json`,
    description: siteConfig.description,
    author: {
      name: siteConfig.author,
    },
    items: allItems.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.title,
      summary: item.summary,
      content_text: item.content_text,
      date_published: item.date_published,
      date_modified: item.date_modified,
      tags: item.tags,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}