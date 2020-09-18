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
            <BaseLabel id="email" required>
              Email
            </BaseLabel>
            <BaseInput
              id="email"
              type="email"
              placeholder="Email"
              v-model="email"
              :class="{ 'border-red-500': $v.email.$error }"
              @blur="$v.email.$touch()"
            />
            <p v-if="$v.email.$error" class="text-red-500 text-xs italic">
              Enter an email
            </p>
            <p class="text-gray-600 text-xs italic">
              Only valid email addresses is allowed.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <BaseLabel id="message" required>Message</BaseLabel>
            <textarea
              class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
              v-model="message"
            ></textarea>
          </div>
        </div>
        <div class="flex flex-wrap justify-end">
          <BaseButton id="sendBtn" type="submit" @click.prevent="onSendForm">Send</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    };
  },
  methods: {
    async onSendForm() {
      this.$v.$touch();

      if (this.$v.$error) return;

      // alert("The mailing service isn't ready yet");
      // @TODO finish the logic
    }
  },
  validations: {
    first_name: {
      required
    },
    last_name: {
      required
    },
    email: {
      required,
      email
    },
    message: {
      required,
      minLen: minLength(2)
    }
  }
};
</script>
