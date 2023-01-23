<script setup>
import { store } from "../stores/store";


const handleSubmit = (e) => {
  console.log(e.target);
 
}


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
        class="flex-col flex menu p-4 w-80 bg-white text-base-content "
      >
      <form  @submit.prevent="handleSubmit">

        <ul :key="item.id" v-for="item in store?.products">
          <li class="text-gray-900">
            <div class="flex flex-row gap-5">
              <div class="flex flex-col gap-2">
                <div>{{ item.name }}</div>
                <div>Rs. {{ item.price }}</div>
                <div class="flex gap-20">
                  <label class="text-base-200 font-bold">Quantity </label>
                <input name="item.name"  type="number" value="0" class="bg-white w-20" />

                </div>
              </div>
            </div>
          </li>
        </ul>
        <button type="submit" class="btn btn-sm btn-info m-10">Add to Upcoming order</button>
    </form>

      </div>

    </div>
  </div>
</template>
