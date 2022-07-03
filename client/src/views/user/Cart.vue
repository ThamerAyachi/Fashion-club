<template>
  <div>
      <div class="grid lg:grid-cols-6 grid-cols-1 lg-5 lg:mx-12 mx-5 my-5 gap-4">
          <div class="lg:col-span-4 space-y-3">
              <!-- title -->
              <div class="bg-white shadow-sm p-5 rounded-md">
                  <p class="text-gray-800 text-2xl font-bold my-2">Shopping Cart (n)</p>
                  <!-- cart -->
                  <div class="my-5">
                    <table class="w-full text-left border-collapse">
                        <thead class="border-b">
                        <tr>
                            <th
                            class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-green-400"
                            >
                            Product
                            </th>
                            <th
                            class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-green-400"
                            >
                            Price
                            </th>
                            <th
                            class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-green-400"
                            >
                            Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="index in 3"
                            :key="index"
                        >
                            <td class="px-6 py-4 text-lg text-gray-700 border-b font-bold">
                            Product name
                            </td>
                            <td class="px-6 py-4 text-gray-500 border-b">
                            45.00 TND
                            </td>
                            <td class="px-6 py-4 text-gray-500 border-b">
                                <button class="text-red-500 bg-white rounded hover:bg-red-500 hover:text-white duration-150 transform">
                                    <fa-icon icon="trash" class="mx-3 my-1" :spin="false"/>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
                        <p class="text-gray-500">TND3,068.00</p>
                    </div>
                    <div class="flex justify-between text-sm">
                        <p class="">Shipping Fee:</p>
                        <p class="text-gray-500">Calculating at checkout</p>
                    </div>
                    <div class="flex justify-between text-sm">
                        <p class="">Estimated Total:</p>
                        <p class="">TND3,068.00</p>
                    </div>
                </div>

                <div class="my-3">
                    <button 
                    @click="open = true"
                    class="font-bold bg-primary text-white w-full p-1 rounded space-x-1 hover:bg-blue-400 transform duration-100">
                        <fa-icon icon="lock" class=""/>
                        <span class="text-sm">Proceed to Checkout</span>
                    </button>
                </div>
            </div>

          </div>
      </div>

    <Model :Open="open">
        <ModelTitle
            @close="open= false"
        >Shipping information</ModelTitle>

        <ModelBody>
            <div class="space-y-2">
              <input type="text" placeholder="Full Name*" required
                v-model="orderData.fullName"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:border-primary focus:outline-none focus:shadow-outline
                "
              >

              <input type="number" placeholder="Telephone/Mobile*" required
                v-model="orderData.telephone"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:border-primary focus:outline-none focus:shadow-outline
                "
              >

              <select name=""
                v-model="orderData.state"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:border-primary focus:outline-none focus:shadow-outline">
                <option value="">Please select</option>
                <option 
                v-for="state, index in states" :key="index"
                :value="state.value">
                    {{ state.name }}
                </option>
              </select>


              <input type="text" placeholder="City or Town*" required
                v-model="orderData.city"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:border-primary focus:outline-none focus:shadow-outline
                "
              >

              <input type="text" placeholder="Street*" required
                v-model="orderData.street"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:border-primary focus:outline-none focus:shadow-outline
                "
              >

              <input type="text" placeholder="Zip/Postal Code*" required
                v-model="orderData.zip"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight 
                    focus:border-primary focus:outline-none focus:shadow-outline
                "
              >

              <select
                v-model="orderData.place"
                class="shadow-sm appearance-none block border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight
                    focus:border-primary focus:outline-none focus:shadow-outline"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </select>


              <div class="bg-red-100 rounded-lg py-3 px-6 text-base text-red-700 mb-3"
                v-if="v$.$error"
              >
                <p v-for="errorMessage, i in errors" :key="i" >
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
            >
                Action
            </button>
        </ModelFooter>
    </Model>
    
  </div>
</template>

<script>
import Model from '../../components/global/Model.vue'
import ModelTitle from '../../components/global/ModelTitle.vue'
import ModelBody from '../../components/global/ModelBody.vue'
import ModelFooter from '../../components/global/ModelFooter.vue'

import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    data(){
        return{
            v$: useValidate(),
            open: false,
            states: [
                {value: 'Ariana', name: 'Ariana'},
                {value: 'Beja', name: 'Béja'},
                {value: 'Ben Arous', name: 'Ben Arous'},
                {value: 'Bizerte', name: 'Bizerte'},
                {value: 'Gabes', name: 'Gabès'},
                {value: 'Gafsa', name: 'Gafsa'},
                {value: 'Jendouba', name: 'Jendouba'},
                {value: 'Kairouan', name: 'Kairouan'},
                {value: 'Kasserine', name: 'Kasserine'},
                {value: 'Kebili', name: 'Kebili'},
                {value: 'Kef', name: 'Kef'},
                {value: 'Mahdia', name: 'Mahdia'},
                {value: 'Manouba', name: 'Manouba'},
                {value: 'Medenine', name: 'Medenine'},
                {value: 'Monastir', name: 'Monastir'},
                {value: 'Nabeul', name: 'Nabeul'},
                {value: 'Sfax', name: 'Sfax'},
                {value: 'Sidi Bouzid', name: 'Sidi Bouzid'},
                {value: 'Siliana', name: 'Siliana'},
                {value: 'Sousse', name: 'Sousse'},
                {value: 'Tataouine', name: 'Tataouine'},
                {value: 'Tozeur', name: 'Tozeur'},
                {value: 'Tunis', name: 'Tunis'},
                {value: 'Zaghouan', name: 'Zaghouan'},
            ],
            orderData:{
                fullName: '',
                telephone: '',
                state: '',
                city: '',
                street: '',
                zip: '',
                place: 'Home',
                data: {},
            },
            errors: [],
        }
    },
    validations() {
        return {
            orderData:{
                fullName: { required },
                telephone: { required },
                state: { required },
                city: { required },
                street: { required },
                zip: { required },
            }
        }
    },
    components: {
        Model,
        ModelTitle,
        ModelBody,
        ModelFooter
    },
    methods:{
        submit(){
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log(this.orderData)
            }
            else {
                this.errors = [];
                for(let i = 0; i<this.v$.$errors.length; i++){
                    this.errors[i] = `${this.v$.$errors[i].$property} : ${this.v$.$errors[i].$message}` ;
                }
            }
        }
    }

}
</script>

<style>
</style>