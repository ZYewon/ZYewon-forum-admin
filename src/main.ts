import { createApp } from "vue";
import store from "./store";
import router from "./router";
import "./style.scss";
import "element-plus/dist/index.css";

import App from "./App.vue";

createApp(App).use(router).use(store).mount("#app");
