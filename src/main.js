import { createApp } from 'vue'
import App from './App.vue'
import { axiosConfig } from './axios.config'
import router from "@/router";

const app = createApp(App);
app.use(router);
app.mount('#app');

axiosConfig();
