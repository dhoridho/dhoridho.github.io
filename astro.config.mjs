// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User page, served from the domain root, so no `base` is needed.
  site: 'https://dhoridho.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
});