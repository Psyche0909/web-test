import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const qwenApiKey = env.QWEN_API_KEY || env.VITE_QWEN_API_KEY || ''

  return {
    plugins: [
      vue(),
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api/qwen-chat': {
          target: 'https://dashscope.aliyuncs.com',
          changeOrigin: true,
          secure: true,
          headers: qwenApiKey ? {
            Authorization: `Bearer ${qwenApiKey}`,
          } : undefined,
          rewrite: (path) => path.replace(/^\/api\/qwen-chat/, '/compatible-mode/v1/chat/completions'),
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
