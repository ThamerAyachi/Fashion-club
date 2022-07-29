import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./assets/style.css";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";
import "./icons";
import "animate.css";

createApp(App)
  .use(store)
  .component("fa-icon", FontAwesomeIcon)
  .component("fa-layer", FontAwesomeLayers)
  .component("fa-layer-text", FontAwesomeLayersText)
  .use(router)
  .mount("#app");
