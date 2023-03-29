import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Popper from "vue3-popper";

import './assets/style.scss'

const app = createApp(App)

app.use(router)
app.use(Popper)

app.mount('#app')
