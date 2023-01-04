<script setup>
import { store } from "../stores/store";
import { format } from "date-fns";
</script>

<template>
  <div
    class="mt-14 section flex flex-col gap-10 w-screen justify-center items-center"
  >
    <h2 class="h2 mb-1 text-lg font-semibold">Upcoming Orders</h2>
    <div
      class="flex gap-1 items-center px-5 max-w-md rounded mx-5 overflow-hidden shadow-lg"
      :key="item.id"
      v-for="item in store.order"
    >
      <div class="px-6 py-4">
        <div class="badge  badge-success text-xs">{{item.status}}</div>

        <p>
          {{ item?.products.map((el) => el.name).join(" + ") }}
        </p>
        <p class="text-xs text-slate-500">
          Delivery by:
          {{ format(new Date(item?.delivery_date), "dd/MM/yyyy") }}
        </p>
        <div class="flex flex-col gap-1 mt-2">
          
          <div class="flex items-center text-slate-500 content-center">
            .....Items.....
          </div>
        </div>
        <div :key="product.id" v-for="product in item.products">
          <div class="text-sm">
            {{ product.name }} x {{ product.quantity }} =
            {{ product.price * product.quantity }}
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <p class="text-slate-500">
          ₹
          {{ item.amount }}
        </p>
      </div>
    </div>
  </div>
</template>
