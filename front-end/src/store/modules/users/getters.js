export default {
  user(state) {
    return state.user;
  },
  userList(state) {
    return state.userList;
  },
  hasUserList(state) {
    return state.userList && state.userList.length > 0;
  },
  totalPages(state) {
    return state.totalPages;
  },
};
