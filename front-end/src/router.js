import { createRouter, createWebHistory } from "vue-router";

import UserAuth from "./pages/auth/UserAuth.vue";
import UserRegistration from "./pages/auth/UserRegistration.vue";
import UsersList from "./pages/users/UsersList.vue"
import NotFound from "./pages/NotFound.vue";
//import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      component: UserAuth,
    },
    {
      path: "/register",
      component: UserRegistration,
    },
    {
      path: "/users",
      component: UsersList,
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
