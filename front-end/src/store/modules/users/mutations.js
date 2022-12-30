export default {
  setUser(state, payload) {
    state.user = payload;
  },
  setUserList(state, payload) {
    state.userList = payload;
  },
  setTotalPages(state, payload) {
    state.totalPages = payload;
  },
};
