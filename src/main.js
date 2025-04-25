import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {register} from '@/services/register-sw.js'


register();
// Hàm khởi tạo app
const app = createApp(App);
app.use(router);
app.mount('#app');
