<template>
  <div>
    <div class="grid md:grid-cols-2 grid-cols-1 lg:mx-32 mx-5 my-10 gap-3">
      <!-- image -->
      <div
        class="flex justify-center overflow-hidden items-center border border-gray-200 bg-white rounded py-2"
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
  </div>
</template>

<script>
import { dateFormat } from "../../assets/Methods";

export default {
  data() {
    return {
      product: {
        imgUrl:
          "https://i.pinimg.com/originals/f5/a7/e5/f5a7e5849ba31101a60c242ed6f857e6.gif",
      },
    };
  },
  async mounted() {
    window.scrollTo(0, 0);

    const res = await this.$store.dispatch(
      "getProductById",
      this.$route.params.id
    );

    if (res.status != 200) {
      this.$router.push({ name: "PageNotFound" });
    }

    res.data.createAt = dateFormat(res.data.createAt);
    res.data.imgUrl = this.$store.state.baseUrl + res.data.imgUrl;
    this.product = res.data;
  },
};
</script>

<style></style>
