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
  },
  async mounted() {
    await this.setData();
    this.DBArrayOrders = this.arrayOrders;
  },
};
</script>

<style lang="scss" scoped></style>
