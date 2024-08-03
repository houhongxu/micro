import vue from '@vitejs/plugin-vue'
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
    origin: 'http://localhost:9000/',
  },
})
