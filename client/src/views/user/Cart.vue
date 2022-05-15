<template>
  <div>
      <div class="grid lg:grid-cols-6 grid-cols-1 lg-5 lg:mx-12 mx-5 my-5 gap-4">
          <div class="lg:col-span-4 space-y-3">
              <!-- title -->
              <div class="bg-white shadow-sm p-5 rounded-md">
                  <p class="text-black text-2xl font-bold my-2">Shopping Cart (n)</p>
              </div>
              <!-- card -->
              <div class="bg-white shadow-sm p-5 rounded-md md:flex grid grid-cols-2 items-center md:justify-between space-y-5">
                  <div class="md:w-20 w-full h-40 md:h-auto overflow-hidden items-center col-span-2">
                      <img 
                      class="m-0 w-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYbh_DLNtjq9QWS0AtfEoZlsNOst_VPLwXQ&usqp=CAU" 
                      alt="">
                  </div>
                    <div class="space-y-2">
                        <!-- Name -->
                        <div class="text-gray-600 text-sm">
                            Name
                        </div>
                        <div class="font-medium">
                            Product Name
                        </div>
                    </div>
                    <!-- Price -->
                    <div class="space-y-2">
                        <div class="text-gray-600 text-sm">
                            Price
                        </div>
                        <div class="font-medium">
                            TND 58
                        </div>
                    </div>
                    <!-- Quantity -->
                    <div class="space-y-2">
                        <div class="text-gray-600 text-sm">
                            Quantity
                        </div>
                        <div class="font-medium">
                            <input type="number" class="border-gray-600 w-24 rounded">
                        </div>
                    </div>
                    <div class="mx-7">
                        <button class="text-red-400 space-x-2 border border-red-400 p-2">
                            <fa-icon icon="trash" class=" fa-lg"/>
                            <span>Delet</span>
                        </button>
                    </div>
              </div>
          </div>
          <div class="bg-green-400 lg:col-span-2">test</div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>