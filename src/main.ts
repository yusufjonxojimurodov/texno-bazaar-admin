import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/main.css"
import { createPinia } from "pinia";
import router from "./router";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Antd)

app.mount("#app");
