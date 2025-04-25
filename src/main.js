import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import { db } from '@/firebase/firebase-config.js'


// Hàm khởi tạo app
const app = createApp(App);
app.use(router);
app.mount('#app');
