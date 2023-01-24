<script setup>
import { store } from "../stores/store";
import router from "../router/index";
import { WeekData } from "../utils/index";
import { format, formatDistance, addDays } from "date-fns";
import CalendarPreview from "../components/CalendarPreview.vue";
</script>

<template>
  <div class="mt-14 flex flex-col gap-10 w-screen justify-center items-center">
    <h2 class="h2 mb-1 text-lg font-semibold">Manage Your Subscriptions</h2>
    <div v-if="store.subscription.length > 0">
      <div
        class="flex flex-col gap-1 items-center px-5 rounded mx-5"
        :key="subs.id"
        v-for="subs in store.subscription"
      >
        <div class="flex flex-row w-fit justify-around gap-10">
          <div class="px-6 py-4 flex flex-col gap-1">
            <div class="text-sm badge badge-primary">
              {{ subs.recurrence }}
            </div>
            <div class="flex gap-2">
              <div
                class="flex flex-col gap-1 px-1 py-1 my-4 bg-gray-800 text-gray-50 text-xs rounded-md"
                :key="day.value"
                v-for="day in subs.days"
              >
                {{ WeekData.filter((el) => el.value === day.value)[0].label }}
              </div>
            </div>

            <p>
              {{
                subs?.subProducts
                  ?.map((el) => el.Product.name + " " + el.quantity)
                  .join(" + ")
              }}
            </p>
            <p class="text-sm">
              {{ subs?.timeSlot.start_time + "-" + subs?.timeSlot.end_time }}
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
              <div class="text-sm text-slate-900">
                Started from :
                {{ format(new Date(subs?.start_date), "dd MMM yyyy") }}
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
              class="border-none"
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
          <!-- <div v-if=""></div> -->
          <div
            class="card drop-shadow-md p-2 mt-4 rounded-md min-w-full border-[1px] border-gray-900"
          >
            <div>
              {{
                format(addDays(new Date(subs?.start_date), 1), "dd MMM yyyy")
              }}
            </div>
            <div class="flex flex-row justify-between">
              <div>
                {{
                  subs?.subProducts
                    ?.map((el) => el.Product.name + " " + el.quantity)
                    .join(" + ")
                }}
              </div>
              <div class="drawer-content">
                <label
                  for="my-drawer-4"
                  class="drawer-button btn btn-sm btn-primary"
                  @click="store.updateSubId(subs.id)"
                  >Add Products</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No Subscription where found</p>
    </div>
  </div>
</template>

<style>
.vc-container {
  border: none;
}
</style>
