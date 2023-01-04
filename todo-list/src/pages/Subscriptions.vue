<script setup>
import { store } from "../stores/store";
import { format, formatDistance } from "date-fns";


</script>

<template>
  <div class="text-center mt-14 section">
    <h2 class="h2 mb-10 text-lg font-semibold">Manage Your Subscriptions </h2>
    <div class="flex gap-10" :key="subs.id" v-for="subs in store.subscription">
      <div  class="card flex flex-col   gap-1">
      
        <p>
          {{ subs?.products.map((el) => el.name).join(" + ") }}
        </p>
        <p>
          created
          {{ formatDistance(new Date(subs?.created_at) , new Date(), { addSuffix: true }) }}
        </p>
        <p>
          start date
          {{ format(new Date(subs?.start_date), "dd/MM/yyyy") }}
        </p>
        <p>
          end date
          {{ format(new Date(subs?.end_date), "dd/MM/yyyy") }}
        </p>
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
