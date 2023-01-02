<script setup>
import { ref, watch } from "vue";
import { store } from "../stores/store";
console.log(store.cart.values.length);

let cart =  ref(store.cart);
const props = defineProps([
  "id",
  "name",
  "description",
  "price",
  "stock",
  "image",
  "item",
]);

let isInCart = cart.value.filter((item) => item.id === props.id).length > 0 ? false : true  ;

console.log(isInCart ? 'print': 'false')

</script>

<template>
  <div class="card w-64 h-90 bg-white text-slate-900 shadow-xl">
    <figure>
      <img class="h-48 max-h-36" :src="image" :alt="name" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-black">{{ name }}</h2>
      <p class="text-slate-600">{{ description }}</p>
      <div class="flex justify-end">
        <div class="bg-white text-black text-base">₹ {{ price }}</div>
      </div>
      <div
        v-if="
          store?.cart?.find((item) => item.id === id)?.quantity > 0
            ? false
            : true
        "
        class="card-actions justify-center"
      >
        <button
          @click="
            store.addCartItem({
              id,
              name,
              description,
              price,
              image,
              quantity: 1,
            })
          "
          class="btn btn-primary"
        >
          Buy Now
        </button>
      </div>
      <div v-else>
        <div class="flex gap-10 items-center content-center">
          <button @click="store.addQuantity(id)" class="btn btn-ghost"> + </button>
          <label>{{ store.cart.filter((item) => item.id === id)[0].quantity }}</label>
          <button  @click="store.removeQuantity(id)"  class="btn btn-ghost"> - </button>

        </div>

      </div>
    </div>
  </div>
</template>
