<script setup>
import { store } from "../stores/store";
import Card from "./Card.vue";

console.log(store);
</script>

<template>
  <div class="drawer bg-white drawer-end mt-14">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content">
      <slot> </slot>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>
      <div
        v-if="store.products.length > 0"
        class="flex-col flex menu p-4 w-80 bg-white text-base-content mt-16"
      >
        <ul :key="item.id" v-for="item in store?.products">
          <li class="text-gray-900">
            <div class="flex flex-row gap-5">
              <img :src="item.image" class="h-10 w-10" :alt="item.name" />
              <div class="flex flex-col gap-2">
                <div>{{ item.name }}</div>
                <div>Rs. {{ item.price }}</div>
              </div>
            </div>
          </li>
        </ul>
        <button class="btn btn-sm btn-info">Add to Upcoming order</button>
      </div>
    </div>
  </div>
</template>
