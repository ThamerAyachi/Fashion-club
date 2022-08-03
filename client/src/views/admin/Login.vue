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
            class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            v-model="formData.email"
            name="email"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            v-model="formData.password"
            name="password"
          />
        </label>

        <div
          class="bg-red-100 rounded-lg py-3 mt-2 px-6 text-base text-red-700 mb-3"
          v-if="v$.$error | btnData.isError"
        >
          Values is not a valid
        </div>

        <div class="mt-6">
          <button
            type="submit"
            :disabled="btnData.isLoading"
            class="w-full px-4 py-2 text-sm text-center text-white bg-primary rounded-md focus:outline-none hover:bg-green-400 space-x-1"
          >
            <fa-icon
              icon="rotate"
              class="text-xl"
              :spin="true"
              v-if="btnData.isLoading"
            />
            <span v-else>
              <fa-icon icon="right-to-bracket" /> <span>Sign in</span>
            </span>
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
      formData: { email: "", password: "" },
      btnData: { isLoading: false, isError: false },
    };
  },
  methods: {
    async signUp() {
      this.btnData.isLoading = true;
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const data = await this.$store.dispatch("login", this.formData);
          if (data.statusCode === 401) {
            this.btnData.isError = true;
            this.btnData.isLoading = false;
            return null;
          }
          window.location.replace("/login");
        } catch (err) {
          console.log(err);
        }
      }
      this.btnData.isLoading = false;
      return;
    },
  },
  validations() {
    return {
      formData: {
        email: { required, email },
        password: { required },
      },
    };
  },
};
</script>
