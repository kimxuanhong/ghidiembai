import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ghidiembai/',
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,json,woff,woff2,ttf,eot,otf}'
        ],
        navigateFallback: '/ghidiembai/index.html',
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              // Cache tất cả các yêu cầu
              return true;
            },
            handler: 'CacheFirst', // Ưu tiên cache, chỉ request mạng khi không có trong cache
            options: {
              cacheName: 'app-permanent-cache',
              expiration: {
                maxEntries: 500,
                // Không đặt maxAgeSeconds để giữ cache vĩnh viễn
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Ghi Điểm Bài',
        short_name: 'GhiBai',
        description: 'Ứng dụng ghi điểm ván bài',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/ghidiembai/',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
