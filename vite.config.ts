// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'config': path.resolve(__dirname, 'src/config'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'utils': path.resolve(__dirname, 'src/utils'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/variables" as *;`,
        loadPaths: [path.resolve(__dirname, 'src')]
      }
    }
  }
})