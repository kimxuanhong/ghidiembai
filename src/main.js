import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'
import { createPinia } from 'pinia'
import '@/services/install.js'  // Import module cài đặt PWA

// Hàm khởi tạo app
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');

// Đăng ký service worker
registerSW({
  onNeedRefresh() {
    if (confirm('Có bản cập nhật mới. Tải lại trang?')) {
      window.location.reload()
    }
  },
  onOfflineReady() {
    console.log('App đã sẵn sàng hoạt động offline!')
  }
})