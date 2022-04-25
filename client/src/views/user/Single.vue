<template>
  <div>
      <div class="grid md:grid-cols-2 grid-cols-1 lg:mx-32 mx-5 my-10 gap-3">
          <!-- image -->
          <div class="flex justify-center overflow-hidden items-center border border-gray-200 bg-white rounded py-2">
              <img src="/img/tp1.jpg" alt="product img" class="">
          </div>
          <div class="p-1 text-gray-400">
              <h2 class="text-primary text-3xl my-3">{{ product.name }}</h2>
              <p class="text-sm my-2">Processing Time: Item will be call you within 1-2 working days.</p>
              <hr>
              <div class="my-3 flex items-center">
                  <h2 class="text-2xl px-2 text-blue-400">{{ product.price }} TND</h2>
                  <p class="px-2 text-sm">Start on: {{ product.startDate }}</p>
              </div>
              <p class="text-sm my-2 leading-5 tracking-wide">{{ product.description }}</p>

              <!-- actions -->
              <div class="my-2 md:space-x-7 space-x-2 flex p-3">
                  <button class="flex items-center bg-primary hover:bg-blue-400 text-white transform duration-300 text-sm py-2 px-4 space-x-2">
                      <fa-icon icon="cart-shopping"/>
                      <span class="font-medium">Add to cart</span>
                  </button>
                  <button class="flex items-center bg-white hover:bg-primary hover:text-white border border-primary text-primary transform duration-300 text-sm py-2 px-4 space-x-2">
                      <fa-icon icon="heart"/>
                      <span>Add to Wishlist</span>
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            product: {
                name: 'Product Name',
                price: '42',
                startDate: 'Oct,15th',
                description: 'Fusce a egestas nibh, eget ornare erat. Proin placerat, urna et consequat efficitur, sem odio blandit enim, sit amet euismod turpis est mattis lectus. Vestibulum maximus quam et quam egestas imperdiet. In dignissim auctor viverra.'
            }
        }
    }

}
</script>

<style>

</style>