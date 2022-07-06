<template>
  <div class="w-full h-screen flex justify-center items-center space-x-5">
    <fa-icon icon="tag" class="text-gray-600 fa-2x" :spin="false" />
    <fa-layer class="fa-4x">
      <fa-icon icon="circle" class="text-red-600"></fa-icon>
      <fa-icon icon="times" transform="shrink-8" inverse></fa-icon>
    </fa-layer>

    <fa-layer class="text-gray-600 fa-3x">
      <fa-icon icon="tag"></fa-icon>
      <fa-layer-text
        value="NEW"
        transform="shrink-13 rotate-45"
        class="text-white"
      ></fa-layer-text>
    </fa-layer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSpin: true,
    };
  },
};
</script>

<style></style>
