<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">Products</h3>

    <div class="grid xl:grid-cols-3 grid-cols-1">
      <!-- grid 1 -->
      <div class="col-span-2 m-2">
        <!-- table -->
        <div class="flex flex-col mt-3">
          <div
            class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            <div
              class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
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
                  <tr v-for="index in 10" :key="index">
                    <td
                      class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- Product -->
                      <div class="flex items-center">
                        <div class="flex-shrink-0 w-10 h-10">
                          <img
                            class="w-10 h-10 rounded-full"
                            src="/img/tp1.jpg"
                            alt="Product Image"
                          />
                        </div>

                        <div class="ml-4">
                          <div
                            class="text-sm font-medium leading-5 text-gray-900"
                          >
                            {{ user.name }}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- start on -->
                      <div class="text-sm leading-5 text-gray-500">
                        Oct,15th
                      </div>
                    </td>

                    <td
                      class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- status -->
                      <span
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                        >{{ user.status }}</span
                      >
                    </td>

                    <td
                      class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                    >
                      <!-- price -->
                      42 TND
                    </td>

                    <td
                      class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap space-x-3"
                    >
                      <a href="#" class="text-blue-600 hover:text-blue-900"
                        >Edit</a
                      >
                      <a href="#" class="text-red-600 hover:text-red-900"
                        >Delete</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- grid 2 -->
      <div>
        <form
          class="bg-white m-2 p-3 mt-5 rounded-md shadow"
          @submit.prevent="enSubmit"
          enctype="multipart/form-data"
        >
          <h3 class="my-3 text-xl text-gray-800">Create new Product</h3>

          <!-- product name -->
          <div class="mb-3">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Product Name</label
            >
            <input
              type="text"
              id="base-input"
              v-model="formData.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <!-- price -->
          <div class="mb-3">
            <label
              for="base-input"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Price</label
            >
            <input
              type="number"
              id="base-input"
              v-model="formData.price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <!-- description -->
          <div class="mb-3">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
              >Description</label
            >
            <textarea
              v-model="formData.description"
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a description..."
            ></textarea>
          </div>

          <!-- image -->
          <div class="mb-3">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              for="file_input"
              >Upload image</label
            >
            <input
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              id="file_input"
              type="file"
              ref="file"
              @change="selectFile"
            />
          </div>

          <!-- type -->
          <div class="mb-3">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Type</label
            >
            <select
              id="countries"
              @change="enSelect"
              v-model="formData.type"
              placeholder="Select Type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option v-for="(type, i) in types" :key="i" :value="type.value">
                {{ type.name }}
              </option>
            </select>
          </div>
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <!-- categories -->
            <div class="mb-3" v-if="categories.isVisible">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Categories</label
              >
              <select
                id="countries"
                v-model="formData.categories"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option
                  v-for="(categorie, i) in categories.data"
                  :key="i"
                  :value="categorie.value"
                >
                  {{ categorie.name }}
                </option>
              </select>
            </div>
          </transition>

          <button
            type="submit"
            class="mt-3 text-white bg-primaryAdmin hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductTypes } from "../../hooks/ProductTypes";

export default {
  data: () => {
    return {
      user: {
        name: "Product name",
        status: "Defiant",
      },
      types: ProductTypes,
      categories: {
        isVisible: false,
        data: [],
      },
      formData: {
        type: "",
        name: "",
        price: "",
        description: "",
        categories: "",
        file: "",
      },
    };
  },
  methods: {
    enSelect() {
      if (this.type === "") {
        return;
      }
      this.categories.isVisible = true;
      const categorie = ProductTypes.find(
        (type) => type.value === this.formData.type
      );
      this.categories.data = categorie.categories;
    },
    enSubmit() {
      console.log(this.formData);
    },
    selectFile() {
      this.formData.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped></style>
