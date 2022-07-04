<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <Sidebar/>
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <router-view></router-view>
          </transition>
        </div>
      </main>
    </div>


  </div>
</template>

<script>
import Sidebar from "../components/admin/Sidebar.vue";
import Header from "../components/admin/Header.vue";

export default {
  components: {
    Sidebar,
    Header
  }
}
</script>

<style>

</style>