import axios from "@/axios";
import router from "@/router";

const getters = {
  getPosts(state) {
    return state.posts;
  },
  getPost(state) {
    return state.post;
  }
};

const state = {
  posts: [],
  post: null
};

const actions = {
  async init({ commit }) {
    const response = await axios.get("/posts");

    // @TODO error handling
    if (!response) return;

    commit("setPosts", response.data.posts);
  },

  /* eslint-disable-next-line */
  async createPost({}, payload) {
    const response = await axios.post("/posts", {
      title: payload.title,
      published_date: payload.published_date,
      content: payload.content
    });

    // @TODO error handling
    if (!response) return;

    router.push({
      name: "PostShow",
      params: { id: response.data.post.id }
    });
  },

  async fetchPost({ commit }) {
    const { id } = router.history.current.params;

    const response = await axios.get(`/posts/${id}`);

    // @TODO error handling
    if (!response) return;

    commit("setPost", response.data.post);
  },

  async deletePost({ commit, state }) {
    const response = await axios.delete(`/posts/${state.post.id}`);

    // @TODO error handling
    if (!response) return;

    commit("setPost", null);

    router.push({ name: "Posts" });
  },

  async editPost({ commit }, payload) {
    const response = await axios.put(`/posts/${payload.id}`, {
      title: payload.title,
      published_date: payload.published_date,
      content: payload.content
    });

    // @TODO error handling
    if (!response) return;

    commit("setPost", response.data.post);

    router.push({ name: "PostShow", params: { id: response.data.post.id } });
  }
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPost(state, post) {
    state.post = post;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
