import { defineConfig } from 'vite'

const path = require('path')

export default defineConfig({
  resolve: {
    alias: {
      '@jay.kou/tomato-editor-design': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'tomatoEditorDesign',
    },
    rollupOptions: {
      external: ['React'],
    },
  },
})
