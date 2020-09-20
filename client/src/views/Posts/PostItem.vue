<template>
  <router-link
    :to="{ name: 'PostShow', params: { id: post.id } }"
    class="w-full p-1 m-auto block post-item"
  >
    <div class="bg-white border rounded shadow p-2">
      <div class="flex flex-row items-center">
        <div class="flex-shrink pr-4"></div>
        <div class="flex-1 text-right pr-3">
          <h5 class="font-bold uppercase text-gray-500" v-text="formatPublishedDate(post)"></h5>
          <h3 class="font-bold text-3xl" v-text="formatTitle(post)"></h3>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
import { fullDate } from "../../helpers/DateTimes";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatTitle(post) {
      return post.title;
    },
    formatPublishedDate(post) {
      const published_date = fullDate(post.published_date);
      const current_date = fullDate(new Date());
      return published_date === current_date ? "Today" : published_date;
    }
  }
};
</script>
