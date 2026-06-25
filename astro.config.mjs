import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kasankala.com',
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "de", "fr", "it"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});