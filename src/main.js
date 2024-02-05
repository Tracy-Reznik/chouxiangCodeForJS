import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import routes from "@/routes/index.js";
import less from "less";

createApp(App).use(routes).use(less).mount('#app')
