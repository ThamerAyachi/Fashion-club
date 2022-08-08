<template>
  <div class="mt-8 px-6">
    <h3 class="text-3xl font-semibold text-gray-700">Dashboard</h3>
    <!-- cards -->
    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div
          class="w-full px-6 sm:w-1/2 xl:w-1/3 my-2 text-white"
          v-for="(card, i) in cards"
          :key="i"
        >
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
          >
            <div
              :class="`p-3 ${card.color} bg-opacity-75 rounded-full`"
              v-html="card.icon"
            ></div>
            <div class="mx-5">
              <h4 class="text-2xl font-bold text-gray-700">
                {{ card.number }}
              </h4>
              <div class="text-gray-500">{{ card.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- table -->
    <div>
      <div class="mt-8">
        <div class="mt-6">
          <h2 class="text-xl font-semibold leading-tight text-gray-700">
            Available Products
          </h2>

          <div class="flex flex-col mt-3 sm:flex-row">
            <div class="flex">
              <div class="relative">
                <select
                  class="block w-full h-full rounded-l px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  v-model="select"
                  @change="searchedByStatus"
                >
                  <option value="all">All</option>
                  <option value="1">Defiant</option>
                  <option value="0">Not Defiant</option>
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
                v-model="search"
                @input="searchedByName"
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
                      <router-link
                        :to="{ name: 'SingleProduct', params: { id: p.id } }"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </router-link>
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
    <!-- /table -->
  </div>
</template>

<script>
import { dateFormat, showFive } from "../../assets/Methods";
import { numberFormate } from "../../assets/Methods";

export default {
  data() {
    return {
      cards: [
        {
          icon: `<svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                />
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                />
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                />
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                />
              </svg>`,
          color: "bg-blue-600",
          text: "All Users",
          number: "9,999",
        },
        {
          icon: `<svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                  fill="currentColor"
                />
                <path
                  d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                  fill="currentColor"
                />
              </svg>`,
          color: "bg-indigo-600",
          text: "Total Orders",
          number: "200,521",
        },
        {
          icon: `<svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>`,
          color: "bg-pink-600",
          text: "Available Products",
          number: "215,542",
        },
      ],
      user: {
        name: "Product name",
        status: "Defiant",
      },
      products: [],
      arrayProducts: [],
      DBArrayProducts: [],
      page: 0,
      select: "all",
      search: "",
      baseUrl: this.$store.state.baseUrl,
    };
  },
  methods: {
    async getUsers() {
      try {
        const res = await this.$store.dispatch("getUsers");
        return res.data;
      } catch (err) {
        throw new Error(err);
      }
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
    searchedByStatus() {
      this.page = 0;
      if (this.select == "all") {
        this.arrayProducts = this.DBArrayProducts;
        return;
      }
      let newArray = [];
      this.DBArrayProducts.forEach((products) => {
        if (this.select == "1") {
          newArray = newArray.concat(
            products.filter((product) => product.quantity >= 1)
          );
        } else if (this.select == "0") {
          newArray = newArray.concat(
            products.filter((product) => product.quantity == 0)
          );
        }
      });
      this.arrayProducts = showFive(newArray);
    },
    searchedByName() {
      this.page = 0;
      if (this.search == "") {
        this.arrayProducts = this.DBArrayProducts;
        return;
      }
      let newArray = [];
      this.DBArrayProducts.forEach((products) => {
        newArray = newArray.concat(
          products.filter((product) =>
            product.name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      });
      this.arrayProducts = showFive(newArray);
    },
  },
  async mounted() {
    // get and set number of users
    let users = await this.getUsers();
    this.cards[0].number = numberFormate(users.length);

    // get products and set hem in table
    await this.setData();
    this.DBArrayProducts = this.arrayProducts;

    // set number of products
    this.cards[2].number = numberFormate(this.products.length);
  },
};
</script>

<style></style>
