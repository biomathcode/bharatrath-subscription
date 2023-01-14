<script setup>
import axios from "../axios/index";
import router from "../router/index";
import { format } from "date-fns";
import { ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import { WeekData } from "../utils";
import DaysSelectorVue from "../components/DaysSelector.vue";

// get subscription by id
const props = defineProps(["id"]);

const userData = ref();

let days = ref([]);

function select(e) {
  console.log("this is working");
  console.log(e);
  if (days.value.includes(e)) {
    const newArray = days.value.filter((el) => el !== e);
    days.value = [...newArray];
  } else {
    days.value = [...days.value, e];
  }
}

let startDate = ref();

let endDate = ref();

async function fetchData() {
  const subs = await axios.get("/subscriptions/" + props.id);
  const subdata = await subs.data;

  startDate.value = subdata.start_date;
  endDate.value = subdata.end_date;
}

fetchData();

async function updateSubscription() {
  const newDays = WeekData.filter((el) => days.value.includes(el.value));
  const data = await axios.put("/subscriptions/" + props.id, {
    endDate: endDate.value,
    type: userData.value.recurrence,
    days: newDays,
  });

  console.log(data);
  router.push({ name: "subscriptions" });
}

console.log("this is userData", startDate, endDate);
</script>

<template>
  <Suspense>
    <template #default>
      <div
        class="w-screen flex flex-col justify-center items-center content-center mt-14"
      >
        <div class="flex flex-col max-w-lg min-w-[500px]">
          <button @click="router.go(-1)">back ⏪</button>
          <div class="text-sm badge badge-primary">
            {{ userData?.recurrence }}
          </div>

          <div>
            {{ userData?.products.map((el) => el.name).join(" + ") }}
          </div>
          <div class="flex mt-2">
            <!-- <div class="text-xs text-slate-500">
              {{ format(new Date(userData.start_date), "dd/MM/yyyy") }}
            </div>
            <div class="flex items-center text-slate-500 content-center">
              ......
            </div>
            <div class="text-xs text-slate-500">
              {{ format(new Date(userData?.end_date), "dd/MM/yyyy") }}
            </div> -->
          </div>

          <div class="flex gap-2">
            <div
              class="flex flex-col gap-1 px-1 py-1 my-4 bg-gray-600 text-gray-50 text-xs rounded-md"
              :key="day.value"
              v-for="day in userData?.days"
            >
              {{ day.label }}
            </div>
          </div>

          <Disclosure v-slot="{ open }">
            <DisclosureButton class="py-2 flex gap-3">
              <span>View Details</span>

              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-purple-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="text-gray-500">
              <div :key="product.id" v-for="product in userData.products">
                <div class="text-sm">
                  {{ product.name }}
                  {{ product.price }}
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <div
            v-if="userData.recurrence === 'everyday'"
            class="flex max-w-md flex-col gap-3"
          >
            <label>Start Date</label>
            <v-date-picker
              :min-date="new Date()"
              class="inline-block h-full"
              v-model="startDate"
            >
              <template v-slot="{ inputValue, togglePopover }">
                <div class="flex items-center">
                  <button
                    disabled="true"
                    class="p-2 bg-gray-100 border border-gray-100 hover:bg-gray-200 focus:outline-none"
                    @click="togglePopover()"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                      ></path>
                    </svg>
                  </button>
                  <input
                    :value="inputValue"
                    readonly
                    class="bg-gray-300 text-gray-600 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500"
                  />
                </div>
              </template>
            </v-date-picker>
          </div>
          <div
            v-if="
              (userData.recurrence === 'everyday') |
                (userData.recurrence === 'everyweek')
            "
            class="flex max-w-md flex-col gap-3 mt-5"
          >
            <label>End Date</label>
            <v-date-picker
              :min-date="new Date()"
              class="inline-block h-full"
              v-model="endDate"
            >
              <template v-slot="{ inputValue, togglePopover }">
                <div class="flex items-center">
                  <button
                    class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
                    @click="togglePopover()"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                      ></path>
                    </svg>
                  </button>
                  <input
                    :value="inputValue"
                    readonly
                    class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500"
                  />
                </div>
              </template>
            </v-date-picker>
          </div>
          <DaysSelectorVue
            @select="select"
            :data="WeekData"
            :selected-days="days"
          />
          <div class="flex justify-center items-center content-center">
            <button
              @click="updateSubscription()"
              class="btn btn-success btn-md w-36 mt-20"
            >
              Update Subscription
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</template>
