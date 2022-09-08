<template>
  <div>
    <div class="grid lg:grid-cols-6 grid-cols-1 lg-5 lg:mx-12 mx-5 my-5 gap-4">
      <div class="lg:col-span-4 space-y-3">
        <!-- title -->
        <div class="bg-white shadow-sm p-5 rounded-md">
          <p class="text-gray-800 text-2xl font-bold my-2">
            Shopping Cart ({{ orderData.products.length }})
          </p>
          <!-- cart -->
          <div class="flex flex-col mt-6">
            <div
              class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              <div
                class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
              >
                <!-- table -->
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th
                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                      >
                        Photo
                      </th>
                      <th
                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                      >
                        Name
                      </th>
                      <th
                        class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
                      >
                        Price
                      </th>
                      <th
                        class="px-6 py-3 bg-gray-100 border-b border-gray-200"
                      ></th>
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                    <tr v-for="(p, index) in orderData.products" :key="index">
                      <td
                        class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                      >
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-10 h-10 overflow-hidden">
                            <img
                              class="h-10 rounded-full"
                              :src="p.imgUrl"
                              alt="profile pic"
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                      >
                        <div
                          class="text-sm font-medium leading-5 text-gray-900"
                        >
                          {{ p.name }}
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                      >
                        {{ p.price }} TND
                      </td>

                      <td
                        class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                      >
                        <button
                          @click="deleteProductByFromCart(p)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow-sm p-5 rounded-md">
          <!-- title -->
          <div class="py-5">
            <p class="text-black font-bold text-xl">Order Summary</p>
          </div>

          <div class="space-y-3 font-bold border-b pb-3">
            <div class="flex justify-between text-sm">
              <p class="">Subtotal</p>
              <p class="text-gray-500">{{ total }} TND</p>
            </div>
            <div class="flex justify-between text-sm">
              <p class="">Shipping Fee:</p>
              <p class="text-gray-500">Calculating at checkout</p>
            </div>
            <div class="flex justify-between text-sm">
              <p class="">Estimated Total:</p>
              <p class="">{{ total }} TND</p>
            </div>
          </div>

          <div class="my-3">
            <button
              @click="open = true"
              class="font-bold bg-primary text-white w-full p-1 rounded space-x-1 hover:bg-blue-400 transform duration-100"
            >
              <fa-icon icon="lock" class="" />
              <span class="text-sm">Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:mx-12 mx-5 my-5" v-if="whiteListProducts[0]">
      <h3 class="text-gray-600 text-3xl py-3">White list products :</h3>
      <transition-group
        class="grid lg:grid-cols-4 col-span-2 grid-cols-2 mx-4 gap-3 my-10"
        tag="div"
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <ProductCard
          v-for="(p, i) in whiteListProducts"
          :key="i"
          :img="p.imgUrl"
          :_id="p.id"
          :price="p.price"
          :name="p.name"
        />
      </transition-group>
      <div
        class="text-gray-500 tracking-widest text-xl uppercase flex justify-center w-full sm:col-span-3"
      >
        There is {{ whiteListProducts.length }} product{{
          whiteListProducts.length > 1 ? "s" : ""
        }}
        defined
      </div>
    </div>

    <Model :Open="open">
      <ModelTitle @close="open = false">Shipping information</ModelTitle>

      <ModelBody>
        <div class="space-y-2">
          <input
            type="text"
            placeholder="Full Name*"
            required
            v-model="orderData.fullName"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          />

          <input
            type="number"
            placeholder="Telephone/Mobile*"
            required
            v-model="orderData.telephone"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          />

          <select
            name=""
            v-model="orderData.state"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          >
            <option value="">Please select</option>
            <option
              v-for="(state, index) in states"
              :key="index"
              :value="state.value"
            >
              {{ state.name }}
            </option>
          </select>

          <input
            type="text"
            placeholder="City or Town*"
            required
            v-model="orderData.city"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          />

          <input
            type="text"
            placeholder="Street"
            required
            v-model="orderData.street"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          />

          <input
            type="text"
            placeholder="Zip/Postal Code*"
            required
            v-model="orderData.zip"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          />

          <select
            v-model="orderData.place"
            class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:outline-none focus:shadow-outline"
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>

          <div
            class="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mb-3"
            v-if="v$.$error"
          >
            <p v-for="(errorMessage, i) in errors" :key="i">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </ModelBody>

      <ModelFooter>
        <button
          @click="open = false"
          class="p-3 px-6 py-3 mr-2 text-primary bg-transparent rounded-lg hover:bg-gray-100 hover:text-green-300 focus:outline-none"
        >
          Close
        </button>
        <button
          @click="submit"
          class="px-6 py-3 font-medium tracking-wide text-white bg-primary rounded-md hover:bg-green-300 focus:outline-none"
          :disabled="isSending"
        >
          <fa-icon
            icon="rotate"
            class="text-xl"
            :spin="true"
            v-if="isSending"
          />
          <span v-else>Send Order</span>
        </button>
      </ModelFooter>
    </Model>

    <!-- success alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isSuccess"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-green-500">
            <svg
              class="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
              />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-green-500">Success</span>
              <p class="text-sm text-gray-600">Your order was sending!</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- error alert -->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="px-4 py-20 overflow-x-auto absolute top-1 rounded-md whitespace-nowrap"
        v-if="isError"
      >
        <div
          class="inline-flex w-full overflow-hidden bg-white rounded-lg shadow-md"
        >
          <div class="flex items-center justify-center w-12 bg-red-500">
            <svg
              class="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
              />
            </svg>
          </div>

          <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
              <span class="font-semibold text-red-500">Error</span>
              <p class="text-base text-gray-800">
                Can't get target upload source info
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Model from "../../components/global/Model.vue";
import ModelTitle from "../../components/global/ModelTitle.vue";
import ModelBody from "../../components/global/ModelBody.vue";
import ModelFooter from "../../components/global/ModelFooter.vue";
import ProductCard from "../../components/user/ProductCard.vue";

import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { numberFormate } from "../../assets/Methods";

export default {
  data() {
    return {
      v$: useValidate(),
      open: false,
      states: [
        { value: "Ariana", name: "Ariana" },
        { value: "Beja", name: "Béja" },
        { value: "Ben Arous", name: "Ben Arous" },
        { value: "Bizerte", name: "Bizerte" },
        { value: "Gabes", name: "Gabès" },
        { value: "Gafsa", name: "Gafsa" },
        { value: "Jendouba", name: "Jendouba" },
        { value: "Kairouan", name: "Kairouan" },
        { value: "Kasserine", name: "Kasserine" },
        { value: "Kebili", name: "Kebili" },
        { value: "Kef", name: "Kef" },
        { value: "Mahdia", name: "Mahdia" },
        { value: "Manouba", name: "Manouba" },
        { value: "Medenine", name: "Medenine" },
        { value: "Monastir", name: "Monastir" },
        { value: "Nabeul", name: "Nabeul" },
        { value: "Sfax", name: "Sfax" },
        { value: "Sidi Bouzid", name: "Sidi Bouzid" },
        { value: "Siliana", name: "Siliana" },
        { value: "Sousse", name: "Sousse" },
        { value: "Tataouine", name: "Tataouine" },
        { value: "Tozeur", name: "Tozeur" },
        { value: "Tunis", name: "Tunis" },
        { value: "Zaghouan", name: "Zaghouan" },
      ],
      orderData: {
        fullName: "",
        telephone: "",
        state: "",
        city: "",
        street: "",
        zip: "",
        place: "Home",
        products: [],
      },
      errors: [],
      whiteListProducts: [],
      total: "0",
      isError: false,
      isSuccess: false,
      isSending: false,
    };
  },
  validations() {
    return {
      orderData: {
        fullName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20),
        },
        telephone: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(8),
        },
        state: { required, minLength: minLength(3), maxLength: maxLength(20) },
        city: { required, minLength: minLength(3), maxLength: maxLength(20) },
        street: {},
        zip: { required, minLength: minLength(3), maxLength: maxLength(20) },
      },
    };
  },
  components: {
    Model,
    ModelTitle,
    ModelBody,
    ModelFooter,
    ProductCard,
  },
  methods: {
    async submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          this.isSending = true;
          const res = await this.$store.dispatch("createOrder", this.orderData);

          if (res.status != 201) {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
            this.isSending = false;
            return;
          }
          await this.$store.dispatch("removeCart");
          this.orderData = {
            fullName: "",
            telephone: "",
            state: "",
            city: "",
            street: "",
            zip: "",
            place: "Home",
            products: [],
          };
          this.isSending = false;
          this.open = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
        } catch (err) {
          console.log(err);
        }
      } else {
        this.errors = [];
        for (let i = 0; i < this.v$.$errors.length; i++) {
          this.errors[
            i
          ] = `${this.v$.$errors[i].$property} : ${this.v$.$errors[i].$message}`;
        }
      }
    },
    async getWhiteListProducts() {
      const res = await this.$store.dispatch("getWhiteList");

      this.whiteListProducts = res;
    },
    async getCartProducts() {
      const res = await this.$store.dispatch("getCart");

      this.orderData.products = res;
    },
    getTotal() {
      let allPrice = 0;
      this.orderData.products.map((p) => {
        allPrice += Number.parseInt(p.price);
      });
      this.total = numberFormate(allPrice);
    },
    async deleteProductByFromCart(product) {
      await this.$store.dispatch("removeProductCart", product);

      await this.getCartProducts();
      this.getTotal();
    },
  },
  async mounted() {
    window.scrollTo(0, 0);
    await this.getCartProducts();
    await this.getWhiteListProducts();
    this.getTotal();
  },
};
</script>

<style></style>
