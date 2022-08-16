<template>
  <div class="flex justify-center items-center h-screen mx-5">
    <div class="block">
      <div class="text-9xl font-bold text-gray-400 flex justify-center">
        404
      </div>
      <div
        class="text-4xl font-semibold flex justify-center text-gray-900 mt-5"
      >
        Sorry, we couldn't find this
      </div>
      <div
        class="text-4xl font-semibold flex justify-center text-gray-900 mb-5"
      >
        page.
      </div>
      <div class="text-gray-600 text-xl flex justify-center">
        But don't worry, you can find plenty of other things on our
      </div>
      <div class="text-gray-600 text-xl flex justify-center">homepage</div>
      <div class="flex justify-center my-3">
        <router-link
          to="/"
          class="text-white bg-blue-600 p-3 rounded-md font-semibold hover:bg-blue-500"
          >Back to homepage</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
