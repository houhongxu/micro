import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), qiankun('micro-vue', { useDevMode: true })],
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 9000,
    origin: 'http://localhost:9000/', // 微前端环境开发时支持图片等资源 https://github.com/tengmaoqing/vite-plugin-qiankun/issues/9
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
})
