<template>
  <div>
    <!-- banner -->
    <div
      class="banner min-h-52 grid grid-cols-1 md:grid-cols-2 md:h-72 h-36"
    ></div>

    <div class="flex justify-center my-10 text-4xl">
      <h2>Contact Us</h2>
    </div>

    <div class="grid md:grid-cols-3 grid-cols-1">
      <div class="text-xs lg:mx-24 mx-5 text-gray-600 space-y-4 mb-5">
        <!-- address -->
        <div class="space-y-1">
          <h2 class="uppercase text-base text-black font-semibold block">
            address
          </h2>
          <span class="block">4000 centre ville</span>
          <span class="block">Sousse. Tunisia</span>
        </div>

        <!-- phone -->
        <div class="space-y-2">
          <h2 class="uppercase text-base text-black font-semibold block">
            phone
          </h2>
          <span class="block">+216 55 111 222</span>
          <span class="block">+216 55 111 222</span>
        </div>

        <!-- email -->
        <div class="space-y-2">
          <h2 class="uppercase text-base text-black font-semibold block">
            email
          </h2>
          <a href="mailto:myFashionClub@protonmail.com" class="block"
            >myFashionClub@protonmail.com</a
          >
          <a href="mailto:myFashionClub@protonmail.com" class="block"
            >FashionClub@service.com</a
          >
        </div>
      </div>

      <form
        class="col-span-2 text-center space-y-3 lg:mx-32 mx-5 mb-9"
        @submit.prevent="onSubmit"
      >
        <input
          type="text"
          placeholder="Name"
          v-model="formData.name"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          v-model="formData.email"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <input
          type="text"
          placeholder="subject"
          v-model="formData.subject"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <textarea
          placeholder="Message"
          v-model="formData.message"
          rows="5"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        ></textarea>
        <!-- error message -->
        <div
          class="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 text-left"
          v-if="errorsData.isVisible"
        >
          <p v-for="(errorMessage, i) in errorsData.messages" :key="i">
            <svg
              aria-hidden="true"
              class="inline flex-shrink-0 mr-3 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span> {{ errorMessage }}. <br /> </span>
          </p>
        </div>

        <!-- Success message -->
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <div
            class="p-4 mb-4 text-left text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
            v-if="isSuccess"
          >
            <svg
              aria-hidden="true"
              class="inline flex-shrink-0 mr-3 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="font-medium">Sending message Success !</span>
          </div>
        </transition>

        <button
          class="bg-primary hover:bg-secondary w-full p-2 text-white focus:border-primary rounded"
          :disabled="isSending"
        >
          <fa-icon
            icon="rotate"
            class="text-xl"
            :spin="true"
            v-if="isSending"
          />
          <span v-else>Send message</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
        deviceType: window.navigator.userAgent,
      },
      errorsData: {
        messages: [],
        isVisible: false,
      },
      isSending: false,
      isSuccess: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isSending = true;
      try {
        const data = await this.$store.dispatch("sendMessage", this.formData);
        if (data === 201) {
          this.isSuccess = true;
          this.errorsData.isVisible = false;
          this.formData.name = "";
          this.formData.email = "";
          this.formData.subject = "";
          this.formData.message = "";

          this.isSending = false;

          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
          return;
        }
        this.errorsData.messages = data.response.data.message;
        this.errorsData.isVisible = true;
      } catch (err) {
        console.log(err);
      }
      this.isSending = false;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
