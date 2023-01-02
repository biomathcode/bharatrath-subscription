<script setup>
import { store } from "../stores/store";
import { format, formatDistance } from "date-fns";


const attr = [
  {
    key: "today",
    dot: true,
    highlight: true,
    dates: { start: new Date(), end: new Date(+new Date() + 86400000 * 3) },
    popover: {
      label: "subscription added",
    },
  },
];

console.log(store.subscription.values());
</script>

<template>
  <div class="text-center mt-14 section">
    <h2 class="h2 mb-10 text-lg">View Your daily deliveries 📦</h2>
    <div class="flex gap-1" :key="subs.id" v-for="subs in store.subscription">
      <div class="flex flex-col gap-4">
        <p>
          {{ subs.products.map((el) => el.name).join(" + ") }}
        </p>
        <p>
          created
          {{ formatDistance(subs.createdAt, new Date(), { addSuffix: true }) }}
        </p>
        <p>
          startDate
          {{ format(subs.startDate, "dd/MM/yyyy") }}
        </p>
      </div>
      <p>
        ₹
        {{
          subs.products.reduce(
            (total, curr) => total + curr.quantity * curr.price,
            0
          )
        }}
      </p>
    </div>

    <v-calendar
      :attributes="attr"
      class="custom-calendar max-w-full h-100"
      disable-page-swipe
      is-expanded
    >
    </v-calendar>
  </div>
</template>
