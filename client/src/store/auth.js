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
    const { data } = await axios.post("/login", { username, password });

    commit("setUser", { ...data.user });

    router.push({ name: "Posts" });
  },
  async logout({ commit }) {
    await axios.post("/logout");

    commit("logout");

    router.push({ name: "Login" });
  },
  async updateUser({ commit }, payload) {
    const { data } = await axios.put("/users", payload);

    commit("setUser", { ...data.user });

    router.push({ name: "Posts" });
  },
  async register({ _ }, payload) {
    await axios.post("/register", { ...payload, email: payload.username });

    router.push({ name: "Login" });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
