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
          :class="`${hasRoles(
            router.roles
          )}  flex items-center border-gray-900 px-6 py-2 mt-4 duration-200 border-l-4 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-50`"
          :to="{ name: router.to }"
        >
          <span v-html="router.icon"></span>

          <span class="mx-4">{{ router.text }}</span>
        </router-link>
        <button
          class="flex w-full items-center border-gray-900 px-6 py-2 mt-4 duration-200 border-l-4 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-50"
          @click="logout"
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
// import store from "../../store";

export default {
  async created() {
    const user = await this.getUser();
    this.$store.commit("SET_ROLE", user.role);
    this.role = user.role;
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
    hasRoles(roles) {
      if (!roles) {
        return;
      }
      if (roles.includes(this.role)) {
        return "";
      }
      return "hidden";
    },
  },
  data: () => {
    return {
      role: "",
      logoutIcon: icons.logout,
      routers: [
        {
          to: "Dashboard",
          icon: icons.dashboard,
          text: "Dashboard",
        },
        {
          to: "Products",
          icon: icons.shoppingBag,
          text: "Products",
        },
        {
          to: "Orders",
          icon: icons.orders,
          text: "Orders",
        },
        {
          to: "Messages",
          icon: icons.mail,
          text: "Messages",
        },
        {
          to: "Users",
          icon: icons.users,
          text: "Users",
          roles: ["SUPER_ADMIN", "ADMIN"],
        },
        {
          to: "Profile",
          icon: icons.user,
          text: "Profile",
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
