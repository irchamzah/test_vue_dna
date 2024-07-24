import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
