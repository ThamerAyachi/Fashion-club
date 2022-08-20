<template>
  <div>
    <Header />
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view></router-view>
    </transition>

    <!-- Newsletter -->
    <div class="grid md:grid-cols-2 grid-cols-1 bg-gray-200 md:px-32 px-5 py-5">
      <div class="my-5">
        <h2 class="font-medium text-3xl tracking-wide my-2">Newsletter</h2>
        <span class="text-gray-700 text-sm"
          >The latest news, articles, and resources, sent to your inbox
          monthly.</span
        >
      </div>
      <form class="flex items-center">
        <input
          type="email"
          required
          placeholder="Get coupons, offers, and more"
          class="p-2 w-full border border-gray-300 focus:outline-none focus:border-primary appearance-none"
        />
        <button
          class="bg-primary p-3 text-white text-xs hover:bg-black transform duration-500"
        >
          Subscribe
        </button>
      </form>
    </div>

    <Footer />

    <!-- cart button -->
    <router-link
      to="/cart"
      class="inline-block p-3 bg-primary text-white font-medium text-xs uppercase rounded-full shadow-md hover:bg-secondary hover:shadow-lg focus:bg-secondary focus:outline-none focus:ring-0 transition duration-150 ease-in-out bottom-5 right-5"
      id="btn-cart"
      active-class="hidden"
    >
      <fa-icon icon="cart-shopping" size="lg" />
    </router-link>
  </div>
</template>

<script>
import Header from "../components/user/Header.vue";
import Footer from "../components/user/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("setDefaultData");
    this.$store.dispatch("setDefaultCart");
  },
};
</script>

<style>
#btn-cart {
  position: fixed;
  /* display: none; */
}
</style>
