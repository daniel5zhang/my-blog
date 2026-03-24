import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { siteConfig } from './src/lib/site';

export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  vite: {
    ssr: {
      noExternal: ['pagefind'],
    },
  },
  typescript: {
    strict: true,
    strictNullChecks: true,
  },
});
