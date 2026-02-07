import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_URL || '/valentines-game/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
