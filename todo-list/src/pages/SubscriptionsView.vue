<script setup>
import { store } from "../stores/store";
import router from "../router/index";
import { format, formatDistance } from "date-fns";
import CalendarPreview from "../components/CalendarPreview.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <div
    class="mt-14 section flex flex-col gap-10 w-screen justify-center items-center"
  >
    <h2 class="h2 mb-1 text-lg font-semibold">Manage Your Subscriptions</h2>
    <div
      class="flex gap-1 items-center px-5 rounded mx-5 w-96 border-[1px] border-solid border-stone-900"
      :key="subs.id"
      v-for="subs in store.subscription"
    >
      <div class="px-6 py-4 flex flex-col gap-1">
        <div class="text-sm badge badge-primary">
          {{ subs.recurrence }}
        </div>
        <div class="flex gap-2">
          <div
            class="flex flex-col gap-1 px-1 py-1 my-4 bg-gray-600 text-gray-50 text-xs rounded-md"
            :key="day.value"
            v-for="day in subs.dayssss"
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
          @click="router.push({ path: '/edit/' +  subs.id })"
          class="btn btn-outline btn-success btn-xs w-fit gap-5"
        >
          <span> ✏️ </span>

          <span> Edit </span>
        </button>

        <Disclosure v-slot="{ open }">
          <DisclosureButton class="py-2 flex gap-3">
            <span>View Details</span>

            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-5 w-5 text-purple-500"
            />
          </DisclosureButton>
          <DisclosurePanel class="text-gray-500">
            <div :key="product.id" v-for="product in subs.products">
              <div class="text-sm">
                {{ product.name }} x {{ product.quantity }} =
                {{ product.price * product.quantity }}
              </div>
            </div>
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
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>
</template>
