<template>
  <div>
    <!-- cover -->
    <section class="md:h-52 h-40 2xl:h-64 overflow-hidden">
      <div
        class="bg-center bg-cover h-full"
        style="
          background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80');
        "
      ></div>
    </section>
    <!-- profile img -->
    <section class="relative py-16 mt-20 bg-blueGray-200">
      <div class="container mx-auto px-4 -mt-64 flex justify-center">
        <label
          for="test"
          class="rounded-full overflow-hidden shadow-md bg-gray-100"
        >
          <img
            :src="img"
            class="w-44 rounded-full hover:rotate-45 duration-500 transform cursor-pointer border-4 border-gray-200"
            alt=""
          />
        </label>
      </div>
      <input type="file" id="test" class="hidden" />
    </section>
    <!-- form -->
    <div class="relative -mt-36 mx-3">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Account settings
          </h2>

          <form>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="username">Username</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                />
              </div>

              <div>
                <label class="text-gray-700" for="emailAddress"
                  >Email Address</label
                >
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="email"
                />
              </div>

              <div>
                <label class="text-gray-700" for="password">Password</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="password"
                />
              </div>

              <div>
                <label class="text-gray-700" for="passwordConfirmation"
                  >Password Confirmation</label
                >
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="password"
                />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg",
    };
  },
  methods: {
    async getUser() {
      try {
        const res = await this.$store.dispatch("getUser");
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    const user = await this.getUser();
    this.img = user.imgUrl;
  },
};
</script>

<style lang="scss" scoped></style>
