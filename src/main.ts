import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from './http'
import 'animate.css';
import Cookie from './utils/cookieConfig'

const app = createApp(App)

// 全局挂载axios
console.log(process.env.VUE_APP_URL);
axios.defaults.baseURL = process.env.VUE_APP_URL
app.config.globalProperties.$http = axios;
app.config.globalProperties.$cookie = Cookie;

app.use(ElementPlus);
app.use(store)
app.use(router)
app.mount('#app')
