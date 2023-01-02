<script setup>
import { ref } from "vue";
import route from '../router/index';

import { store } from "../stores/store";
function tocheckout(e) {
  e.preventDefault();
  route.push('/checkout')

}




</script>

<template>
  <div @click="tocheckout" class="fixed bottom-4 right-4 z-30">
   
      <label
        tabindex="0"
        class="btn z-40 flex gap-10 bg-zinc-900 hover:bg-zinc-800 text-white m-1"
      >
        Checkout + {{ store.cart.length }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      <!-- <button
        tabindex="0"
        class="dropdown flex-col flex justify-between text-zinc-900 bg-zinc-100 menu p-2 shadow rounded-box w-64 h-96"
      > -->
        <!-- <div  class="min-h-100 flex flex-col justify-between">
          <h1>Checkout</h1>
          <li :key="store.cart.length + item.name" v-for="item in store.cart">
            <p>
              <figure>
                <img class="h-8 w-8" :src="item.image" :alt="item.name" />
              </figure>

              {{ item.name + "  " + item.price }}
              quantity: {{ item.quantity }}
            </p>
          </li>
        </div>
        <div v-if="view === 1" class="min-h-100 flex flex-col gap-3 justify-between">
         
          <DaysSelector
          @select="select"
          :data="WeekData"
          :selectedDays="SelectedDays"
        >
        </DaysSelector>
        <div class="flex flex-col gap-3">
          <label>Start Date</label>
        <DateSelector/>

        </div>
        <div class="flex flex-col gap-4">
          <label>Select Time Slot</label>

        </div>

        </div> -->
        
<!--         
        <button
          @click="formList[view]"
          class="btn relative bottom-2 btn-primary"
        >
          Start Subscription
        </button> -->
      <!-- </ul> -->
  
  </div>
</template>
