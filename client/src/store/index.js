import { createStore } from "vuex";

import messages from "./messages";
import users from "./users";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    messages: messages,
    users: users,
  },
});
