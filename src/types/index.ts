export interface SiteConfig {
  title: string;
  description: string;
  site: string;
}

export type SEOPageType = 'website' | 'article' | 'project';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: SEOPageType;
  publishedTime?: Date;
  updatedTime?: Date;
  keywords?: string[];
  noIndex?: boolean;
  canonicalPath?: string;
  schemaData?: Record<string, unknown>;
}

export interface NavItem {
  label: string;
  href: string;
}

export {};

declare global {
  interface Window {
    PagefindUI?: new (options: {
      element: string;
      showSubResults?: boolean;
      resetStyles?: boolean;
      translations?: Record<string, string>;
    }) => unknown;
  }
}
