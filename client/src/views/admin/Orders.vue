<template>
  <div class="mt-8 px-6">
    <!-- table -->
    <div>
      <div class="mt-2">
        <div class="mt-2">
          <h2 class="text-3xl font-semibold leading-tight text-gray-700">
            Orders
          </h2>

          <div class="flex flex-col mt-3 sm:flex-row">
            <div class="flex">
              <div class="relative">
                <select
                  class="block w-full h-full rounded px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 appearance-none focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  v-model="select"
                >
                  <option value="all">All</option>
                  <option value="1">Donne</option>
                  <option value="0">Sending</option>
                </select>
              </div>
            </div>
          </div>

          <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div
              class="inline-block min-w-full overflow-hidden rounded-lg shadow"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Name
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Telephone
                    </th>

                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Status
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Send at
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(u, index) in arrayOrders[page]" :key="index">
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div
                            class="text-sm font-medium leading-5 text-gray-900"
                          >
                            {{ u.fullName }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <p class="text-gray-900 whitespace-nowrap">
                        {{ u.telephone }}
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <p
                        v-if="!u.status"
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full"
                      >
                        Sending
                      </p>
                      <p
                        v-else
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                      >
                        Donne
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      {{ u.createAt }}
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <button
                        @click="showOrder(u)"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        More
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
              >
                <span class="text-xs text-gray-900 xs:text-sm">
                  There is {{ Orders.length }} Orders.
                </span>

                <div class="inline-flex mt-2 xs:mt-0 space-x-2">
                  <button
                    class="px-4 py-2 text-sm rounded font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400"
                    v-for="i in arrayOrders.length"
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

    <!-- model -->
    <div>
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
          class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-3xl"
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
          <div class="px-4 md:px-6 py-4 text-left modal-content">
            <!--Title-->
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-medium text-gray-900">Order details</p>
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

            <!--Body-->
            <div class="mb-8 mt-6">
              <div class="flex justify-between mb-8 text-gray-600 text-sm">
                <div>
                  <div class="font-semibold text-gray-900 text-base">
                    {{ order.fullName }}
                  </div>

                  <p>{{ order.telephone }}</p>
                </div>
                <div>
                  <p class="text-gray-900 font-semibold text-base">
                    {{ order.state }}
                  </p>
                  <p>
                    {{ order.createAt }}
                  </p>
                </div>
              </div>
              <!-- content -->
              <div class="text-gray-800">
                <div class="text-lg font-semibold text-gray-700">Products:</div>

                <!-- products -->
                <div
                  class="my-5 bg-gray-100 rounded-md overflow-x-scroll md:overflow-auto"
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
                          Status
                        </th>
                        <th
                          class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        >
                          Price
                        </th>
                      </tr>
                    </thead>

                    <tbody class="bg-white">
                      <tr v-for="(p, i) in order.products" :key="i">
                        <td
                          class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                        >
                          <!-- Product -->
                          <div class="flex items-center">
                            <div
                              class="flex justify-center w-10 h-10 rounded-full overflow-hidden"
                            >
                              <img
                                class="h-10"
                                :src="baseUrl + p.imgUrl"
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
                      </tr>
                    </tbody>
                  </table>
                </div>
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
    </div>
  </div>
</template>

<script>
import { dateFormat, showFive } from "../../assets/Methods";

export default {
  data() {
    return {
      Orders: [],
      DBOrders: [],
      arrayOrders: [],
      DBArrayOrders: [],
      page: 0,
      open: false,
      select: "all",
      order: {},
      isSending: false,
      baseUrl: this.$store.state.baseUrl,
    };
  },
  methods: {
    changePage(i) {
      this.page = i - 1;
    },
    async getOrders() {
      try {
        const res = await this.$store.dispatch("getOrders");
        res.data.map((o) => {
          o.createAt = dateFormat(o.createAt);
        });
        console.log(res.data);
        return res.data.reverse();
      } catch (err) {
        console.log(err);
      }
    },
    async setData() {
      this.Orders = await this.getOrders();
      this.arrayOrders = showFive(this.Orders);
    },
    showOrder(u) {
      this.order = u;
      this.open = true;
    },
  },
  async mounted() {
    await this.setData();
    this.DBArrayOrders = this.arrayOrders;
  },
};
</script>

<style lang="scss" scoped></style>
