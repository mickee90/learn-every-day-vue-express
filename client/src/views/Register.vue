<template>
  <div class="lg:max-w-v-1/2 max-w-v-9/10 mx-auto">
    <div class="content">
      <div class="bg-white m-auto max-w-lg p-16 rounded-md w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <BaseLabel id="first_name" required>First name</BaseLabel>
            <BaseInput
              id="first_name"
              placeholder="First name"
              v-model="first_name"
              :class="{ 'border-red-500': $v.first_name.$error }"
              @blur="$v.first_name.$touch()"
            />
            <p v-if="$v.first_name.$error" class="text-red-500 text-xs italic">
              Enter your first name
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <BaseLabel id="last_name" required>
              Last name
            </BaseLabel>
            <BaseInput
              id="last_name"
              placeholder="Last name"
              v-model="last_name"
              :class="{ 'border-red-500': $v.last_name.$error }"
              @blur="$v.last_name.$touch()"
            />
            <p v-if="$v.last_name.$error" class="text-red-500 text-xs italic">
              Enter your last name
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <BaseLabel id="username" required>
              Username (email)
            </BaseLabel>
            <BaseInput
              id="username"
              type="email"
              placeholder="Username"
              v-model="username"
              :class="{ 'border-red-500': $v.username.$error }"
              @blur="$v.username.$touch()"
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
            <BaseLabel id="password" required>
              Password
            </BaseLabel>
            <BaseInput
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
              :class="{ 'border-red-500': $v.password.$error }"
              @blur="$v.password.$touch()"
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
            <BaseLabel id="confirm_password" required>
              Confirm password
            </BaseLabel>
            <BaseInput
              id="confirm_password"
              type="password"
              placeholder="******************"
              v-model="confirm_password"
              :class="{ 'border-red-500': $v.confirm_password.$error }"
              @blur="$v.confirm_password.$touch()"
            />
            <p v-if="$v.confirm_password.$error" class="text-red-500 text-xs italic">
              The password do not meet the requirements
            </p>
          </div>
        </div>
        <div class="flex justify-end items-center">
          <div class>
            <div class="relative">
              <BaseButton @click="onRegister">Register</BaseButton>
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
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirm_password: ""
    };
  },
  methods: {
    onRegister() {
      this.$v.$touch();

      if (this.$v.$error) return;

      this.$store.dispatch("auth/register", {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password
      });
    }
  },
  validations: {
    first_name: {
      required
    },
    last_name: {
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
    confirm_password: {
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
</style>
