import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './config/yup';

import { VueQueryPlugin } from '@tanstack/vue-query'


const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(Toast)
app.use(router)


app.mount('#app')
