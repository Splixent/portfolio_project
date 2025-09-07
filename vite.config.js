import path from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Stop the pre-bundler from touching these native/server-only deps
  optimizeDeps: {
    exclude: ['fsevents', 'chokidar'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  // Make any accidental imports of these resolve to an empty module
  resolve: {
    alias: {
      fsevents: path.resolve(__dirname, 'src/empty-module.js'),
      chokidar: path.resolve(__dirname, 'src/empty-module.js'),
    },
  },
  build: {
    target: 'es2022', // or 'esnext'
  },
  base: command === 'build' ? '/portfolio-project/' : '/',
}));
