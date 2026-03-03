// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components/common'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      'config': path.resolve(__dirname, 'src/config'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@types': path.resolve(__dirname, 'src/types'),
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