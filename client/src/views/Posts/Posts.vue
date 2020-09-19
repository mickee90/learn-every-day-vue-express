<template>
  <div class="h-screen relative">
    <div v-if="posts === null">Loader</div>
    <div v-else-if="posts.length === 0">You have not created any posts yet.</div>
    <div v-else>
      <PostItem v-for="post in posts" :key="post.id" :post="post"></PostItem>
    </div>
    <div class="flex justify-end">
      <router-link
        id="create_post_btn"
        class="bg-blue-400 flex h-16 hover:bg-blue-600 items-center justify-center no-underline p-5 right-0 rounded-full sticky text-white w-16"
        :to="{ name: 'PostCreate' }"
        >New</router-link
      >
    </div>
  </div>
</template>
<script>
import PostItem from "./PostItem";
import { mapState, mapActions } from "vuex";

export default {
  components: { PostItem },
  computed: {
    ...mapState("auth", ["user", "isLoggedIn"]),
    ...mapState("posts", ["posts"])
  },
  methods: {
    ...mapActions("posts", ["init"])
  },
  async created() {
    this.init();
  }
};
</script>
