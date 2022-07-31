<template>
  <div>
    <!-- table -->
    <div>
      <div class="mt-2">
        <div class="mt-2">
          <h2 class="text-xl font-semibold leading-tight text-gray-700">
            Messages
          </h2>

          <div class="flex flex-col mt-3 sm:flex-row">
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
                class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded appearance-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
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
                      Subject
                    </th>

                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Device
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(u, index) in arrayMessages[page]" :key="index">
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div
                            class="text-sm font-medium leading-5 text-gray-900"
                          >
                            {{ u.name }}
                          </div>
                          <div class="text-sm leading-5 text-gray-500">
                            {{ u.email }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <p class="text-gray-900 whitespace-nowrap">
                        <!-- {{ u.subject }} -->
                        <LessParagraph :text="u.subject" />
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <p class="text-gray-900 whitespace-nowrap">
                        {{ u.createAt }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <p
                        class="text-indigo-400 whitespace-nowrap"
                        v-html="u.deviceType"
                      ></p>
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <a href="#" class="text-indigo-600 hover:text-indigo-900"
                        >More</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
              >
                <span class="text-xs text-gray-900 xs:text-sm">
                  There is {{ messages.length }} Messages.
                </span>

                <div class="inline-flex mt-2 xs:mt-0 space-x-2">
                  <button
                    class="px-4 py-2 text-sm rounded font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400"
                    v-for="i in arrayMessages.length"
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
import { dateFormat, getDeviceType, showFive } from "../../assets/Methods";
import LessParagraph from "../../components/admin/LessParagraph.vue";
import store from "../../store";
import icons from "../../icons";

export default {
  components: { LessParagraph },
  data() {
    return {
      messages: [],
      DBMessages: [],
      arrayMessages: [],
      DBArrayMessages: [],
      page: 0,
    };
  },
  methods: {
    getMessages: async () => {
      try {
        const res = await store.dispatch("getMessages");
        res.data.map((message) => {
          message.createAt = dateFormat(message.createAt);
          let deviceType = getDeviceType(message.deviceType);
          if (deviceType == "tablet") message.deviceType = icons.tablet;
          else if (deviceType == "mobile") message.deviceType = icons.mobile;
          else message.deviceType = icons.desktop;
        });
        return res.data.reverse();
      } catch (err) {
        throw new Error(err);
      }
    },
    changePage(i) {
      this.page = i - 1;
    },
  },
  async mounted() {
    this.messages = await this.getMessages();
    this.arrayMessages = showFive(this.messages);
    this.DBArrayMessages = this.arrayMessages;
  },
};
</script>

<style lang="scss" scoped></style>
