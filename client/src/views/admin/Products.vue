<template>
  <div class="mt-8 px-6">
    <!-- form -->
    <div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold leading-tight text-gray-700 my-3">
          Add new product
        </h2>
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Product settings
          </h2>

          <form @submit.prevent="register" enctype="multipart/form-data">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <!-- product_name -->
              <div>
                <label class="text-gray-700" for="product_name"
                  >Product Name</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="product_name"
                  minlength="3"
                  maxlength="20"
                  v-model="formData.name"
                  required
                />
              </div>

              <!-- price -->
              <div>
                <label class="text-gray-700" for="Price">Price</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  id="Price"
                  minlength="1"
                  maxlength="10"
                  v-model="formData.price"
                  required
                />
              </div>

              <!-- Quantity -->
              <div>
                <label class="text-gray-700" for="Quantity">Quantity</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  minlength="1"
                  maxlength="5"
                  v-model="formData.quantity"
                  required
                />
              </div>

              <!-- product_image -->
              <div>
                <label class="text-gray-700" for="file_input"
                  >Upload image</label
                >
                <input
                  class="form-control my-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  id="file_input"
                  type="file"
                  ref="file"
                  @change="selectFile"
                  required
                />
              </div>

              <!-- types -->
              <div>
                <label class="text-gray-700" for="type">Type</label>
                <select
                  @change="enSelect"
                  v-model="formData.types"
                  id="type"
                  placeholder="Select Type"
                  class="bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option
                    v-for="(type, i) in types"
                    :key="i"
                    :value="type.value"
                  >
                    {{ type.name }}
                  </option>
                </select>
              </div>

              <!-- Categories -->
              <div>
                <label class="text-gray-700" for="Categories">Categories</label>
                <select
                  id="Categories"
                  placeholder="Select Categorie"
                  class="bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="formData.categories"
                  required
                >
                  <option value="">Select Categorie</option>
                  <option
                    v-for="(categorie, i) in categories"
                    :key="i"
                    :value="categorie.value"
                  >
                    {{ categorie.name }}
                  </option>
                </select>
              </div>

              <!-- description -->
              <div class="sm:col-span-2">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
                  >Description</label
                >
                <textarea
                  v-model="formData.description"
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
                <span v-else>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- table -->
    <div>
      <div class="mt-8">
        <div class="mt-6">
          <h2 class="text-xl font-semibold leading-tight text-gray-700">
            Products
          </h2>

          <div class="flex flex-col mt-3 sm:flex-row">
            <div class="flex">
              <div class="relative">
                <select
                  class="block w-full h-full rounded-l px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div class="relative block mt-2 sm:mt-0">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  class="w-4 h-4 text-gray-500 fill-current"
                >
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                  />
                </svg>
              </span>

              <input
                placeholder="Search"
                class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div
              class="inline-block min-w-full overflow-hidden rounded-lg shadow"
            >
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                    >
                      Product
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                    >
                      Start on
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                    >
                      Price
                    </th>
                    <th
                      class="px-6 py-3 border-b border-gray-200 bg-gray-50"
                    ></th>
                  </tr>
                </thead>

                <tbody class="bg-white">
                  <tr v-for="(p, index) in arrayProducts[page]" :key="index">
                    <td
                      class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- Product -->
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden"
                        >
                          <img
                            class="w-10"
                            :src="p.imgUrl"
                            alt="Product Image"
                          />
                        </div>

                        <div class="ml-4">
                          <div
                            class="text-sm font-medium leading-5 text-gray-900"
                          >
                            {{ p.name }}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- start on -->
                      <div class="text-sm leading-5 text-gray-500">
                        {{ p.createAt }}
                      </div>
                    </td>

                    <td
                      class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- status -->
                      <span
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                        v-if="p.quantity > 0"
                        >Defiant</span
                      >
                      <span
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full"
                        v-else
                        >Not Defiant</span
                      >
                    </td>

                    <td
                      class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- price -->
                      {{ p.price }} TND
                    </td>

                    <td
                      class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap space-x-3"
                    >
                      <button
                        href="#"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
              >
                <span class="text-xs text-gray-900 xs:text-sm"
                  >There is {{ products.length }} Products.
                </span>

                <div class="inline-flex mt-2 xs:mt-0 space-x-2">
                  <button
                    class="px-4 py-2 text-sm rounded font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400"
                    v-for="i in arrayProducts.length"
                    :key="i"
                    @click="changePage(i)"
                  >
                    {{ i }}
                  </button>
                </div>
              </div>
            </div>
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
              <p class="text-sm text-gray-600">Your product was created!</p>
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
</template>

<script>
import { dateFormat, showFive } from "../../assets/Methods";
import { ProductTypes } from "../../hooks/ProductTypes";

export default {
  data() {
    return {
      types: ProductTypes,
      baseUrl: this.$store.state.baseUrl,
      user: {
        name: "Product name",
        status: "Defiant",
      },
      categories: [],
      formData: {
        types: "",
        name: "",
        price: "",
        description: "",
        categories: "",
        file: "",
        quantity: "",
      },
      isSending: false,
      isSuccess: false,
      isError: false,
      products: [],
      arrayProducts: [],
      DBArrayProducts: [],
      page: 0,
    };
  },
  methods: {
    async register() {
      this.isSending = true;
      try {
        const res = await this.$store.dispatch("createProduct", this.formData);
        if (res === 201) {
          this.isSuccess = true;
          this.formData = {
            types: "",
            name: "",
            price: "",
            description: "",
            categories: "",
            file: "",
            quantity: "",
          };
          this.isSending = false;
          await this.setData();
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
          return;
        }
        this.isError = true;
        this.isSending = false;

        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
        return;
      } catch (err) {
        console.log(err);
      }
      this.isSending = false;
    },
    enSelect() {
      if (this.formData.types === "") {
        this.categories = [];
        return;
      }
      this.categories.isVisible = true;
      const categorie = ProductTypes.find(
        (type) => type.value === this.formData.types
      );
      this.categories = categorie.categories;
    },
    selectFile() {
      this.formData.file = this.$refs.file.files[0];
    },
    async getProducts() {
      try {
        const res = await this.$store.dispatch("getProducts");
        res.data.map((product) => {
          product.createAt = dateFormat(product.createAt);
          product.updateAt = dateFormat(product.updateAt);
          product.imgUrl = this.baseUrl + product.imgUrl;
        });
        return res.data.reverse();
      } catch (err) {
        console.log(err);
      }
    },
    async setData() {
      this.products = await this.getProducts();
      this.arrayProducts = showFive(this.products);
    },
  },
  async mounted() {
    await this.setData();
    this.DBArrayProducts = this.arrayProducts;
  },
};
</script>

<style scoped></style>
