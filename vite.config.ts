import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), viteEslint(), viteMockServe({ mockPath: 'mocks' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
