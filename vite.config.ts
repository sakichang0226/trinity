import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api/v1/products': {
          target: env.VITE_PRODUCTS_API_URL || 'http://localhost:8081',
          changeOrigin: true,
        },
        '/api/v1/orders': {
          target: env.VITE_ORDERS_API_URL || 'http://localhost:8082',
          changeOrigin: true,
        },
        '/api': {
          target: env.VITE_USERS_API_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
