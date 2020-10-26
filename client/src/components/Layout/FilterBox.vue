<template>
      <div class="flex justify-end mx-1">
        <div class="-mb-1 bg-white mr-1 p-2 rounded-t-lg">
          <div class="inline-block relative">
            <select v-model="currentSort" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option v-for="sort in sortItems" :value="sort.id" :key="sort.id" :selected="sort.id === currentSort" v-text="sort.title" />
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
</template>
<script>

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSort: 1,
      sortItems: [
        { id: 1, title: "Date - Desc", sortProp: 'published_date', sortType: 'desc' },
        { id: 2, title: "Date - Asc", sortProp: 'published_date', sortType: 'asc' },
        { id: 3, title: "Title - Desc", sortProp: 'title', sortType: 'desc' },
        { id: 4, title: "Title - Asc", sortProp: 'title', sortType: 'asc' },
      ]
    }
  },
  watch: {
    currentSort: function (newSort, oldSort) {
       const sortItem = this.sortItems.find(item => item.id === newSort);

        const posts = this.posts.slice(0).sort((a, b) => {
            let modifier = 1;
            if (sortItem.sortType === 'desc') modifier = -1;
            if (a[sortItem.sortProp] < b[sortItem.sortProp]) return -1 * modifier;
            if (a[sortItem.sortProp] > b[sortItem.sortProp]) return 1 * modifier;
            return 0;
        });

        this.$emit('postListSorted', posts);
    }
  },
  created() {
    return this.$emit('postListSorted', this.posts);
  }
};
</script>
