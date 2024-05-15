import { defineConfig } from 'vite';
import postcssNesting from 'postcss-nesting';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagemin({
      include: '**/public/**/*'
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  }
})
