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
              <BaseLabel id="username" required>Username</BaseLabel>
              <BaseInput
                id="username"
                type="email"
                placeholder="Username"
                v-model="formData.username"
                class="bg-gray-200 shadow-none"
                :class="{ 'border-red-500 mb-3': $v.formData.username.$error }"
              />
              <p v-if="$v.formData.username.$error" class="text-red-500 text-xs italic">
                Enter your username.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <BaseLabel id="first_name" required>First name</BaseLabel>
              <BaseInput
                id="first_name"
                placeholder="First name"
                v-model="formData.first_name"
                class="bg-gray-200 shadow-none"
                :class="{ 'border-red-500 mb-3': $v.formData.first_name.$error }"
              />
              <p v-if="$v.formData.first_name.$error" class="text-red-500 text-xs italic">
                Enter your first name.
              </p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <BaseLabel id="last_name" required>Last name</BaseLabel>
              <BaseInput
                id="last_name"
                placeholder="Last name"
                v-model="formData.last_name"
                class="bg-gray-200 shadow-none"
                :class="{ 'border-red-500 mb-3': $v.formData.last_name.$error }"
              />
              <p v-if="$v.formData.last_name.$error" class="text-red-500 text-xs italic">
                Enter your last name.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <BaseLabel id="email" required>Email</BaseLabel>
              <BaseInput
                id="email"
                type="email"
                placeholder="Email"
                v-model="formData.email"
                class="bg-gray-200 shadow-none"
                :class="{ 'border-red-500 mb-3': $v.formData.email.$error }"
              />
              <p v-if="$v.formData.email.$error" class="text-red-500 text-xs italic">
                Enter your email.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <BaseLabel id="city">City</BaseLabel>
              <BaseInput
                id="city"
                placeholder="city"
                v-model="formData.city"
                class="bg-gray-200 shadow-none"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <BaseLabel id="address">Address</BaseLabel>
              <BaseInput
                id="address"
                placeholder="Address"
                v-model="formData.address"
                class="bg-gray-200 shadow-none"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <BaseLabel id="zip_code">Zip code</BaseLabel>
              <BaseInput
                id="zip_code"
                placeholder="Zip code"
                v-model="formData.zip_code"
                class="bg-gray-200 shadow-none"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <BaseLabel id="phone">Phone number</BaseLabel>
              <input
                type="text"
                id="phone"
                placeholder="Phone number"
                v-model="formData.phone"
                class="bg-gray-200 shadow-none"
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <BaseButton type="submit" @click.prevent="onSubmit">Save</BaseButton>
            <BaseButton type="submit" class="btn-yellow" @click.prevent="resetFormKey++"
              >Cancel</BaseButton
            >
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

      try {
        await this.updateUser({ ...this.formData });
      } catch (_) {
        // @todo handle errors
        // console.log(error);
      }
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
