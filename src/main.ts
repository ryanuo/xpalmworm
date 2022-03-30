/*
 * @Author: Harry
 * @Date: 2021-11-27 20:50:49
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-30 15:27:32
 * @FilePath: \xpalmworm\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'animate.css';
import Cookie from './utils/samll/cookieConfig'
const app = createApp(App)
app.config.globalProperties.$cookie = Cookie;
// app.component('ElImage', {
//   emits: ['click', 'submit']
// })
app.use(ElementPlus);
app.use(store)
app.use(router)
app.mount('#app')
