import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      userList: null,
      totalPages: null,
    };
  },
  mutations,
  actions,
  getters,
};
