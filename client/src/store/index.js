import { createStore } from "vuex";
import instance from "../axios";

import messages from "./messages";
import products from "./products";
import users from "./users";

export default createStore({
  state: {
    access_token: sessionStorage.getItem("access_token"),
    baseUrl: "http://localhost:3000/api/products/",
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.access_token = data.token;
      sessionStorage.setItem("access_token", data.token);
    },
    LOGOUT: (state) => {
      sessionStorage.removeItem("access_token");
      state.access_token = null;
    },
  },
  actions: {
    login: async ({ commit }, data) => {
      try {
        const res = await instance.post("auth/login", data);
        commit("SET_TOKEN", res.data);
        return res.data;
      } catch (err) {
        return err.response.data;
      }
    },
    logout: async ({ commit }) => {
      commit("LOGOUT");
    },
  },
  modules: {
    messages: messages,
    users: users,
    products: products,
  },
});
