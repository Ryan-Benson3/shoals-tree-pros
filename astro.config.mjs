import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shoals-tree-pros.pages.dev',
  integrations: [
    // Sitemap = hubs + city + service×city pages only.
    // Leaf business profiles are discovered via internal links (pSEO standard).
    sitemap({
      filter: (page) => !page.includes('/business/'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
