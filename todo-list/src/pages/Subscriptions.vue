<script setup>
import { store } from "../stores/store";
import { format, formatDistance } from "date-fns";


</script>

<template>
  <div class="text-center mt-14 section">
    <h2 class="h2 mb-10 text-lg">View Your daily deliveries 📦</h2>
    <div class="flex gap-1" :key="subs.id" v-for="subs in store.subscription">
      <div class="flex flex-col gap-4">
      
        <p>
          {{ subs?.products.map((el) => el.name).join(" + ") }}
        </p>
        <!-- <p>
          created
          {{ formatDistance(subs?.created_at, new Date(), { addSuffix: true }) }}
        </p> -->
        <!-- <p>
          startDate
          {{ format(subs?.start_date, "dd/MM/yyyy") }}
        </p> -->
      </div>
      <p>
        ₹
        {{
         subs.total_amount
        }}
      </p>
    </div>

    <!-- <v-calendar
      :attributes="attr"
      class="custom-calendar max-w-full h-100"
      disable-page-swipe
      is-expanded
    >
    </v-calendar> -->
  </div>
</template>
