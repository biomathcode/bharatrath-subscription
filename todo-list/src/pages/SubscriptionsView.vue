<script setup>
import { store } from "../stores/store";
import { format, formatDistance } from "date-fns";
import CalendarPreview from "../components/CalendarPreview.vue";
import { WeekData } from "../utils";
</script>

<template>
  <div
    class="mt-14 section flex flex-col gap-10 w-screen justify-center items-center"
  >
    <h2 class="h2 mb-1 text-lg font-semibold">Manage Your Subscriptions</h2>
    <div
      class="flex gap-1 items-center px-5 max-w-md rounded mx-5 overflow-hidden shadow-lg"
      :key="subs.id"
      v-for="subs in store.subscription"
    >
      <div class="px-6 py-4">
        <div class="text-sm badge badge-primary">
          {{ subs.recurrence }}
        </div>
        <div class="flex gap-2">
          <div
            class="flex flex-col gap-1 px-1 py-1 my-4 bg-gray-600 text-gray-50 text-xs rounded-md"
            :key="day"
            v-for="day in JSON.parse(subs.days)"
          >
            {{ WeekData[day].alt }}
          </div>
        </div>
        <p>
          {{ subs?.products.map((el) => el.name).join(" + ") }}
        </p>
        <p class="text-xs text-slate-500">
          created
          {{
            formatDistance(new Date(subs?.created_at), new Date(), {
              addSuffix: true,
            })
          }}
        </p>
        <div class="flex mt-2">
          <div class="text-xs text-slate-500">
            {{ format(new Date(subs?.start_date), "dd/MM/yyyy") }}
          </div>
          <div class="flex items-center text-slate-500 content-center">
            ......
          </div>
          <div class="text-xs text-slate-500">
            {{ format(new Date(subs?.end_date), "dd/MM/yyyy") }}
          </div>
        </div>

        <div :key="product.id" v-for="product in subs.products">
          <div class="text-sm">
            {{ product.name }} x {{ product.quantity }} =
            {{ product.price * product.quantity }}
          </div>
        </div>

        <CalendarPreview
          v-if="subs.start_date && subs.end_date"
          :days="JSON.parse(subs.days)"
          :start-date="new Date(subs?.start_date)"
          :end-date="new Date(subs.end_date)"
        />
      </div>
    </div>
  </div>
</template>
