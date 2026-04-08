import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const qwenAppId = env.QWEN_APP_ID || env.VITE_QWEN_APP_ID || ''
  const qwenApiKey = env.QWEN_API_KEY || env.VITE_QWEN_API_KEY || ''

  return {
    plugins: [
      vue(),
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api/qwen-agent': {
          target: 'https://dashscope.aliyuncs.com',
          changeOrigin: true,
          secure: true,
          headers: qwenApiKey ? {
            Authorization: `Bearer ${qwenApiKey}`,
          } : undefined,
          rewrite: (path) => path.replace(/^\/api\/qwen-agent/, `/api/v1/apps/${qwenAppId}/completion`),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
