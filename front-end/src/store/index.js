import { createStore } from "vuex";

import UsersModule from "./modules/users/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    users: UsersModule,
    auth: authModule,
  },
});

export default store;
