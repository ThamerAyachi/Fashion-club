<template>
  <div class="mt-8 px-6">
    <div>Single product</div>
    <div>{{ $route.params.id }}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>

<style scoped></style>
