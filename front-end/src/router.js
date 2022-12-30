import { createRouter, createWebHistory } from "vue-router";

import UserAuth from "./pages/auth/UserAuth.vue";
import UserRegistration from "./pages/auth/UserRegistration.vue";
import UsersList from "./pages/users/UsersList.vue";
import UserEdit from "./pages/users/UserEdit.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

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
      meta: { requiresAuth: true },
    },
    {
      path: "/users/edit-account",
      component: UserEdit,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
