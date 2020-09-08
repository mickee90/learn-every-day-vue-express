<template>
  <div class="lg:max-w-v-1/2 max-w-v-9/10 mx-auto">
    <div class="content">
      <div class="bg-white m-auto max-w-lg px-16 pb-16 pt-8 rounded-md w-full">
        <div class="pb-8">
          Please let us know if you have any questions or suggestions on how to improve Learn Every
          Day!
        </div>
        <form id="ProfileEditForm">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                for="usernameInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Username</label>
              <input
                id="usernameInput"
                type="email"
                placeholder="Username"
                v-model="user.username"
                :class="{ 'border-red-500 mb-3': $v.user.username.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 mb-3 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p
                v-if="$v.user.username.$error"
                class="text-red-500 text-xs italic"
              >Enter your username.</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                for="firstNameInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >First name</label>
              <input
                id="firstNameInput"
                type="text"
                placeholder="First name"
                v-model="user.first_name"
                :class="{ 'border-red-500 mb-3': $v.user.first_name.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p
                v-if="$v.user.first_name.$error"
                class="text-red-500 text-xs italic"
              >Enter your first name.</p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                for="lastNameInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Last name</label>
              <input
                id="lastNameInput"
                type="text"
                placeholder="Last name"
                v-model="user.last_name"
                :class="{ 'border-red-500 mb-3': $v.user.last_name.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p
                v-if="$v.user.last_name.$error"
                class="text-red-500 text-xs italic"
              >Enter your last name.</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                for="emailInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Email</label>
              <input
                id="emailInput"
                type="email"
                placeholder="Email"
                v-model="user.email"
                :class="{ 'border-red-500 mb-3': $v.user.email.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 mb-3 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p v-if="$v.user.email.$error" class="text-red-500 text-xs italic">Enter your email.</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                for="cityInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >City</label>
              <input
                id="cityInput"
                type="text"
                placeholder="city"
                v-model="user.city"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                for="addressInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Address</label>
              <input
                id="addressInput"
                type="text"
                placeholder="Address"
                v-model="user.address"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                for="zipCodeInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Zip code</label>
              <input
                id="zipCodeInput"
                type="text"
                placeholder="Zip code"
                v-model="user.zip_code"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                for="phoneInput"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >Phone number</label>
              <input
                id="phoneInput"
                type="text"
                placeholder="Phone number"
                v-model="user.phone"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="btn btn-blue" @click.prevent="onSubmit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();

      if (
        this.$v.user.username.$error ||
        this.$v.user.first_name.$error ||
        this.$v.user.last_name.$error ||
        this.$v.user.email.$error
      )
        return;
    }
  },
  validations: {
    user: {
      username: {
        required,
        email
      },
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required,
        email
      }
    }
  }
};
</script>

<style>
</style>