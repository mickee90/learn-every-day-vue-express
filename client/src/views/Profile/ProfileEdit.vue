<template>
  <div class="lg:max-w-v-1/2 max-w-v-9/10 mx-auto">
    <div class="content">
      <div class="bg-white m-auto max-w-lg px-16 pb-16 pt-8 rounded-md w-full">
        <div class="pb-8">
          Please let us know if you have any questions or suggestions on how to improve Learn Every
          Day!
        </div>
        <form id="ProfileEditForm" :key="resetFormKey" @submit.prevent="onSubmit">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                for="username"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Username</label
              >
              <input
                id="username"
                type="email"
                placeholder="Username"
                v-model="formData.username"
                :class="{ 'border-red-500 mb-3': $v.formData.username.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 mb-3 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p v-if="$v.formData.username.$error" class="text-red-500 text-xs italic">
                Enter your username.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                for="first_name"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >First name</label
              >
              <input
                id="first_name"
                type="text"
                placeholder="First name"
                v-model="formData.first_name"
                :class="{ 'border-red-500 mb-3': $v.formData.first_name.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p v-if="$v.formData.first_name.$error" class="text-red-500 text-xs italic">
                Enter your first name.
              </p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                for="last_name"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Last name</label
              >
              <input
                id="last_name"
                type="text"
                placeholder="Last name"
                v-model="formData.last_name"
                :class="{ 'border-red-500 mb-3': $v.formData.last_name.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p v-if="$v.formData.last_name.$error" class="text-red-500 text-xs italic">
                Enter your last name.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                for="email"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Email</label
              >
              <input
                id="email"
                type="email"
                placeholder="Email"
                v-model="formData.email"
                :class="{ 'border-red-500 mb-3': $v.formData.email.$error }"
                class="appearance-none block w-full bg-gray-200 text-gray-700 mb-3 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p v-if="$v.formData.email.$error" class="text-red-500 text-xs italic">
                Enter your email.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                for="city"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >City</label
              >
              <input
                id="city"
                type="text"
                placeholder="city"
                v-model="formData.city"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                for="address"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Address</label
              >
              <input
                id="address"
                type="text"
                placeholder="Address"
                v-model="formData.address"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                for="zip_code"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Zip code</label
              >
              <input
                id="zip_code"
                type="text"
                placeholder="Zip code"
                v-model="formData.zip_code"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                for="phone"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Phone number</label
              >
              <input
                id="phone"
                type="text"
                placeholder="Phone number"
                v-model="formData.phone"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="btn btn-blue" @click.prevent="onSubmit">Save</button>
              <button type="submit" class="btn" @click.prevent="resetFormKey++">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        username: "",
        first_name: "",
        last_name: "",
        email: ""
      },
      resetFormKey: 1
    };
  },
  methods: {
    ...mapActions("auth", ["updateUser"]),
    async onSubmit() {
      this.$v.$touch();

      if (
        this.$v.formData.username.$error ||
        this.$v.formData.first_name.$error ||
        this.$v.formData.last_name.$error ||
        this.$v.formData.email.$error
      )
        return;

      await this.updateUser(this.formData);
    }
  },
  created() {
    this.formData = { ...this.$store.getters["auth/getUser"] };
  },
  validations: {
    formData: {
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

<style></style>
