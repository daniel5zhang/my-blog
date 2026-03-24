const fallbackSiteUrl = 'https://example.com';

const normalizeUrl = (value?: string) => {
  if (!value) return fallbackSiteUrl;

  try {
    return new URL(value).toString().replace(/\/$/, '');
  } catch {
    return fallbackSiteUrl;
  }
};

const resolvedSiteUrl = normalizeUrl(import.meta.env.PUBLIC_SITE_URL);

export const siteConfig = {
  title: import.meta.env.PUBLIC_SITE_TITLE || 'Daniel实验室',
  description:
    import.meta.env.PUBLIC_SITE_DESCRIPTION ||
    'Daniel实验室，持续观察 AI、自动化与数字工作流的变化，记录值得长期复用的方法、工具和判断。',
  siteUrl: resolvedSiteUrl,
  author: import.meta.env.PUBLIC_AUTHOR || 'Daniel',
  locale: import.meta.env.PUBLIC_SITE_LOCALE || 'zh-CN',
  defaultOgImage: import.meta.env.PUBLIC_DEFAULT_OG_IMAGE || '/og-default.svg',
  tagline:
    import.meta.env.PUBLIC_SITE_TAGLINE ||
    'AI、自动化与数字工作流观察',
};

export const topicConfig = [
  {
    slug: 'ai-observation',
    title: 'AI观察',
    description: '围绕 AI 产品、模型、行业动态与真实落地影响的持续观察。',
  },
  {
    slug: 'automation',
    title: '自动化实践',
    description: '聚焦工作流自动化、Agent 使用方式与效率系统的实践记录。',
  },
  {
    slug: 'digital-workflow',
    title: '数字工作流',
    description: '记录数字工具链、内容系统、个人知识管理与工作方式升级。',
  },
];

export const giscusConfig = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO || '',
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID || '',
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY || '',
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || '',
  mapping: import.meta.env.PUBLIC_GISCUS_MAPPING || 'pathname',
  theme: import.meta.env.PUBLIC_GISCUS_THEME || 'preferred_color_scheme',
  lang: import.meta.env.PUBLIC_GISCUS_LANG || 'zh-CN',
  inputPosition: import.meta.env.PUBLIC_GISCUS_INPUT_POSITION || 'top',
  reactionsEnabled: import.meta.env.PUBLIC_GISCUS_REACTIONS_ENABLED || '1',
  emitMetadata: import.meta.env.PUBLIC_GISCUS_EMIT_METADATA || '0',
};

export const isGiscusEnabled = Boolean(
  giscusConfig.repo &&
    giscusConfig.repoId &&
    giscusConfig.category &&
    giscusConfig.categoryId,
);

export const siteTitle = siteConfig.title;
export const siteDescription = siteConfig.description;
export const siteUrl = siteConfig.siteUrl;
export const siteAuthor = siteConfig.author;
