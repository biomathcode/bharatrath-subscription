<script setup>
import { onMounted } from "vue";
import Layout from "./layouts/Layout.vue";
import axios from "./axios/index";
import { store } from "./stores/store";
// add products
// get user Data
// add amount, create transaction
// create subscriptions
// get subscriptions

// Routes fetch

onMounted(async () => {
  const products = await axios.get("/products");

  const user = await axios.get("/users/1");

  const subscriptions = await axios.get("/users/1/subscriptions");
  
  const orders = await axios.get("/users/1/orders");

  console.log(subscriptions.data)

 
  store.getSubscription(subscriptions.data, subscriptions.data.quantity);

  store.getUser(user.data);

  store.getOrders(orders.data.orders, orders.data.quantity);

  store.getTransactions(user.data.transaction)

  console.log(user.data);

  store.getProducts(products.data);
});
</script>

<template>
  <Layout>

    <div
      class="sm:flex container bg-secondary-content p-5 mx-auto content justify-betweenflex-wrap"
    >

      <RouterView class="view main-content w-full order-2"></RouterView>
      <RouterView name="LeftSidebar" class="view order-1 w-full"></RouterView>
      <RouterView name="RightSidebar" class="view order-3 w-full"></RouterView>
    </div>
  </Layout>
</template>
