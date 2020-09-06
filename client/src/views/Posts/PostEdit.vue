<template>
  <div class="bg-white shadow p-3 rounded w-5/6 content-width m-auto" v-if="post !== null">
    <!-- <div>
      <div style="background-image: url('')" class="bg-cover bg-center bg-gray-300 h-32 rounded"></div>
    </div>-->
    <div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500 mb-3': $v.title.$error }"
          required
          placeholder="Title"
          autocomplete="title"
          autofocus
          v-model="post.title"
        />
        <p v-if="$v.title.$error" class="text-red-500 text-xs italic">Enter a title.</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Date</label>
        <input
          id="date"
          type="date"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500 mb-3': $v.title.$error }"
          required
          placeholder="Date"
          autocomplete="date"
          autofocus
          :value="formatPublishedDate()"
          @change="(event) => post.published_date = event.target.value"
        />
        <p v-if="$v.published_date.$error" class="text-red-500 text-xs italic">Enter a date.</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Content</label>
        <textarea
          id="content"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500 mb-3': $v.content.$error }"
          required
          v-model="post.content"
          rows="10"
        ></textarea>
        <p v-if="$v.content.$error" class="text-red-500 text-xs italic">Enter content.</p>
      </div>
    </div>
    <div class="mt-6 text-right border-t pt-3">
      <button class="btn btn-green" @click="onSave">Save</button>
      <button class="btn btn-yellow" @click="onCancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { fullDate } from "../../helpers/DateTimes";
import { required } from "vuelidate/lib/validators";

export default {
  computed: {
    ...mapState("posts", ["post"])
  },
  methods: {
    ...mapActions("posts", ["editPost"]),
    formatPublishedDate() {
      return fullDate(this.post.published_date);
    },
    async onSave() {
      this.editPost({
        id: this.post.id,
        title: this.post.title,
        published_date: this.post.published_date,
        content: this.post.content
      });
    },
    onCancel() {
      this.$router.back();
    }
  },
  async created() {
    this.fetchPost();
  },
  validations: {
    title: {
      required
    },
    published_date: {
      required
    },
    content: {
      required
    }
  }
};
</script>
<style scoped>
.content-width {
  max-width: 600px;
}
</style>