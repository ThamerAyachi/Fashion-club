<template>
  <div class="mt-8 px-6">
    <h3 class="text-3xl font-semibold text-gray-700">Single Product</h3>

    <div class="grid lg:grid-cols-6 grid-cols-1 gap-2 my-8">
      <!-- image -->
      <div
        class="lg:col-span-2 lg:h-full bg-white items-center flex justify-center border border-gray-200"
      >
        <div
          class="flex justify-center overflow-hidden rounded items-center bg-white py-2"
        >
          <img :src="imgUrl" alt="product img" class="" />
        </div>
      </div>
      <!-- form -->
      <div class="lg:col-span-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Product settings
          </h2>

          <div>
            <div class="grid grid-cols-1 gap-6 mt-4 xl:grid-cols-2">
              <!-- product name -->
              <div>
                <label class="text-gray-700" for="username">Product Name</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  minlength="3"
                  maxlength="20"
                  required
                  autocomplete="off"
                  v-model="product.name"
                />
              </div>

              <!-- price -->
              <div>
                <label class="text-gray-700" for="username">Price</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  minlength="1"
                  maxlength="10"
                  required
                  autocomplete="off"
                  v-model="product.price"
                />
              </div>

              <!-- quantity -->
              <div>
                <label class="text-gray-700" for="username">Quantity</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  minlength="1"
                  maxlength="5"
                  required
                  autocomplete="off"
                  v-model="product.quantity"
                />
              </div>

              <!-- create at -->
              <div>
                <label class="text-gray-700" for="username">Create At</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  readonly
                  v-model="myDate"
                />
              </div>

              <!-- description -->
              <div class="sm:col-span-2">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
                  >Description</label
                >
                <textarea
                  v-model="product.description"
                  minlength="15"
                  maxlength="400"
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full my-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Leave a description..."
                  required
                ></textarea>
              </div>
            </div>

            <!-- action -->
            <div class="flex justify-end mt-4 space-x-2">
              <button
                class="px-4 py-2 text-red-400 hover:bg-red-100 rounded-md focus:outline-none focus:bg-red-100"
                @click="open = true"
              >
                Delete
              </button>
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                @click="updateProduct"
                :disabled="isSending"
              >
                <fa-icon
                  icon="rotate"
                  class="text-xl"
                  :spin="true"
                  v-if="isSending"
                />
                <span v-else>Update product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- modal -->
      <div
        :class="`modal ${
          !open && 'opacity-0 pointer-events-none'
        } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
      >
        <div
          @click="open = false"
          class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        ></div>

        <div
          class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
        >
          <div
            class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
          >
            <svg
              class="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
            <span class="text-sm">(Esc)</span>
          </div>

          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="px-6 py-4 text-left modal-content">
            <!--Title-->
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-semibold text-gray-800">
                Do want delete this Product?
              </p>
              <div
                class="z-50 cursor-pointer modal-close"
                @click="open = false"
              >
                <svg
                  class="text-black fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  />
                </svg>
              </div>
            </div>

            <!--Footer-->
            <div class="flex justify-end pt-2">
              <button
                @click="open = false"
                class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              >
                Close
              </button>
              <button
                class="p-3 px-6 py-3 mr-2 text-red-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-red-400 focus:outline-none"
                @click="deleteProductById"
                :disabled="isSending"
              >
                <fa-icon
                  icon="rotate"
                  class="text-xl"
                  :spin="true"
                  v-if="isSending"
                />
                <span v-else>Delete</span>
              </button>
            </div>
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
                <p class="text-sm text-gray-600">Your product was updated!</p>
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
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../assets/Methods";

export default {
  data() {
    return {
      product: {
        id: "",
      },
      imgUrl:
        "https://i.pinimg.com/originals/f5/a7/e5/f5a7e5849ba31101a60c242ed6f857e6.gif",
      myDate: "",
      open: false,
      isSending: false,
      isError: false,
      isSuccess: false,
    };
  },
  methods: {
    async deleteProductById() {
      const id = this.product.id;

      this.isSending = true;
      try {
        const res = await this.$store.dispatch("deleteProductById", id);
        if (res.status == 200 || res.status == 201) {
          this.$router.push({ name: "Products" });
          return;
        }
        this.isSending = false;
        this.open = false;
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      } catch (err) {
        console.log(err);
        this.isSending = false;
        this.open = false;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
    async updateProduct() {
      this.isSending = true;
      try {
        const res = await this.$store.dispatch("updateProduct", this.product);
        if (res.status == 200 || res.status == 201) {
          this.isSending = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
          return;
        }
      } catch (err) {
        console.log(err);
      }
      this.isError = false;
      this.isSending = true;
      setTimeout(() => {
        this.isError = false;
      }, 3000);
    },
  },
  async mounted() {
    const res = await this.$store.dispatch(
      "getProductById",
      this.$route.params.id
    );

    if (res.status != 200) {
      this.$router.push({ name: "PageNotFound" });
    }

    this.myDate = dateFormat(res.data.createAt);
    this.imgUrl = this.$store.state.baseUrl + res.data.imgUrl;
    this.product = res.data;
  },
};
</script>

<style scoped></style>
