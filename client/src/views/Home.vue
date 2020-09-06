<template>
  <div class="lg:max-w-v-1/2 max-w-v-9/10 mx-auto">
    <div class="content">
      <div class="bg-white m-auto max-w-lg px-16 pb-16 pt-8 rounded-md w-full">
        <h1>Welcome!</h1>
        <div>
          Learn every day is a application which allow you to fast and easy write down things you have learned during the day.
          <br />It could be anything from a solution to a task on the job, how to sew a bag or how to slice an onion.
          <br />
          <br />Set notifications to help you remember to reflect each evening what you have heard and read during the day.
          <br />
          <br />You have a 5000% greater chance to remember what you have learned by writing it down. True story.
        </div>
        <div class="flex justify-between mt-5">
          <router-link :to="{name: 'Login'}" class="btn btn-blue">Login</router-link>
          <router-link :to="{name: 'Register'}" class="btn btn-green">Register</router-link>
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
