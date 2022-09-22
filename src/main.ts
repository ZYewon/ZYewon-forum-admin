import { createApp } from "vue";
import store from "./store";
import router from "./router";
import "./style.scss";
import "element-plus/dist/index.css";
import elementIcon from "@/plugins/element-icon";
import directive from "@/directive";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(elementIcon);
app.use(directive);
app.mount("#app");
