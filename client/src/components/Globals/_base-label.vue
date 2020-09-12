<template>
  <label :for="id" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    <slot /> <span class="required" v-if="required">*</span>
  </label>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
span.required {
  color: red;
}
</style>
