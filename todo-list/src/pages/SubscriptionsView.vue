<script setup>
import { store } from "../stores/store";
import router from "../router/index";
import { format, formatDistance, addDays } from "date-fns";
import CalendarPreview from "../components/CalendarPreview.vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";

console.log('this is store.sub value', store.subscription)


</script>

<template>
  <div class="mt-14 flex flex-col gap-10 w-screen justify-center items-center">
    <h2 class="h2 mb-1 text-lg font-semibold">Manage Your Subscriptions</h2>
    <div
      class="flex flex-col gap-1 items-center px-5 rounded mx-5"
      :key="subs.id"
      v-for="subs in store.subscription"
    >
      <div class="flex flex-row w-fit  justify-around gap-10">
        <div class="px-6 py-4 flex flex-col gap-1 min-w-full">
          <div class="text-sm badge badge-primary">
            {{ subs.recurrence }}
          </div>
          <div class="flex gap-2">
            <div
              class="flex flex-col gap-1 px-1 py-1 my-4 bg-gray-600 text-gray-50 text-xs rounded-md"
              :key="day.value"
              v-for="day in subs.days"
            >
              {{ day.value }}
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
          <button
            @click="router.push({ path: '/edit/' + subs.id })"
            class="btn btn-outline btn-success btn-xs w-fit gap-5"
          >
            <span> ✏️ </span>

            <span> Edit </span>
          </button>
         
        </div>
        <div class="flex flex-col gap-5">

          <CalendarPreview
            v-if="subs.start_date && subs.end_date"
            :type="subs.recurrence"
            :days="
              subs.recurrence === 'custom'
                ? subs.dates.map((el) => el.date)
                : subs.days.map((el) => el.value)
            "
            :start-date="new Date(subs?.start_date)"
            :end-date="new Date(subs.end_date)"
          />
        </div>
      </div>
      <div class="flex flex-col justify-around gap-1 min-w-full p-3">
            <div class="text-md font-bold">Upcoming Orders</div>
            <div
              class="card drop-shadow-md p-2 mt-4 rounded-md min-w-full border-[1px] border-gray-900"
            >
              <div>

                {{ format( addDays(new Date(subs?.start_date), 1) , "dd MMM yyyy") }}
              </div>
              <div class="flex flex-row justify-between ">
                <div>
                  {{ subs?.products.map((el) => el.name).join(" + ") }}
                </div>
                <button class="btn-primary btn btn-sm">+ Products</button>
              </div>
            </div>
          </div>
    </div>
  </div>
</template>
