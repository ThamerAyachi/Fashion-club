<template>
  <div>
    <!-- banner -->
    <div class="banner min-h-52 grid grid-cols-1 md:grid-cols-2">
      <div class="md:my-40 md:mx-16 my-5 mx-5 paragraph">
        <span
          class="uppercase block text-primary md:text-3xl text-xl md:my-5 my-2 font-medium tracking-widest"
          >welcome to</span
        >
        <span
          class="uppercase block text-white md:text-5xl text-4xl font-semibold md:my-5 my-2"
          >fashion <span class="text-primary">club</span></span
        >
        <span
          class="block text-gray-300 text-sm my-2 md:my-5 mr-14 tracking-wide leading-7"
        >
          Fashion club is one of the best online shopping stores in Tunisia. We
          provide a large variety of international products across the globe.
        </span>
        <router-link
          to="/about"
          class="my-5 text-white bg-black hover:bg-primary text-sm px-3 p-2 transition duration-300"
        >
          <span>Read More</span>
        </router-link>
      </div>
      <div></div>
    </div>

    <!-- sold % -->
    <div class="md:mx-10 mx-5 my-10">
      <div class="grid md:grid-cols-2 grid-cols-1 space-y-2">
        <!-- section 1 -->
        <router-link
          to="/women"
          class="section-1 sold-1 flex justify-center items-center hover:scale-110 duration-500 transform md:mx-5 lg:mx-20 text-white"
        >
          <div class="my-28 md:my-44 w-full text-center">
            <span class="uppercase block text-5xl">sale</span>
            <span class="font-medium text-xl mr-3"
              >upto <span class="ml-1 text-5xl">75%</span></span
            >
          </div>
        </router-link>
        <!-- section 2 -->
        <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
          <router-link
            :to="doc.path"
            v-for="doc in solds"
            :key="doc.id"
            :style="`background-image: url(${doc.img});`"
            :class="`section-${doc.s} sold-2 flex justify-center items-center hover:scale-110 duration-500 transform text-white`"
          >
            <div class="my-28 md:my-20 w-full text-center">
              <span class="uppercase block text-5xl">sale</span>
              <span class="font-medium text-xl mr-3"
                >upto
                <span class="ml-1 text-5xl">{{ doc.persent }}%</span></span
              >
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="flex justify-center">
        <span class="block text-4xl my-5 font-medium tracking-wide">
          New Launches
        </span>
      </div>

      <!-- cards -->
      <div class="grid lg:grid-cols-4 grid-cols-2 md:mx-32 mx-4 gap-3 my-10">
        <Card
          v-for="(p, i) in products"
          :key="i"
          :_id="p.id"
          :img="baseUrl + p.imgUrl"
          :price="p.price"
          :name="p.name"
          :class="`prod-${i}`"
        />
      </div>

      <div class="flex justify-center">
        <span class="block text-4xl my-5 font-medium tracking-wide"
          >Top Brands</span
        >
      </div>

      <!-- brands -->
      <div
        class="overflow-x-scroll mt-4 flex space-x-4 md:mx-32 mx-5 brands my-4"
      >
        <div
          class="rounded my-2 w-64 mx-2 flex-none"
          v-for="(brand, i) in brands"
          :key="i"
        >
          <img :src="brand" alt="alt" class="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../components/user/home/Card.vue";
import gsap from "gsap";

export default {
  data() {
    return {
      baseUrl: this.$store.state.baseUrl,
      solds: [
        { id: 1, persent: 50, img: "/img/bb2.jpg", path: "/shoes", s: "2" },
        { id: 2, persent: 55, img: "/img/bb3.jpg", path: "/watches", s: "3" },
        { id: 3, persent: 65, img: "/img/bb4.jpg", path: "/jewellery", s: "4" },
        { id: 4, persent: 60, img: "/img/bb5.jpg", path: "/handbags", s: "5" },
      ],
      brands: [
        "https://i.ibb.co/zNtfXKS/7.png",
        "https://i.postimg.cc/3xLmhFym/46.jpg",
        "https://i.postimg.cc/brTdTqkk/4.png",
        "https://i.postimg.cc/15735CHm/5.png",
        "https://i.postimg.cc/wBjKygTn/6.png",
      ],
      products: [],
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await this.$store.dispatch("getProducts");

        if (res.status != 200) {
          return;
        }

        if (res.data.length <= 8) {
          this.products = res.data;
          return;
        }

        // eslint-disable-next-line for-direction
        for (let i = res.data.length; i > res.data.length - 8; i--) {
          this.products.push(res.data[i - 1]);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  components: {
    Card,
  },
  async created() {
    await this.getProducts();
    for (let i = 0; i <= 7; i++) {
      gsap.from(`.prod-${i}`, {
        scrollTrigger: `.prod-${i}`,
        opacity: 0,
        duration: 1,
      });
    }
  },
  async mounted() {
    window.scrollTo(0, 0);
    gsap.from(".paragraph", {
      scrollTrigger: ".paragraph",
      x: -500,
      opacity: 0,
      duration: 1,
    });

    for (let i = 1; i <= 5; i++) {
      gsap.from(`.section-${i}`, {
        scrollTrigger: `.section-${i}`,
        opacity: 0,
        duration: 1.2,
      });
    }
  },
};
</script>

<style>
.banner {
  background-image: url("/img/banner2.jpg");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
.sold-1 {
  background-image: url("/img/bb1.jpg");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
.sold-2 {
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
.brands::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.brands::-webkit-scrollbar-thumb {
  background: rgb(190, 190, 190, 0.1);
  border-radius: 10px;
}
.brands::-webkit-scrollbar-thumb:hover {
  background: rgb(190, 190, 190, 0.5);
}
</style>