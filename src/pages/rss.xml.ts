import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../lib/site';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  // 统一处理 item 数据
  const articleItems = articles.map((article) => ({
    title: article.data.title,
    description: article.data.summary,
    link: `/articles/${article.slug}/`,
    pubDate: article.data.updatedAt || article.data.publishedAt,
    customData: `<content:encoded><![CDATA[${article.data.summary}]]></content:encoded>`,
    categories: article.data.tags,
    author: siteConfig.author,
  }));

  const projectItems = projects.map((project) => ({
    title: project.data.name,
    description: project.data.summary,
    link: `/projects/${project.slug}/`,
    pubDate: project.data.updatedAt || project.data.publishedAt,
    customData: `<content:encoded><![CDATA[${project.data.summary}]]></content:encoded>`,
    categories: project.data.tags,
    author: siteConfig.author,
  }));

  // 合并并按时间倒序排序
  const allItems = [...articleItems, ...projectItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: allItems.map((item) => ({
      title: item.title,
      description: item.description,
      link: item.link,
      pubDate: item.pubDate,
      customData: item.customData,
      categories: item.categories,
      author: item.author,
    })),
    customData: `<language>${siteConfig.locale}</language>`,
  });
}