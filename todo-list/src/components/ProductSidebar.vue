<script setup>
import axios from "../axios/index";
import { ref } from "vue";
import { store } from "../stores/store";
import { addDays } from "date-fns";

const newProduct = ref(
  store.products.map((el) => {
    return {
      product_id: el.id,
      quantity: 0,
      specific_date: new Date().toString(),
    };
  })
);

async function handleSubmit() {
  console.log("this is working");
  const Products = newProduct.value.filter((el) => el.quantity !== 0);

  console.log(Products);

  const response = await axios.put(
    "/subscriptions/" + store.activeSubscriptionId,
    {
      customProducts: Products,
    }
  );

  console.log(response);
}

const handleChange = (e) => {
  const index = newProduct.value
    .map((el) => el.product_id)
    .indexOf(Number(e.target.name));
  const restProduct = newProduct.value.filter(
    (el) => el.product_id !== Number(e.target.name)
  );

  const elProduct = {
    product_id: Number(e.target.name),
    quantity: Number(e.target.value),
    specific_date: addDays(new Date(), 1).toString(),
  };
  console.log("this index", index);
  if (restProduct.length > 0) {
    newProduct.value =
      index === 0 ? [elProduct, ...restProduct] : [...restProduct, elProduct];
  } else {
    newProduct.value = [elProduct];
  }
};
</script>

<template>
  <div class="drawer bg-white drawer-end mt-14">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div>
      {{ store.activeSubscriptionId }}
    </div>

    <div class="drawer-content">
      <slot> </slot>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>

      <div
        v-if="store.products.length > 0"
        class="flex-col flex menu p-4 w-80 bg-white text-base-content"
      >
        <div class="text-base text-gray-700">
          Subscription Id {{ store.activeSubscriptionId }}
        </div>
        <form @submit.prevent="handleSubmit">
          <ul :key="item.id" v-for="item in store.products">
            <li class="text-gray-900">
              <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-2">
                  <div>{{ item.name }}</div>
                  <div>Rs. {{ item.price }}</div>
                  <div class="flex gap-20">
                    <label class="text-base-200 font-bold">Quantity </label>
                    <input
                      @change="handleChange"
                      :name="item.id"
                      type="number"
                      value="0"
                      class="bg-white w-20"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <button type="submit" class="btn btn-sm btn-info m-10">
            Add to Upcoming order
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
