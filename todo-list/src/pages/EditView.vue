<script setup>
import axios from "../axios/index";
import router from "../router/index";
import { ref, computed } from "vue";
import format from "date-fns/format";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import { WeekData } from "../utils";
import DaysSelectorVue from "../components/DaysSelector.vue";

const props = defineProps(["id"]);

let days = ref([]);

let isActive = ref(false);

let customdates = ref([]);

let dates = computed(() => {
  return customdates.value.map((day) => day.date);
});


let attributes = computed(() => {
  return customdates.value.map((date) => ({
    highlight: true,
    dates: date.date,
  }));
});

function onDayClick(day) {
  const activeDate = customdates.value.filter((d) => d.id === day.id);

  if (activeDate.length > 0) {
    const filterData = customdates.value.filter((d) => d.id !== day.id);

    customdates.value = filterData;
  } else {
    
    customdates.value.push({
      id: day.id,
      date: day.date,
    });
  }
}

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

const userData = ref();

async function fetchData() {
  const subs = await axios.get("/subscriptions/" + props.id);

  console.log('this is edit subs', subs.data)
  const subdata = await subs.data;



  userData.value = subdata;

  startDate.value = subdata.start_date;
  endDate.value = subdata.end_date;

  isActive.value = subdata.status === "active" ? true : false;

  subdata.dates?.map((el) =>
    customdates.value.push({
      id: format(new Date(el.date), "yyyy-MM-dd"),
      date: el.date,
    })
  );

  console.log("this is dates value", customdates.value);

  subdata.days?.map((el) => days.value.push(el.value));
}

fetchData();

async function updateSubscription() {
  const newDays = WeekData.filter((el) => days.value.includes(el.value));

  console.log(dates.value);

  await axios.put("/subscriptions/" + props.id, {
    endDate: endDate.value,
    type: userData.value.recurrence,
    days: newDays,
    dates: dates.value,
  });
  router.push({ name: "subscriptions" });
}

async function toggleSubscription() {
  isActive.value = !isActive.value;
  const newData = await axios.put("/subscriptions/" + props.id, {
    status: isActive.value ? "active" : "cancel",
  });

  console.log(newData);

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
            {{ userData?.subProducts?.map((el) => el.Product.name).join(" + ") }}
          </div>
          <div class="flex mt-2">
            <div class="text-xs text-slate-500">
              {{ format(new Date(userData.start_date), "dd/MM/yyyy") }}
            </div>
            <div class="flex items-center text-slate-500 content-center">
              ......
            </div>
            <div class="text-xs text-slate-500">
              {{ format(new Date(userData.end_date), "dd/MM/yyyy") }}
            </div>
          </div>

          <div
            class="text-left flex justify-end badge text-md mt-5 badge-outline"
          >
            ₹{{ userData.total_amount }}
          </div>

          <div v-if="userData?.days > 0" class="flex gap-2">
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
                  {{ product.name }} x
                  {{ product.ProductSubscription[0].quantity }} =
                  {{ product.price * product.ProductSubscription[0].quantity }}
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <div
            v-if="userData?.recurrence === 'everyday'"
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
          <div>
             
          </div>
          <DaysSelectorVue
            v-if="days.length > 0"
            @select="select"
            :data="WeekData"
            :selected-days="days"
            :label="`Update days of your subscription`"
          />

          <div
            v-if="userData.recurrence === 'custom'"
            class="flex flex-col gap-4"
          >
            <label>Select Dates when you want a delivery</label>
            <v-calendar
              :min-date="new Date()"
              :attributes="attributes"
              @dayclick="onDayClick"
            />
          </div>

          <div class="flex gap-20 justify-around items-center content-center">
            <button
              @click="updateSubscription()"
              class="btn btn-success btn-md w-36 mt-20"
            >
              Update
            </button>
            <button
              class="btn btn-md w-36 mt-20"
              :class="isActive ? 'btn-error' : 'btn-success'"
              @click="toggleSubscription()"
            >
              {{ isActive ? "Pause" : "Resume" }}
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
