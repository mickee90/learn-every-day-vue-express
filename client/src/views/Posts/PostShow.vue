<template>
  <div class="bg-white shadow p-3 rounded w-5/6 content-width m-auto" v-if="post !== null">
    <!-- <div>
      <div style="background-image: url('')" class="bg-cover bg-center bg-gray-300 h-32 rounded"></div>
    </div>-->
    <div>
      <div class="text-lg text-bold tracking-wide text-gray-800 mb-2" v-text="post.title"></div>
      <div
        class="text-sm text-gray-600 font-hairline mb-5 border-b pb-1"
        v-text="formatPublishedDate()"
      ></div>
      <div class="text-md text-bold tracking-wide text-gray-800" v-text="post.content"></div>
    </div>
    <div class="mt-6 text-right border-t pt-3">
      <router-link :to="{ name: 'PostEdit', params: { id: post.id } }" class="btn btn-blue mr-3"
        >Edit</router-link
      >
      <BaseButton class="btn-red" @click="deletePost">Delete</BaseButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { fullDateTime } from "../../helpers/DateTimes";
export default {
  computed: {
    ...mapState("posts", ["post"])
  },
  methods: {
    ...mapActions("posts", ["fetchPost", "deletePost"]),
    formatPublishedDate() {
      return fullDateTime(this.post.published_date);
    }
  },
  async created() {
    this.fetchPost();
  }
};
</script>
<style scoped>
.content-width {
  max-width: 600px;
}
</style>
