<template>
  <div class="lg:max-w-v-1/2 max-w-v-9/10 mx-auto">
    <div class="content">
      <div class="bg-white m-auto max-w-lg px-16 pb-16 pt-8 rounded-md w-full">
        <div class="pb-8">
          Please let us know if you have any questions or suggestions on how to improve Learn Every
          Day!
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <BaseLabel id="first_name" required>First name</BaseLabel>
            <BaseInput id="first_name" placeholder="First name" />
            <!-- class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" -->
            <!-- <p class="text-red-500 text-xs italic">
              Fältet är obligatoriskt
            </p>-->
          </div>
          <div class="w-full md:w-1/2 px-3">
            <BaseLabel id="last_name" required>Last name</BaseLabel>
            <BaseInput id="last_name" placeholder="Last name" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <BaseLabel for="username" required>Email</BaseLabel>
            <BaseInput id="-username" type="email" placeholder="Email" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <BaseLabel id="message" required>Message</BaseLabel>
            <textarea
              class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
            ></textarea>
          </div>
        </div>
        <div class="flex flex-wrap justify-end">
          <BaseButton @click="onSendForm">Send</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSendForm() {
      console.log("yo");
    }
  }
};
</script>
