<template>
  <div class="mt-8 px-6">
    <!-- form -->
    <div :class="`${hasRoles(['SUPER_ADMIN'])}`">
      <div class="mt-4">
        <h2 class="text-xl font-semibold leading-tight text-gray-700 my-3">
          Add new user
        </h2>
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Users settings
          </h2>

          <form @submit.prevent="register" autocomplete="off">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <!-- username -->
              <div>
                <label class="text-gray-700" for="username">Username</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="username"
                  v-model="formData.username"
                  required
                />
              </div>

              <!-- email -->
              <div>
                <label class="text-gray-700" for="emailAddress"
                  >Email Address</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="email"
                  name="email"
                  v-model="formData.email"
                  required
                />
              </div>

              <!-- password -->
              <div>
                <label class="text-gray-700" for="password">Password</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="password"
                  v-model="formData.password"
                  required
                />
              </div>

              <!-- role -->
              <div>
                <label class="text-gray-700" for="role">Role</label>
                <select
                  id="role"
                  class="bg-gray-50 border border-gray-300 text-gray-900 my-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="role"
                  v-model="formData.role"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="EDITOR">Editor</option>
                </select>
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
            <!-- error alert -->
            <div
              class="inline-flex w-full ml-3 overflow-hidden bg-white rounded-lg shadow-md"
              v-if="errorsData.isVisible"
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
                  <p
                    class="text-base text-gray-800"
                    v-for="(errorMessage, i) in errorsData.messages"
                    :key="i"
                  >
                    {{ errorMessage }}. <br />
                  </p>
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
                class="px-4 py-4 overflow-x-auto bg-white rounded-md whitespace-nowrap"
                v-if="isSuccess"
              >
                <div
                  class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
                >
                  <div
                    class="flex items-center justify-center w-12 bg-green-500"
                  >
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
                      <p class="text-sm text-gray-600">
                        Your account was registered!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </form>
        </div>
      </div>
    </div>
    <!-- table -->
    <div>
      <div class="mt-8">
        <div class="mt-6">
          <h2 class="text-xl font-semibold leading-tight text-gray-700">
            Users
          </h2>

          <div class="flex flex-col mt-3 sm:flex-row">
            <div class="flex">
              <div class="relative">
                <select
                  class="block w-full h-full rounded-l px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                  @change="searchedByRole"
                  v-model="roleSelect"
                >
                  <option value="all">All</option>
                  <option value="Super admin">Super admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
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
                v-model="research"
                @input="searchedByName"
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
                      User
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Role
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      Updated at
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(u, index) in arrayUsers[page]" :key="index">
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <div class="flex items-center">
                        <div
                          class="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full"
                        >
                          <img class="w-10" :src="u.imgUrl" alt="profile pic" />
                        </div>

                        <div class="ml-4">
                          <div
                            class="text-sm font-medium leading-5 text-gray-900"
                          >
                            {{ u.username }}
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
                        {{ u.role }}
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
                      <p class="text-gray-900 whitespace-nowrap">
                        {{ u.updateAt }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <button
                        class="text-indigo-600 hover:text-indigo-900"
                        v-if="role == 'SUPER_ADMIN' && u.role != 'Super admin'"
                        @click="openEditUser(u)"
                      >
                        Edit
                      </button>
                      <button
                        class="text-indigo-600 hover:text-indigo-900"
                        v-else
                        @click="openMoreUser(u)"
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
                  There is {{ Users.length }} Users.
                </span>

                <div class="inline-flex mt-2 xs:mt-0 space-x-2">
                  <button
                    class="px-4 py-2 rounded text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400"
                    v-for="i in arrayUsers.length"
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

    <!-- modal edit user -->
    <div
      :class="`modal ${
        !editOpen && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        @click="editOpen = false"
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>

      <div
        class="z-50 w-5/6 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
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
        <div class="px-8 py-4 text-left modal-content">
          <!--Title-->
          <div class="relative right-0">
            <div class="flex items-center justify-end pb-3">
              <div
                class="z-50 cursor-pointer modal-close"
                @click="editOpen = false"
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
          </div>

          <!--Body-->
          <div>
            <!-- image -->
            <div class="flex justify-center">
              <div
                class="rounded-full overflow-hidden w-32 h-32 shadow-md bg-gray-100 border-4 border-gray-200"
              >
                <img :src="user.imgUrl" class="w-32 rounded-full" alt="" />
              </div>
            </div>

            <!-- name -->
            <div
              class="flex justify-center mt-3 text-lg font-bold text-gray-800"
            >
              {{ user.username }}
            </div>

            <!-- email -->
            <div class="flex justify-center text-sm text-gray-400">
              {{ user.email }}
            </div>

            <!-- role -->
            <div>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 my-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                v-model="user._role"
              >
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
              </select>
            </div>

            <div class="flex justify-end">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal edit user -->
    <div
      :class="`modal ${
        !moreOpen && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        @click="moreOpen = false"
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      ></div>

      <div
        class="z-50 w-5/6 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
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
        <div class="px-8 py-4 text-left modal-content">
          <!--Title-->
          <div class="relative right-0">
            <div class="flex items-center justify-end pb-3">
              <div
                class="z-50 cursor-pointer modal-close"
                @click="moreOpen = false"
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
          </div>

          <!--Body-->
          <div>
            <!-- image -->
            <div class="flex justify-center">
              <div
                class="rounded-full overflow-hidden w-32 h-32 shadow-md bg-gray-100 border-4 border-gray-200"
              >
                <img :src="user.imgUrl" class="w-32 rounded-full" alt="" />
              </div>
            </div>

            <!-- name -->
            <div
              class="flex justify-center mt-3 text-lg font-bold text-gray-800"
            >
              {{ user.username }}
            </div>

            <!-- email -->
            <div class="flex justify-center text-sm text-gray-400">
              {{ user.email }}
            </div>

            <!-- role -->
            <div class="flex justify-center">
              <p class="bg-blue-100 text-blue-600 text-xs m-3 p-1 rounded">
                {{ user.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import {
  dateFormat,
  roleFormat,
  showFive,
  roleReverseFormat,
} from "../../assets/Methods";

export default {
  data() {
    return {
      Users: [],
      user: {},
      role: this.$store.state.role,
      DBUser: [],
      arrayUsers: [],
      DBArrayUsers: [],
      page: 0,
      formData: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      roleSelect: "all",
      research: "",
      errorsData: {
        messages: [],
        isVisible: false,
      },
      isSending: false,
      isSuccess: false,
      editOpen: false,
      moreOpen: false,
    };
  },
  methods: {
    async register() {
      this.isSending = true;
      try {
        const data = await store.dispatch("createUser", this.formData);
        if (data === 201) {
          this.isSuccess = true;
          this.errorsData.isVisible = false;
          this.formData = { username: "", email: "", password: "", role: "" };
          this.isSending = false;

          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
          const res = await store.dispatch("getUsers");
          res.data.map((user) => {
            user.createAt = dateFormat(user.createAt);
            user.updateAt = dateFormat(user.updateAt);
            user.role = roleFormat(user.role);

            this.arrayUsers = showFive(res.data);
            this.DBArrayUsers = this.arrayUsers;
          });
          return;
        }
        this.errorsData.messages = data.response.data.message;
        this.errorsData.isVisible = true;
      } catch (err) {
        console.log(err);
      }
      this.isSending = false;
    },
    getUsers: async () => {
      try {
        const res = await store.dispatch("getUsers");
        res.data.map((user) => {
          user.createAt = dateFormat(user.createAt);
          user.updateAt = dateFormat(user.updateAt);
          user.role = roleFormat(user.role);
        });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    searchedByRole() {
      this.page = 0;
      if (this.roleSelect == "all") {
        this.arrayUsers = this.DBArrayUsers;
        return;
      }
      let newArray = [];
      this.DBArrayUsers.forEach((users) => {
        newArray = newArray.concat(
          users.filter((user) => user.role == this.roleSelect)
        );
      });
      this.arrayUsers = showFive(newArray);
    },
    searchedByName() {
      this.page = 0;
      if (this.research == "") {
        this.arrayUsers = this.DBArrayUsers;
        return;
      }
      let newArray = [];
      this.DBArrayUsers.forEach((users) => {
        newArray = newArray.concat(
          users.filter((user) =>
            user.username.toLowerCase().includes(this.research.toLowerCase())
          )
        );
      });
      this.arrayUsers = showFive(newArray);
    },
    changePage(i) {
      this.page = i - 1;
    },
    hasRoles(roles) {
      if (!roles) {
        return;
      }
      if (roles.includes(this.role)) {
        return "";
      }
      return "hidden";
    },
    openEditUser(user) {
      this.user = user;
      this.user._role = roleReverseFormat(this.user.role);
      this.editOpen = true;
    },
    openMoreUser(user) {
      this.user = user;
      this.moreOpen = true;
    },
  },
  async created() {
    this.Users = await this.getUsers();
    this.DBUser = this.Users;
    this.arrayUsers = showFive(this.Users);
    this.DBArrayUsers = this.arrayUsers;
  },
  async mounted() {},
};
</script>

<style lang="scss" scoped></style>
