import { defineConfig } from 'vite';

export default defineConfig({
  server: { open: '/html/index.html' },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: { input: 'html/index.html' }
  }
});
