<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-500"
  >
    <div class="flex items-center">
      <button
        @click="isOpen = true"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
        >
          <img
            class="object-cover w-full h-full"
            :src="img"
            alt="Your avatar"
          />
        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <!-- dropdown -->
        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <router-link
              :to="{ name: 'Profile' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >Profile</router-link
            >
            <router-link
              :to="{ name: 'Products' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              >Products</router-link
            >
            <button
              @click="logout"
              class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              Log out
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
import { useSidebar } from "../../hooks/useSidebar";

export default {
  data() {
    return {
      dropdownOpen: false,
      img: "https://flevix.com/wp-content/uploads/2019/07/Bubble-Loader-Icon-1.gif",
    };
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push({ name: "Home" });
      } catch (err) {
        console.log(err);
      }
    },
    async getUser() {
      try {
        const res = await this.$store.dispatch("getUser");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    const user = await this.getUser();
    this.$store.commit("SET_ROLE", user.role);
    this.img = user.imgUrl;
  },
  async mounted() {},
  setup() {
    const { isOpen } = useSidebar();

    return {
      isOpen,
    };
  },
};
</script>

<style></style>
