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
          <img :src="product.imgUrl" alt="product img" class="" />
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
                  minlength="3"
                  maxlength="20"
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
                  minlength="3"
                  maxlength="20"
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
                  v-model="product.createAt"
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

            <div class="flex justify-end mt-4 space-x-2">
              <button
                class="px-4 py-2 text-red-400 hover:bg-red-100 rounded-md focus:outline-none focus:bg-red-100"
              >
                Delete
              </button>
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                <span>Update product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../assets/Methods";

export default {
  data() {
    return {
      product: {
        imgUrl:
          "https://i.pinimg.com/originals/f5/a7/e5/f5a7e5849ba31101a60c242ed6f857e6.gif",
      },
    };
  },
  methods: {},
  async mounted() {
    const res = await this.$store.dispatch(
      "getProductById",
      this.$route.params.id
    );

    if (res.status != 200) {
      this.$router.push({ name: "PageNotFound" });
    }

    res.data.createAt = dateFormat(res.data.createAt);
    res.data.imgUrl = this.$store.state.baseUrl + res.data.imgUrl;
    this.product = res.data;
  },
};
</script>

<style scoped></style>
