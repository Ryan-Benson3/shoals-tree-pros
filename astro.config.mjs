import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shoals-tree-pros.pages.dev',
  integrations: [
    sitemap(),
  ],
  build: { inlineStylesheets: 'auto' },
});
