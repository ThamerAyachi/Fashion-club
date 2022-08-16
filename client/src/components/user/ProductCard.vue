<template>
  <router-link
    :to="`/single/${_id}`"
    class="hover:shadow hover:rotate-3 transform duration-200 relative"
  >
    <div
      class="border border-gray-200 bg-white md:h-80 h-60 flex items-center justify-center overflow-hidden"
    >
      <img :src="img" alt="product img" class="" />
    </div>
    <div>
      <!-- name -->
      <div class="text-gray-600 flex justify-center lg:text-lg font-medium">
        <span>{{ name }}</span>
      </div>

      <!-- price -->
      <div class="flex justify-center text-gray-700 font-semibold lg:text-lg">
        <span>{{ price }} TND</span>
      </div>
    </div>
    <fa-layer
      class="text-gray-600 fa-3x absolute top-1 right-1"
      v-if="isNew == 'true'"
    >
      <fa-icon icon="tag"></fa-icon>
      <fa-layer-text
        value="NEW"
        transform="shrink-13 rotate-45"
        class="text-white"
      ></fa-layer-text>
    </fa-layer>
  </router-link>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    _id: String,
    img: String,
    isNew: String,
    price: String,
    name: String,
  },
};
</script>

<style></style>
