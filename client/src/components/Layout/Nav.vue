<template>
  <div>
    <div id="nav" class="flex items-center justify-between mb-10 shadow-md px-10">
      <div class="text-4xl font-bold">
        <router-link :to="{ name: startPage }" class="no-underline">Learn every day</router-link>
      </div>
      <nav class="nav flex items-center text-xl">
        <button href="#" id="menu-btn" @click="showMenu = !showMenu">
          <span v-if="isLoggedIn">{{ user.username }}</span>
          <div class="navbar-toggler-icon" :class="{ active: showMenu === true }">
            <div></div>
          </div>
        </button>
      </nav>
    </div>
    <nav id="nav-container" :class="{ show: showMenu }">
      <div id="backdrop" @click="showMenu = !showMenu"></div>
      <div class="nav">
        <ul class="navbar-nav ml-auto text-right text-xl">
          <li v-if="isLoggedIn" class="pt-6 px-6">
            <router-link :to="{ name: 'ProfileEdit' }" class="menu-item ml-3">My profile</router-link>
          </li>
          <li v-if="!isLoggedIn" class="pt-6 px-6">
            <router-link :to="{ name: 'Login' }" class="menu-item ml-3">Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="pt-6 px-6">
            <router-link :to="{ name: 'Register' }" class="menu-item ml-3">Register</router-link>
          </li>
          <li class="pt-6 px-6">
            <router-link :to="{ name: 'ContactUs' }" class="menu-item ml-3">Contact us</router-link>
          </li>
          <li v-if="isLoggedIn === true" class="pt-6 px-6">
            <button class="menu-item" @click.prevent="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Nav",
  data() {
    return {
      showMenu: false
    };
  },
  computed: {
    ...mapState("auth", ["user", "isLoggedIn"]),
    startPage() {
      return this.isAuth ? "Posts" : "Home";
    }
  },
  methods: {
    ...mapActions("auth", ["logout"])
  },
  mounted() {
    document.querySelectorAll(".menu-item").forEach(menuItem => {
      menuItem.addEventListener("click", () => {
        this.showMenu = false;
      });
    });
  },
  created() {
    console.log(this.isLoggedIn);
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
}
#menu-btn {
  background: transparent;
  border: 0;
  outline: 0;
}
#nav-container {
  height: 100%;
  position: fixed;
  top: 113px;
  width: 100%;
  z-index: 999999;
  margin-top: 1px;
  display: flex;
  transform: translateX(100%);
  transition: 300ms ease-in all;
}

#nav-container.show {
  transform: translateX(0);
  transition: 300ms ease-out all;
}

#nav-container .nav {
  flex: 0 0 80%;
  background: #fff;
  border-left: 1px solid #eee;
}

#backdrop {
  flex: 0 0 20%;
}

.navbar-nav {
  width: 50%;
}

.navbar-nav li {
  font-size: 1.5rem;
  line-height: 2rem;
}
.navbar-toggler-icon {
  margin-left: 15px;
  width: 30px;
}

.navbar-toggler-icon:after,
.navbar-toggler-icon:before,
.navbar-toggler-icon div {
  background-color: #000;
  border-radius: 3px;
  content: "";
  display: block;
  height: 5px;
  margin: 4px 0;
  transition: all 0.2s ease-in-out;
}

.navbar-toggler-icon.active:before {
  transform: translateY(6px) rotate(135deg);
}

.navbar-toggler-icon.active:after {
  transform: translateY(-12px) rotate(-135deg);
}

.navbar-toggler-icon.active div {
  transform: scale(0);
}

.menu-item {
  text-decoration: none;
  color: inherit;
}
</style>
