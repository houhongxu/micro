import react from '@vitejs/plugin-react'
import { sharedConfig } from 'shared-config'
import { defineConfig } from 'vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteExternalsPlugin(sharedConfig['dev']['externals'])],
})
