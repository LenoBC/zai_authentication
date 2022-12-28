import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import vuetify from "./plugins/vuetify";

import BaseCard from "./components/ui/BaseCard.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.component("base-card", BaseCard);

app.mount("#app");
