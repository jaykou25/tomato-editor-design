import { defineConfig } from 'vite'

const path = require('path')

export default defineConfig({
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
