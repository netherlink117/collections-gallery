import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "./http";

createApp(App).use(axios).use(store).use(router).mount("body");
