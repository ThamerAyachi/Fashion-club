<template>
  <div>
    <!-- cover -->
    <section class="md:h-52 h-40 2xl:h-64 overflow-hidden">
      <div
        class="bg-center bg-cover h-full"
        style="
          background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');
        "
      ></div>
    </section>
    <!-- profile img -->
    <section class="relative py-16 mt-20 bg-blueGray-200">
      <div class="container mx-auto px-4 -mt-64 flex justify-center">
        <label
          for="avatar"
          class="rounded-full overflow-hidden w-40 h-40 shadow-md bg-gray-100 border-4 border-gray-200"
        >
          <img
            :src="data.imgUrl"
            class="w-40 rounded-full hover:rotate-12 hover:scale-110 duration-500 transform cursor-pointer"
            alt=""
          />
        </label>
      </div>
      <input
        type="file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        id="avatar"
        class="hidden"
        ref="file"
        @change="selectFile"
      />
    </section>
    <!-- form -->
    <div class="relative -mt-36 mx-3">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Account settings
          </h2>

          <form @submit.prevent="updateUser">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="username">Username</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  minlength="3"
                  maxlength="20"
                  required
                  v-model="data.username"
                  autocomplete="off"
                />
              </div>

              <div>
                <label class="text-gray-700" for="emailAddress"
                  >Email Address</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="email"
                  v-model="data.email"
                  required
                  maxlength="30"
                  autocomplete="off"
                />
              </div>

              <div>
                <label class="text-gray-700" for="passwordConfirmation"
                  >Role</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  readonly
                  v-model="data.role"
                />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                :disabled="isSending"
              >
                <fa-icon
                  icon="rotate"
                  class="text-xl"
                  :spin="true"
                  v-if="isSending"
                />
                <span v-else>Update profile</span>
              </button>
            </div>
          </form>
        </div>
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
              <p class="text-sm text-gray-600">Your account was updated!</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- error alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isError"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-red-500">
            <svg
              class="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
              />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-red-500">Error</span>
              <p class="text-base text-gray-800">
                Can't get target upload source info
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- background-sending -->
    <div
      class="absolute top-0 left-0 opacity-50 w-full h-full bg-black text-white z-50 flex justify-center items-center"
      v-if="isUpdate"
    >
      <fa-icon icon="rotate" class="text-2xl" :spin="true" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSending: false,
      isSuccess: false,
      isError: false,
      isUpdate: false,
      data: {
        id: "",
        imgUrl:
          "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg",
        email: "",
        username: "",
        role: "",
      },
    };
  },
  methods: {
    async getUser() {
      try {
        const res = await this.$store.dispatch("getUser");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser() {
      this.isSending = true;
      try {
        await this.$store.dispatch("updateUser", this.data);
        this.isSending = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      } catch (err) {
        console.log(err);
      }
      this.isSending = false;
    },
    async selectFile() {
      this.isUpdate = true;
      const data = { image: this.$refs.file.files[0], id: this.data.id };
      try {
        const res = await this.$store.dispatch("updateAvatar", data);
        console.log(res);
        if (res === 200) {
          window.location.reload();
          return;
        }
      } catch (err) {
        console.log(err);
      }
      this.isUpdate = false;
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
      }, 3000);
    },
  },
  async mounted() {
    const user = await this.getUser();
    this.data = user;
  },
};
</script>

<style lang="scss" scoped></style>
