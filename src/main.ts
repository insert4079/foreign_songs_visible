import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';

import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(pinia)
    .mount('#app')
