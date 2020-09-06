<template>
  <div id="app">
    <app-nav />
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Layout/Nav";

export default {
  components: {
    "app-nav": Nav
  }
};
</script>
<style scoped>
.app-container {
  max-width: 600px;
  margin: 0 auto 50px auto;
}
</style>