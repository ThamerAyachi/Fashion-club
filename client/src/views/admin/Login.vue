<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center space-x-1">
        <img src="img/logo.png" alt="logo" class="w-10" />
        <span class="text-2xl font-semibold text-gray-700">Admin Fashion</span>
      </div>

      <form class="mt-4" @submit.prevent="signUp">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input
            type="email"
            class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none focus:shadow-outline"
            v-model="email"
            name="email"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            type="password"
            class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none focus:shadow-outline"
            v-model="password"
            name="password"
          />
        </label>

        <div
          class="bg-red-100 rounded-lg py-3 mt-2 px-6 text-base text-red-700 mb-3"
          v-if="v$.$error"
        >
          Values is not a valid
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-green-400 space-x-1"
          >
            <fa-icon icon="right-to-bracket" />
            <span>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      password: "",
    };
  },
  methods: {
    signUp() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("submit");
      } else {
        console.log(this.v$.$errors);
      }
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
};
</script>
