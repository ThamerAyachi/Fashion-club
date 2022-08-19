<template>
  <div>
    <!-- grid -->
    <div class="grid md:grid-cols-2 grid-cols-1 lg:mx-32 mx-5 my-10 gap-3">
      <!-- image -->
      <div
        class="flex cursor-pointer justify-center overflow-hidden items-center border border-gray-200 bg-white rounded py-2"
        @click="fullImage = true"
      >
        <img :src="product.imgUrl" alt="product img" class="" />
      </div>
      <div class="p-1 text-gray-400">
        <h2 class="text-primary text-3xl my-3">{{ product.name }}</h2>
        <p class="text-sm my-2">
          Processing Time: Item will be call you within 1-2 working days.
        </p>
        <hr />
        <div class="my-3 flex items-center">
          <h2 class="text-2xl px-2 text-blue-400">{{ product.price }} TND</h2>
          <p class="px-2 text-sm">Start on: {{ product.createAt }}</p>
        </div>
        <p class="text-sm my-2 leading-5 tracking-wide">
          {{ product.description }}
        </p>

        <!-- actions -->
        <div class="my-2 md:space-x-7 space-x-2 flex p-3">
          <button
            class="flex items-center bg-primary hover:bg-blue-400 text-white transform duration-300 text-sm py-2 px-4 space-x-2"
          >
            <fa-icon icon="cart-shopping" />
            <span class="font-medium">Add to cart</span>
          </button>
          <button
            class="flex items-center bg-white hover:bg-primary hover:text-white border border-primary text-primary transform duration-300 text-sm py-2 px-4 space-x-2"
          >
            <fa-icon icon="heart" />
            <span>Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>

    <!-- more product -->
    <div class="lg:mx-32 mx-5 my-10">
      <h2 class="text-3xl pt-7 text-gray-800 font-medium">More Products</h2>
      <!-- cards -->
      <div class="grid lg:grid-cols-4 grid-cols-2 md:mx-32 mx-4 gap-3 my-10">
        <Card
          v-for="(p, i) in products"
          :key="i"
          :_id="p.id"
          :img="baseUrl + p.imgUrl"
          :name="p.name"
          :price="p.price"
          @click="getSingleProduct(p.id)"
        />
      </div>
    </div>

    <!-- full img -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div
        v-if="fullImage"
        class="fixed top-0 left-0 w-full h-full text-white z-10 flex justify-center items-center"
      >
        <div
          class="fixed top-0 left-0 w-full h-full bg-black opacity-50 cursor-pointer"
          @click="fullImage = false"
        ></div>

        <img class="opacity-100 z-20" :src="product.imgUrl" alt="" />
      </div>
    </transition>
  </div>
</template>

<script>
import { dateFormat } from "../../assets/Methods";

import Card from "../../components/user/home/Card.vue";

export default {
  components: { Card },
  data() {
    return {
      product: {
        imgUrl:
          "https://i.pinimg.com/originals/f5/a7/e5/f5a7e5849ba31101a60c242ed6f857e6.gif",
      },
      baseUrl: this.$store.state.baseUrl,
      products: [],
      fullImage: false,
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await this.$store.dispatch("getProducts");

        if (res.status != 200) {
          return;
        }

        if (res.data.length <= 4) {
          this.products = res.data;
          return;
        }

        // eslint-disable-next-line for-direction
        for (let i = res.data.length; i > res.data.length - 4; i--) {
          this.products.push(res.data[i - 1]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getSingleProduct(_id) {
      let id;
      if (_id) {
        id = _id;
      } else {
        id = this.$route.params.id;
      }

      const res = await this.$store.dispatch("getProductById", id);

      if (res.status != 200) {
        this.$router.push({ name: "PageNotFound" });
      }

      res.data.createAt = dateFormat(res.data.createAt);
      res.data.imgUrl = this.$store.state.baseUrl + res.data.imgUrl;
      this.product = res.data;
      window.scrollTo(0, 0);
    },
  },
  async mounted() {
    /* get product by id */
    await this.getSingleProduct();

    /* get more products */
    await this.getProducts();
  },
};
</script>

<style></style>
