import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {register} from '@/services/register-sw.js'
import { createPinia } from 'pinia'

register();
// Hàm khởi tạo app
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
