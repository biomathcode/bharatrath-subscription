<script setup>
import Card from "../components/Card.vue";
import Cart from "../components/Cart.vue";

import { store } from "../stores/store";
</script>
<template>
  <Cart />
  <Suspense>
    <template #default>
      <div class="mt-14">
        <div
          v-if="store.products.length > 0"
          class="flex-col lg:flex-row-reverse"
        >
          <h1 class="card-title text-black">Products</h1>

          <div class="flex flex-col md:flex-row lg:flex-row gap-10">
            <Card
              v-for="item in store?.products"
              :id="item.id"
              :key="item.id"
              :name="item.name"
              :image="item.image"
              :description="item.description"
              :price="item.price"
            />
          </div>
        </div>
      </div>
    </template>

    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</template>
