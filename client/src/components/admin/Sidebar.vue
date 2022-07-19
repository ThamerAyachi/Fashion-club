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
          <img src="img/logo.png" alt="logo" class="w-10" />

          <span class="mx-2 text-2xl font-semibold text-white">Admin area</span>
        </div>
      </div>

      <nav class="mt-10 text-gray-500">
        <router-link
          v-for="(router, i) in routers"
          :key="i"
          active-class="bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
          class="flex items-center border-gray-900 px-6 py-2 mt-4 duration-200 border-l-4 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-50"
          :to="router.to"
        >
          <span v-html="router.icon"></span>

          <span class="mx-4">{{ router.text }}</span>
        </router-link>
        <button
          class="flex w-full items-center border-gray-900 px-6 py-2 mt-4 duration-200 border-l-4 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-50"
        >
          <span v-html="logoutIcon"></span>

          <span class="mx-4">Logout</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { useSidebar } from "../../hooks/useSidebar";
import icons from "../../icons";

export default {
  data: () => {
    return {
      logoutIcon: icons.logout,
      routers: [
        {
          to: "/dashboard",
          icon: icons.dashboard,
          text: "Dashboard",
        },
        {
          to: "/products",
          icon: icons.shoppingBag,
          text: "Products",
        },
        {
          to: "/users",
          icon: icons.users,
          text: "Users",
        },
        {
          to: "/profile",
          icon: icons.user,
          text: "Profile",
        },
        {
          to: "/orders",
          icon: icons.orders,
          text: "Orders",
        },
      ],
    };
  },
  setup() {
    const { isOpen } = useSidebar();

    return {
      isOpen,
    };
  },
};
</script>

<style></style>
