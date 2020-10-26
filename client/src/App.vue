<template>
  <div id="app">
    <app-nav />
    <div class="app-container">
      <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
      <RouterView :key="$route.fullPath" />
      <FlashMessage :position="'right bottom'"></FlashMessage>
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
