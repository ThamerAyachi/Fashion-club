<template>
  <div>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-center space-x-1">
          <img src="img/logo.png" alt="logo" class="w-10" />
          <span class="text-2xl font-semibold text-gray-700"
            >Admin Fashion</span
          >
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
    <!-- success alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isSuccess"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-green-500">
            <svg
              class="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
              />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-green-500">Success</span>
              <p class="text-sm text-gray-600">Login successful!</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
      isSuccess: false,
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
          this.isSuccess = true;
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
