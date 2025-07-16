// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router  from "./routers/router.ts";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文语言包


import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persistedstate'

const app = createApp(App)
for (const [key,component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(ElementPlus,{
    locale: zhCn, // 设置 Element Plus 的语言为中文
    size: 'default', // 设置默认尺寸
})
app.use(router)

app.mount('#app')