<template>
  <div>
      <!-- banner -->
      <div class="banner min-h-52 grid grid-cols-1 md:grid-cols-2 md:h-72 h-36"></div>

      <div class="flex justify-center my-10 text-4xl">
          <h2>Contact Us</h2>
      </div>

      <div class="grid md:grid-cols-3 grid-cols-1">

          <div class="text-xs lg:mx-24 mx-5 text-gray-600 space-y-4 mb-5">
              <!-- address -->
              <div class="space-y-1">
                  <h2 class="uppercase text-base text-black font-semibold block">address</h2>
                  <span class="block">4000 centre ville</span>
                  <span class="block">Sousse. Tunisia</span>
              </div>

              <!-- phone -->
              <div class="space-y-2">
                  <h2 class="uppercase text-base text-black font-semibold block">phone</h2>
                  <span class="block">+216 55 111 222</span>
                  <span class="block">+216 55 111 222</span>
              </div>

              <!-- email -->
              <div class="space-y-2">
                  <h2 class="uppercase text-base text-black font-semibold block">email</h2>
                  <a href="mailto:myFashionClub@protonmail.com" class="block">myFashionClub@protonmail.com</a>
                  <a href="mailto:myFashionClub@protonmail.com" class="block">FashionClub@service.com</a>
              </div>
          </div>

          <form class="col-span-2 text-center space-y-3 lg:mx-32 mx-5 mb-9">
              <input type="text" placeholder="Name" required
                class="shadow-sm appearance-none block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
              >
              <input type="email" placeholder="Email" required
                class="shadow-sm appearance-none block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
              >
              <input type="text" placeholder="subject" required
                class="shadow-sm appearance-none block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
              >
              <textarea placeholder="Message" rows="5" required
                class="shadow-sm appearance-none block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
              ></textarea>

              <button class="bg-primary hover:bg-secondary w-full p-2 text-white focus:border-primary rounded">
                  Send message
                </button>
          </form>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>