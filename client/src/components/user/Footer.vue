<template>
  <footer class="my-10 md:mx-32 mx-4">
    <div class="grid lg:grid-cols-4 grid-cols-1 lg:text-left text-center">
        <div>
          <!-- logo -->
          <router-link to="/" class="logo flex items-center justify-center lg:justify-start py-2">
              <img src="img/logo.png" alt="logo" class="w-10">
              <div>
                  <span class="uppercase text-4xl hover:rotate-45">Fashion</span>
              </div>
          </router-link>

          <span class="block text-sm text-gray-700 my-3">1234k Avenue, 4th block,</span>
          <span class="block text-sm text-gray-700 my-3">Sousse Tunisia.</span>
          <a href="mailto:myFashionClub@protonmail.com" 
          class="block text-sm text-gray-900 hover:text-primary transform duration-500 my-3">myFashionClub@protonmail.com</a>
        </div>

        <div>
            <div class="py-2">
                <h1 class="text-3xl">Information</h1>
            </div>
            <router-link to="/contact" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Contact Us</span>
            </router-link>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Typography</span>
            </router-link>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>FAQ's</span>
            </router-link>
        </div>

        <div>
            <div class="py-2">
                <h1 class="text-3xl">Shop</h1>
            </div>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Jewellery</span>
            </router-link>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Cosmetics</span>
            </router-link>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Shoes</span>
            </router-link>
        </div>

        <div>
            <div class="py-2">
                <h1 class="text-3xl">My Account</h1>
            </div>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Recommended</span>
            </router-link>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>Payments</span>
            </router-link>
            <router-link to="/" class="my-3 block text-sm hover:text-primary transform duration-300">
                <span>My Card</span>
            </router-link>
        </div>
    </div>

    <div class="text-center text-xs my-5 text-gray-600">
        <span>© {{ new Date().getFullYear() }} Fashion Club . All rights reserved | Created by Thamer Ayachi.</span>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>