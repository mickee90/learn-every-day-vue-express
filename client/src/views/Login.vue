<template>
  <div class="rounded-t-lg overflow-hidden px-3 py-10 bg-gray-200 flex justify-center">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <BaseLabel id="username" required>Username</BaseLabel>
          <BaseInput
            id="username"
            type="email"
            :class="{ 'border-red-500 mb-3': $v.username.$error }"
            required
            placeholder="Username"
            autocomplete="username"
            autofocus
            v-model="username"
          />
          <p v-if="$v.username.$error" class="text-red-500 text-xs italic">Enter your username.</p>
        </div>
        <div class="mb-6">
          <BaseLabel id="password" required>Password</BaseLabel>
          <BaseInput
            id="password"
            type="password"
            :class="{ 'border-red-500 mb-3': $v.password.$error }"
            required
            placeholder="******************"
            autocomplete="current-password"
            v-model="password"
            autofocus
          />
          <p v-if="$v.password.$error" class="text-red-500 text-xs italic">Enter your password.</p>
        </div>
        <div class="flex items-center justify-between">
          <BaseButton id="submitBtn" type="submit" @click.prevent="onSubmit">Login</BaseButton>
          <!-- <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>-->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();

      if (this.$v.username.$error || this.$v.password.$error) return;

      try {
        await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password
        });
      } catch (_) {
        this.username = "";
        this.password = "";
        // @todo handle errors
        // console.log(error);
      }
    }
  },
  created() {
    // this.$store.dispatch("auth/logout");
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    }
  }
};
</script>
