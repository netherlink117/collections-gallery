import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";

import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3TouchEvents);

app.mount("#app");
