<template>
  <div>
    <!-- grid -->
    <div class="grid md:grid-cols-2 grid-cols-1 lg:mx-32 mx-5 my-10 gap-3">
      <!-- image -->
      <div
        class="pec flex cursor-pointer justify-center overflow-hidden items-center border border-gray-200 bg-white rounded py-2"
        @click="fullImage = true"
      >
        <img :src="product.imgUrl" alt="product img" class="" />
      </div>
      <div class="p-1 text-gray-400 det">
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
            @click="setInCart"
          >
            <fa-icon icon="cart-shopping" />
            <span class="font-medium">Add to cart</span>
          </button>
          <button
            class="flex items-center bg-white hover:bg-primary hover:text-white border border-primary text-primary transform duration-300 text-sm py-2 px-4 space-x-2"
            @click="setInWhiteList"
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
          :class="`prod-${i}`"
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

    <!-- success alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isSuccess"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-green-500">
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
              <p class="text-sm text-gray-600">Your product was saved!</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- error alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isError"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
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
              <p class="text-base text-gray-800">
                Can't get target upload source info
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- saved error alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isSavedError"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
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
              <p class="text-base text-gray-800">Product already saved!</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { dateFormat } from "../../assets/Methods";
import gsap from "gsap";

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
      isError: false,
      isSuccess: false,
      isSavedError: false,
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
    async setInCart() {
      const ifSaved = await this.$store.dispatch("isFoundInCart", this.product);

      if (ifSaved) {
        this.isSavedError = true;
        setTimeout(() => {
          this.isSavedError = false;
        }, 3000);
        return;
      }
      const res = this.$store.dispatch("setCart", this.product);

      if (res) {
        this.$router.push({ name: "Cart" });
      } else {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
    async setInWhiteList() {
      const ifSaved = await this.$store.dispatch(
        "isFoundInWhiteList",
        this.product
      );

      if (ifSaved) {
        this.isSavedError = true;
        setTimeout(() => {
          this.isSavedError = false;
        }, 3000);
        return;
      }

      const res = this.$store.dispatch("setWhiteList", this.product);

      if (res) {
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      } else {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
  },
  async mounted() {
    /* get product by id */
    await this.getSingleProduct();

    gsap.from(".det", {
      scrollTrigger: ".det",
      opacity: 0,
      duration: 2,
      x: 50,
    });

    gsap.from(".pec", {
      scrollTrigger: ".pec",
      opacity: 0,
      duration: 1,
      y: 50,
    });

    /* get more products */
    await this.getProducts();

    for (let i = 0; i < 4; i++) {
      gsap.from(`.prod-${i}`, {
        scrollTrigger: `.prod-${i}`,
        opacity: 0,
        duration: 1,
      });
    }
  },
};
</script>

<style></style>
