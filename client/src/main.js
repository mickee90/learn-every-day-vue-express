import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Vuelidate from "vuelidate";

import router from "./router";
import store from "./store";

import "./assets/styles/index.css";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit("auth/initStore");
  }
}).$mount("#app");
