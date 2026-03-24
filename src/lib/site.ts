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
  title: import.meta.env.PUBLIC_SITE_TITLE || 'My Site',
  description:
    import.meta.env.PUBLIC_SITE_DESCRIPTION ||
    'Daniel 的个人网站，持续发布文章、项目与实践记录。',
  siteUrl: resolvedSiteUrl,
  author: import.meta.env.PUBLIC_AUTHOR || 'Daniel',
  locale: import.meta.env.PUBLIC_SITE_LOCALE || 'zh-CN',
  defaultOgImage: import.meta.env.PUBLIC_DEFAULT_OG_IMAGE || '/og-default.svg',
};

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
