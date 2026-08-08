/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/related': {
        target: 'https://api2.imdb4.shop',
        changeOrigin: true,
      },
      '/api/search2': {
        target: 'https://api2.imdb4.shop',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://api2.imdb3.shop',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});

