<template>
  <div>
    <!-- banner -->
    <div class="overflow-hidden md:h-72">
      <img src="/img/clothsbanner.jpg" alt="" />
    </div>

    <div class="grid sm:grid-cols-3 grid-cols-1 lg:mx-32 mx-5 my-10">
      <!-- col-1 -->
      <div>
        <!-- Categories -->
        <div class="my-5">
          <div class="flex items-center space-x-4">
            <span v-html="icon" class="text-primary"></span>
            <span class="text-2xl text-gray-800">Categories</span>
          </div>

          <div
            class="border border-gray-300 mx-5 md:mx-1 lg:ml-7 lg:mr-20 p-2 rounded-sm text-xs text-gray-900 my-3 space-y-2"
          >
            <button
              v-for="(btn, i) in btnsCategories"
              :key="i"
              @click="filterDataWithCategorie(btn.categorie)"
              class="p-2 rounded block w-full hover:bg-primary hover:text-white transform duration-300 text-left"
            >
              {{ btn.text }}
            </button>
          </div>
        </div>

        <!-- Size -->
        <div class="my-5">
          <div class="flex items-center space-x-4">
            <span v-html="icon" class="text-primary"></span>
            <span class="text-2xl text-gray-800">Size</span>
          </div>

          <div
            class="border border-gray-300 mx-5 md:mx-1 lg:ml-7 lg:mr-20 p-2 rounded-sm text-xs text-gray-900 my-3 space-y-2"
          >
            <button
              v-for="(btn, i) in btnsSize"
              :key="i"
              @click="filterDataWithSize(btn.size)"
              class="p-2 rounded block w-full hover:bg-primary hover:text-white transform duration-300 text-left"
            >
              {{ btn.text }}
            </button>
          </div>
        </div>
      </div>

      <!-- col-2 cards-->
      <transition-group
        class="grid lg:grid-cols-3 col-span-2 grid-cols-2 mx-4 gap-3 my-10"
        tag="div"
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <ProductCard
          v-for="(p, i) in products"
          :key="i"
          :img="p.imgUrl"
          :_id="p.id"
          :price="p.price"
          :name="p.name"
        />
      </transition-group>
      <div
        class="text-gray-500 tracking-widest text-xl uppercase flex justify-center w-full sm:col-span-3"
      >
        There is {{ products.length }} product{{
          products.length > 1 ? "s" : ""
        }}
        defined
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../../components/user/ProductCard.vue";

export default {
  data() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>`,
      products: [],
      DBproducts: [],
      btnsCategories: [
        { text: "Frocks", categorie: "frocks" },
        { text: "Skirts", categorie: "skirts" },
        { text: "Jeans", categorie: "jeans" },
        { text: "Shirts", categorie: "shirts" },
        { text: "All", categorie: "all" },
      ],
      btnsSize: [
        { text: "Medium", size: "m" },
        { text: "Large", size: "l" },
        { text: "Extra Large", size: "xl" },
        { text: "Small", size: "s" },
      ],
      seData: null,
    };
  },
  methods: {
    filterDataWithCategorie(categorie) {
      this.products = [];
      setTimeout(() => {
        if (categorie == "all") {
          this.products = this.DBproducts;
          return;
        }
        this.products = this.DBproducts.filter(
          (res) => res.categories == categorie
        );
      }, 700);
    },
    async getProducts() {
      try {
        const res = await this.$store.dispatch(
          "getProductByType",
          "kid_s_wear"
        );
        if (res.status != 200) {
          this.$router.push({ name: "PageNotFound" });
        }
        res.data.map((product) => {
          product.imgUrl = this.$store.state.baseUrl + product.imgUrl;
        });
        this.products = res.data.reverse();
        this.DBproducts = this.products;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    window.scrollTo(0, 0);
    await this.getProducts();
  },
  components: {
    ProductCard,
  },
};
</script>

<style></style>