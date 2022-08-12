<template>
  <div>
    <div class="grid sm:grid-cols-3 grid-cols-1 lg:mx-32 mx-5 my-10">
      <!-- col-1 -->
      <div>
        <!-- Categories -->
        <div class="my-5">
          <div class="flex items-center space-x-4">
            <span v-html="icon" class="text-primary"></span>
            <span class="text-2xl text-gray-800">Categories</span>
          </div>

          <div
            class="border border-gray-300 mx-5 md:mx-1 lg:ml-7 lg:mr-20 p-2 rounded-sm text-xs text-gray-900 my-3 space-y-2"
          >
            <button
              v-for="(btn, i) in btnsCategories"
              :key="i"
              @click="filterDataWithCategorie(btn.categorie)"
              class="p-2 rounded block w-full hover:bg-primary hover:text-white transform duration-300 text-left"
            >
              {{ btn.text }}
            </button>
            <button
              @click="seData = Data"
              class="p-2 rounded block w-full hover:bg-primary hover:text-white transform duration-300 text-left"
            >
              All
            </button>
          </div>
        </div>

        <!-- Size -->
        <div class="my-5">
          <div class="flex items-center space-x-4">
            <span v-html="icon" class="text-primary"></span>
            <span class="text-2xl text-gray-800">Size</span>
          </div>

          <div
            class="border border-gray-300 mx-5 md:mx-1 lg:ml-7 lg:mr-20 p-2 rounded-sm text-xs text-gray-900 my-3 space-y-2"
          >
            <button
              v-for="(btn, i) in btnsSize"
              :key="i"
              @click="filterDataWithSize(btn.size)"
              class="p-2 rounded block w-full hover:bg-primary hover:text-white transform duration-300 text-left"
            >
              {{ btn.text }}
            </button>
          </div>
        </div>
      </div>

      <!-- col-2 cards-->
      <div class="grid lg:grid-cols-3 col-span-2 grid-cols-2 mx-4 gap-3 my-10">
        <ProductCard
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYbh_DLNtjq9QWS0AtfEoZlsNOst_VPLwXQ&usqp=CAU"
        />
        <ProductCard
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIml9N9LwMJLckGokt4yxx0rRKSl4bno99A&usqp=CAU"
          isNew="true"
        />
        <ProductCard
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFNouDTCrBhcxfuYY6SFJijtsqmkpJ4dvKGA&usqp=CAU"
        />
        <ProductCard
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdr_AsQjpJxpcLQKVSKqFjte9FCA3y5fazGA&usqp=CAU"
        />
        <ProductCard
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ70pV7aY5cxjLaNDlRNneE-1PHfual3SmX5A&usqp=CAU"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../../components/user/ProductCard.vue";

export default {
  data() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" /></svg>`,
      Data: [
        { name: "dres", categorie: "slacks", size: "m" },
        { name: "Shorts ksd", categorie: "jeans", size: "l" },
        { name: "Jeans Jeans", categorie: "slacks", size: "xl" },
        { name: "Shirts dres", categorie: "shirts", size: "s" },
        { name: "dres", categorie: "jeans", size: "xl" },
      ],
      btnsCategories: [
        { text: "Neck sets", categorie: "neckSets" },
        { text: "Rings", categorie: "rings" },
        { text: "Chains", categorie: "chains" },
        { text: "Bracelets", categorie: "bracelets" },
      ],
      btnsSize: [
        { text: "Medium", size: "m" },
        { text: "Large", size: "l" },
        { text: "Extra Large", size: "xl" },
        { text: "Small", size: "s" },
      ],
      seData: null,
    };
  },
  methods: {
    filterDataWithCategorie(categorie) {
      this.seData = this.Data.filter((res) => res.categorie == categorie);
    },
    filterDataWithSize(size) {
      this.seData = this.Data.filter((res) => res.size == size);
    },
  },
  mounted() {
    this.seData = this.Data;
    console.log(this.seData);
    window.scrollTo(0, 0);
  },
  components: {
    ProductCard,
  },
};
</script>

<style></style>
