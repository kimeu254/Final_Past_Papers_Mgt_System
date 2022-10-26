import './bootstrap';
import '../sass/app.scss'
import '../css/app.css'
import Router from '@/router'
import store from '@/store'

import "mdi-icons/css/materialdesignicons.min.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue/dist/vue.esm-bundler';

const app = createApp({})
app.use(Router)
app.use(store)
app.use(VueSweetalert2)
app.mount('#app')