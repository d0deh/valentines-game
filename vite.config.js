import { defineConfig } from 'vite';

export default defineConfig({
  // Change 'valentines-game' to your GitHub repo name
  base: '/valentines-game/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
  },
});
