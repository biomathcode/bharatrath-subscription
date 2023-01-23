<script setup>
import { ref } from "vue";
import { store } from "../stores/store";

const amount = ref("");
</script>

<template>
  <div class="navbar fixed z-10 bg-secondary-content">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">
        <img width="100" height="50" src="../assets/logo.webp" />
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li><RouterLink to="/"> 🏡 Home </RouterLink></li>

        <li><RouterLink to="/subscriptions">Subscriptions</RouterLink></li>
        <li><RouterLink to="/orders">📦 Orders</RouterLink></li>
      </ul>
    </div>
    <div class="px-2 flex justify-center content-center">
      <div class="flex regap-1 content-center items-center justify-center">
        <label
          for="my-modal"
          tabindex="0"
          class="btn btn-ghost flex gap-10 content-center items-center sss"
        >
          <div class="flex flex-col">
            <p>{{ store.user.name }}</p>
            <p>₹ {{ store.user?.wallet?.amount }}</p>
          </div>
        </label>
      </div>
    </div>
  </div>
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box bg-slate-100 flex flex-col">
      <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >

      <h3 class="py-4 text-lg">Add Amount to BharatRath Wallet</h3>

      <div class="form-control">
        <label class="label">
          <span class="text-slate-900">Enter amount</span>
        </label>
        <label class="input-group">
          <span class="bg-slate-100">Price</span>
          <input
            :value="amount"
            @input="(event) => (amount = event.target.value)"
            type="number"
            placeholder="10"
            class="input bg-slate-100 text-slate-900 input-bordered"
          />
          <span class="bg-slate-100">₹</span>

          <label
            @click="
              store.credit(amount);
              amount = 0;
            "
            for="my-modal"
            class="btn text-slate-100"
            >+ add</label
          >
        </label>
      </div>
      <div class="mt-10">
        <p class="text-slate-800 font-bold text-lg">Last Transactions</p>
        <div
          class="alert bg-slate-100 my-2 shadow-lg"
          :key="item.id"
          v-for="item in store.transaction"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="#1CD65E"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              {{ " ₹" + item.amount + " " + item.type + " to your wallet." }}
              <br />
              <span class="text-slate-700 text-sm"> id: #{{ item.id }} </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
