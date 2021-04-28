import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "./http";

require("@/assets/styles.sass");
createApp(App).use(axios).use(store).use(router).mount("body");
