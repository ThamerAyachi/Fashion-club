<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="img/logo.png" alt="logo" class="w-10">

          <span class="mx-2 text-2xl font-semibold text-white"
            >F-Dashboard</span
          >
        </div>
      </div>

      <nav class="mt-10 text-gray-500">
        <router-link
          active-class="bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
          class="flex items-center border-gray-900 px-6 py-2 mt-4 duration-200 border-l-4 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-50"
          to="/dashboard"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
              fill="currentColor"
            />
            <path
              d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
              fill="currentColor"
            />
          </svg>

          <span class="mx-4">Dashboard</span>
        </router-link>

        <router-link
          active-class="bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
          class="flex items-center border-gray-900 px-6 py-2 mt-4 duration-200 border-l-4 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-50"
          to="/ui-elements"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
              fill="currentColor"
            />
            <path
              d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
              fill="currentColor"
            />
            <path
              d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
              fill="currentColor"
            />
            <path
              d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
              fill="currentColor"
            />
          </svg>

          <span class="mx-4">UI Elements</span>
        </router-link>

      </nav>
    </div>
  </div>
</template>

<script>
import { useSidebar } from "../../hooks/useSidebar";

export default {
    setup() {
        const { isOpen } = useSidebar();

        return {
            isOpen,
        };
    }
}
</script>

<style>

</style>