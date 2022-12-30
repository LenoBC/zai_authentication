import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import vuetify from "./plugins/vuetify";

import BaseCard from "./components/ui/BaseCard.vue";

library.add(faPenToSquare);
library.add(faTrash);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.component("base-card", BaseCard);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
