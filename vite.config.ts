import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ 获取 __dirname 等效值
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy:{
        '/api/qinghua': {
            target: 'https://api.uomg.com', // 目标服务器地址
            changeOrigin: true, // 是否改变源
            rewrite: (path) => path.replace(/^\/api\/qinghua/, '/api/rand.qinghua') // 重写路径
        }
    }
  },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
