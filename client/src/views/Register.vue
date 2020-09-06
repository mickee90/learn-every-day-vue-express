<template>
  <div class="lg:max-w-v-1/2 max-w-v-9/10 mx-auto">
    <div class="content">
      <div class="bg-white m-auto max-w-lg p-16 rounded-md w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              for="grid-first-name"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              First name
              <span class="required">*</span>
            </label>
            <input
              id="grid-first-name"
              type="text"
              placeholder="First name"
              v-model="firstName"
              :class="{ 'border-red-500': $v.firstName.$error }"
              @blur="$v.firstName.$touch()"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p v-if="$v.firstName.$error" class="text-red-500 text-xs italic">
              Enter your first name
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              for="grid-last-name"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Last name
              <span class="required">*</span>
            </label>
            <input
              id="grid-last-name"
              type="text"
              placeholder="Last name"
              v-model="lastName"
              :class="{ 'border-red-500': $v.lastName.$error }"
              @blur="$v.lastName.$touch()"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p v-if="$v.lastName.$error" class="text-red-500 text-xs italic">
              Enter your last name
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              for="grid-username"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Username (email)
              <span class="required">*</span>
            </label>
            <input
              id="grid-username"
              type="email"
              placeholder="Username"
              v-model="username"
              :class="{ 'border-red-500': $v.username.$error }"
              @blur="$v.username.$touch()"
              class="appearance-none block w-full bg-gray-200 text-gray-700 mb-3 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p v-if="$v.username.$error" class="text-red-500 text-xs italic">
              Enter a username
            </p>
            <p class="text-gray-600 text-xs italic">
              Only valid email addresses is allowed as username.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              for="grid-password"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Password
              <span class="required">*</span>
            </label>
            <input
              id="grid-password"
              type="password"
              placeholder="******************"
              v-model="password"
              :class="{ 'border-red-500': $v.password.$error }"
              @blur="$v.password.$touch()"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p v-if="$v.password.$error" class="text-red-500 text-xs italic">
              The password do not meet the requirements
            </p>
            <p class="text-gray-600 text-xs italic">
              Requires at least {{ $v.password.$params.minVal }} characters
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              for="grid-confirm-password"
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Confirm password
              <span class="required">*</span>
            </label>
            <input
              id="grid-confirm-password"
              type="password"
              placeholder="******************"
              v-model="confirmPassword"
              :class="{ 'border-red-500': $v.confirmPassword.$error }"
              @blur="$v.confirmPassword.$touch()"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <p v-if="$v.confirmPassword.$error" class="text-red-500 text-xs italic">
              The password do not meet the requirements
            </p>
          </div>
        </div>
        <div class="flex justify-end items-center">
          <div class>
            <div class="relative">
              <button class="btn btn-blue" @click="onRegister">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onRegister() {
      this.$v.$touch();

      if (this.$v.$error) return;

      this.$store.dispatch("auth/register", {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      });
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    username: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  }
};
</script>

<style scoped>
.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}

input.invalid {
  border: 1px solid red;
  background-color: #ffc9aa;
}

span.required {
  color: red;
}
</style>
