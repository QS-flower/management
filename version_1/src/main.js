import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/global.css'
import router from './router/router';
import store from './store'
const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
