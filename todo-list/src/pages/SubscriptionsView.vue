<script setup>
import { store } from "../stores/store";
import { format, formatDistance } from "date-fns";


</script>

<template>
  <div class=" mt-14 section flex flex-col gap-10 w-screen justify-center items-center">
    <h2 class="h2 mb-1 text-lg font-semibold">Manage Your Subscriptions </h2>
    <h3>Active Subscriptions</h3>
    <div class="flex gap-1 items-center px-5 max-w-md rounded mx-5 overflow-hidden shadow-lg " :key="subs.id" v-for="subs in store.subscription">
      <div class="px-6 py-4 ">
        <div class="text-sm badge badge-primary">
          {{ subs.recurrence }}
        </div>
        <p >
          {{ subs?.products.map((el) => el.name).join(" + ") }}
        </p>
        <p class="text-xs text-slate-500">
          created
          {{ formatDistance(new Date(subs?.created_at) , new Date(), { addSuffix: true }) }}
        </p>
        <div class="flex  mt-2">
          <div class="text-xs text-slate-500">
     
          {{ format(new Date(subs?.start_date), "dd/MM/yyyy") }}
        </div>
        <div class="flex items-center text-slate-500 content-center">
          ......
        </div>
        <div class="text-xs text-slate-500">
          
          {{ format(new Date(subs?.end_date), "dd/MM/yyyy") }}
        </div>
        </div>
        
        <div :key="product.id" v-for="product in subs.products" >
          <div class="text-sm">{{product.name}} x {{product.quantity}} = {{product.price * product.quantity}}</div>

        </div>
       
      </div>
      <div class="flex flex-col gap-3">
        <p>
        ₹
        {{
         subs.total_amount
        }}
      </p>
      <button class="button bg-green-600 rounded text-zinc-100 px-3">
      Cancel
    </button>

      </div>
     
    </div>
   
  </div>
</template>
