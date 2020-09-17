import router from "@/router";
import axios from "@/axios";

const getters = {
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
  getUsername(state) {
    return state.user.username;
  }
};

const state = {
  expiresIn: null,
  token: null,
  user: {},
  isLoggedIn: false
};

const mutations = {
  authUser(state, { expiresIn, token }) {
    if (!expiresIn || !token) {
      state.expiresIn = null;
      state.token = null;
      state.isLoggedIn = false;
    } else {
      state.expiresIn = expiresIn;
      state.token = token;
      state.isLoggedIn = true;
    }
  },
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true;
    localStorage.setItem("led_user", JSON.stringify(user));
    localStorage.setItem("led_isLoggedIn", true);
  },
  logout(state) {
    state.user = {};
    localStorage.removeItem("led_user");
    localStorage.removeItem("led_isLoggedIn");
  },
  initStore(state) {
    if (localStorage.getItem("led_user")) {
      state.user = JSON.parse(localStorage.getItem("led_user"));
    }
    if (localStorage.getItem("led_isLoggedIn")) {
      state.isLoggedIn = true;
    }
  }
};

export const actions = {
  async login({ commit }, { username, password }) {
    const response = await axios.post(
      "http://localhost:3000/api/v1/login",
      { username, password },
      { withCredentials: true }
    );

    // @TODO error handling
    if (!response) return;

    commit("setUser", { ...response.data.user });

    router.push({ name: "Posts" });
  },
  async logout({ commit }) {
    const response = await axios.post(
      "http://localhost:3000/api/v1/logout",
      {},
      {
        withCredentials: true
      }
    );

    // @TODO error handling
    if (!response) return;

    commit("logout");

    router.push({ name: "Login" });
  },
  async updateUser({ commit }, payload) {
    const response = await axios.put("http://localhost:3000/api/v1/users", payload, {
      withCredentials: true,
      "Content-Type": "application/json"
    });

    // @TODO error handling
    if (!response) return;

    commit("setUser", response.data.user);

    router.push({ name: "Posts" });
  },
  async register() {}
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
