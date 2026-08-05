// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Custom apex domain, served from the root, so no `base` is needed even though
  // the repo is no longer named <user>.github.io.
  site: 'https://ridhokurnia.my.id',

  vite: {
    plugins: [tailwindcss()]
  }
});