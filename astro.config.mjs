import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "de", "fr", "it"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
