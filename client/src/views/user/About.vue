<template>
  <div>
    <!-- banner -->
    <div
      class="banner min-h-52 grid grid-cols-1 md:grid-cols-2 md:h-72 h-36"
    ></div>

    <div class="flex justify-center my-10">
      <h1 class="text-4xl font-medium">About Us</h1>
    </div>

    <div class="grid md:grid-cols-3 grid-cols-1 gap-1 mb-5">
      <!-- article -->
      <div class="lg:mx-16 mx-5 text-gray-600 text-sm col-span-2">
        <div class="text-primary text-2xl">
          <h2>Explore us</h2>
        </div>
        <p class="my-3">
          Welcome to Fashion club, your number one source for all things
          fashion. We're dedicated to providing you the very best of fashion
          product, with an emphasis on rapidity, securety, professionality.
        </p>
        <p class="my-3">
          Founded in 2022 by Thamer Ayachi, Fashion club has come a long way
          from its beginnings in sousse tunisia. When Thamer first started out,
          his passion for large variety of international products across the
          globe drove them to start their own business.
        </p>
        <p class="my-3">
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please don't hesitate to
          contact us.
        </p>
        <p class="">Sincerely,</p>
        <p class="text-xs my-3">Thamer Ayachi</p>
      </div>

      <!-- Our Advantages -->
      <div class="mx-5 space-y-10">
        <div class="text-2xl text-primary"><span>Our Advantages</span></div>

        <div class="my-3 space-x-2 text-gray-600">
          <span
            class="border rounded-full border-blue-600 text-blue-600 p-2 text-xl"
            >01</span
          >
          <span>Professionality</span>
        </div>
        <div class="my-3 space-x-2 text-gray-600">
          <span
            class="border rounded-full border-blue-600 text-blue-600 p-2 text-xl"
            >02</span
          >
          <span>Securety</span>
        </div>
        <div class="my-3 space-x-2 text-gray-600">
          <span
            class="border rounded-full border-blue-600 text-blue-600 p-2 text-xl"
            >03</span
          >
          <span>Rapidity</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
