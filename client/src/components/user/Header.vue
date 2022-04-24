<template>
  <header class="bg-white">
      <!-- pc navbar -->
      <nav class="px-3  flex justify-between">
          <!-- logo -->
          <router-link to="/" class="logo flex items-center md:px-6 p-2">
              <img src="img/logo.png" alt="logo" class="w-10">
              <div>
                  <span class="uppercase text-4xl hover:rotate-45">Fashion</span>
              </div>
          </router-link>
            <!-- menu -->
            <div class="my-2 hidden md:block">
                <ul class="flex justify-center items-center text-gray-500">
                    <li>
                        <router-link to="/home"
                        class="p-2 hover:text-primary transition duration-300"
                        active-class="text-primary"
                        >Home</router-link>
                    </li>
                    <li class="relative">
                        <button
                            @click="dropdownOpen = !dropdownOpen"
                            class="p-2 group flex items-center relative space-x-1"
                        >
                            <span>Clothing</span>
                            <fa-icon icon="angle-down" size="sm"/>                            
                        </button>
                        <div
                        v-show="dropdownOpen"
                        @click="dropdownOpen = false"
                        class="fixed inset-0 z-10 w-full h-full"
                        ></div>
                        <transition
                            enter-active-class="transition duration-150 ease-out transform"
                            enter-from-class="scale-95 opacity-0"
                            enter-to-class="scale-100 opacity-100"
                            leave-active-class="transition duration-150 ease-in transform"
                            leave-from-class="scale-100 opacity-100"
                            leave-to-class="scale-95 opacity-0"
                        >
                            <div
                                v-show="dropdownOpen"
                                class="absolute top-full z-20 min-w-full w-max text-gray-700 bg-white shadow-md rounded text-sm p-2"
                            >
                                <router-link v-for="link in clothingLinks" :key="link.id" :to="link.path"
                                    class="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                    active-class="bg-primary text-white"
                                >
                                    {{ link.text }}
                                </router-link>
                            </div>
                        </transition>
                    </li>
                    <li class="relative">
                        <button
                            @click="dropdownOpen1 = !dropdownOpen1"
                            class="p-2 group flex items-center relative space-x-1"
                        >
                            <span>Personal Care</span>
                            <fa-icon icon="angle-down" size="sm"/>
                        </button>
                        <div
                        v-show="dropdownOpen1"
                        @click="dropdownOpen1 = false"
                        class="fixed inset-0 z-10 w-full h-full"
                        ></div>
                        <transition
                            enter-active-class="transition duration-150 ease-out transform"
                            enter-from-class="scale-95 opacity-0"
                            enter-to-class="scale-100 opacity-100"
                            leave-active-class="transition duration-150 ease-in transform"
                            leave-from-class="scale-100 opacity-100"
                            leave-to-class="scale-95 opacity-0"
                        >
                            <div
                                v-show="dropdownOpen1"
                                class="absolute top-full z-20 min-w-full text-gray-700 w-max bg-white shadow-md rounded text-sm p-2"
                            >
                                <router-link v-for="link in personalCareLinks" :key="link.id" :to="link.path"
                                    class="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
                                    active-class="bg-primary text-white"
                                >
                                    {{ link.text }}
                                </router-link>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <router-link to="/about" 
                        class="p-2 hover:text-primary transition duration-300"
                        active-class="text-primary"
                        >About</router-link>
                    </li>
                    <li>
                        <router-link to="/contact" 
                        class="p-2 hover:text-primary transition duration-300"
                        active-class="text-primary"
                        >Contact Us</router-link>
                    </li>
                </ul>
            </div>

            <!-- mobile menu -->
            <div class="md:hidden flex items-center">
                <button class="bg-primary text-white py-1 px-2 rounded" @click="mobileNavbar = !mobileNavbar">
                    <fa-icon icon="bars" size="lg"/>
                </button>
            </div>
      </nav>
        <!-- mobile menu dropdown -->
        <transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
        >
            <div class="text-center md:hidden" v-if="mobileNavbar">
                <ul class="text-sm text-gray-500 ">
                    <li class="w-full py-2">
                        <router-link to="/home" class="hover:text-primary justify-center items-center transition duration-300 w-full flex" active-class="text-primary">
                            Home
                        </router-link>
                    </li>
                    <li class="w-full py-2">
                        <button class="flex justify-center items-center w-full space-x-1" @click="toggleMenu('clothingMenu')">
                            <span>Clothing</span>
                            <fa-icon icon="angle-down" size="sm"/>
                        </button>

                        <!-- dropdown -->
                        <div class="hidden border border-gray-300 bg-gray-100 mx-2 rounded" id="clothingMenu">
                            <ul>
                                <li class="m-2" v-for="link in clothingLinks" :key="link.id">
                                    <router-link  active-class="text-primary" :to="link.path" class="flex w-full justify-center items-center hover:text-primary">
                                        <span>{{ link.text }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="w-full py-2">
                        <button class="flex justify-center items-center w-full space-x-1" @click="toggleMenu('persongMenu')">
                            <span>Personal Care</span>
                            <fa-icon icon="angle-down" size="sm"/>
                        </button>

                        <!-- dropdown -->
                        <div class="hidden border border-gray-300 bg-gray-100 mx-2 rounded" id="persongMenu">
                            <ul>
                                <li class="m-2" v-for="link in personalCareLinks" :key="link.id">
                                    <router-link :to="link.path" class="flex w-full justify-center items-center hover:text-primary"
                                        active-class="text-primary"
                                    >
                                        <span>{{ link.text }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="w-full py-2">
                        <router-link to="/about" class="hover:text-primary justify-center items-center transition duration-300 w-full flex" active-class="text-primary">
                            <span>About</span>
                        </router-link>
                    </li>
                    <li class="w-full py-2">
                        <router-link to="/contact" class="hover:text-primary justify-center items-center transition duration-300 w-full flex" active-class="text-primary">
                            <span>Contact Us</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </transition>
  </header>
  
</template>

<script>
export default {
    data(){return{
        mobileNavbar: false,
        clothingLinks: [
            {id: 1, text: 'Women\'s Clothing', path: '/women'},
            {id: 2, text: 'Men\'s Clothing', path: '/men'},
            {id: 3, text: 'Kid\'s Wear', path: '/kids'},
            {id: 4, text: 'Party Wear', path: '/party'},
        ],
        personalCareLinks: [
            {id: 1, text: 'Jewellery', path: '/jewellery'},
            {id: 2, text: 'Watches', path: '/watches'},
            {id: 3, text: 'Shoes', path: '/shoes'},
            {id: 4, text: 'Handbags', path: '/handbags'},
        ],
        dropdownOpen: false,
        dropdownOpen1: false,

    }},
    methods: {
        toggleMenu(id){
            document.getElementById(id).classList.toggle("hidden");
        }
    }

}
</script>

<style>

</style>