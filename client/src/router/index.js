import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("../views/Posts/Posts.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/posts/create",
    name: "PostCreate",
    component: () => import("../views/Posts/PostCreate.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/posts/:id/show",
    name: "PostShow",
    component: () => import("../views/Posts/PostShow.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: () => import("../views/Posts/PostEdit.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: () => import("../views/Profile/ProfileEdit.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: () => import("../views/ContactUs.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/getIsLoggedIn"] == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    }
  }

  next();
});

export default router;
