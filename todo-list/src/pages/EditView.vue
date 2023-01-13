<script setup>
import axios from "../axios/index";
// import { store } from "../stores/store";
import { ref, watch } from "vue";

// get subscription by id
const props = defineProps(["id"]);

const userData = ref();

async function fetchData() {
    const subs = await axios.get('/subscriptions/' + props.id)
    const subdata = await subs.data;

    userData.value = subdata;

}

fetchData()

// watch(
//   () => props.id,
//   async (newId) => {
//     userData.value = await axios.get("/subscriptions/" + props.id);
//     console.log("this is newId", newId);
//   }
// );

console.log("this is userData", userData.value);
</script>

<template>
  <Suspense>
    <template #default>
      <div class="mt-14">
        <h1>{{ JSON.stringify(userData) }}</h1>
      
      </div>
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</template>
