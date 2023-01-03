<script setup>
import { ref, watch } from "vue";
import DaysSelectorVue from "../components/DaysSelector.vue";
import { store } from "../stores/store";

let totalAmount = store.cart?.reduce(
  (prev, curr) => prev + curr.quantity * curr.price,
  0
);

const selectType = [
  'Every Day',
  'Every Week',
  'Every Alternate Week',
  'Every Month',
]

const WeekData = [
  {
    id: 1,
    name: "Sunday",
    alt: "Sun",
  },
  {
    id: 2,
    name: "Monday",
    alt: "Mon",
  },
  {
    id: 3,
    name: "Tuesday",
    alt: "Tue",
  },
  {
    id: 4,
    name: "Wednesday",
    alt: "Wed",
  },
  {
    id: 5,
    name: "Thursday",
    alt: "Thu",
  },
  {
    id: 6,
    name: "Friday",
    alt: "Fri",
  },
  {
    id: 7,
    name: "Saturyday",
    alt: "Sat",
  },
];
// const timeSlots = [
//   {
//     start: "9 am",
//     end: "12 am",
//   },
//   {
//     start: "12 pm",
//     end: "3 pm",
//   },
//   {
//     start: "3 pm",
//     end: "6 pm",
//   },
//   {
//     start: "6 pm",
//     end: "9 pm",
//   },
// ];

let startDate = ref(new Date());

let endDate = ref(new Date());

watch(startDate, async (newDate, oldDate) => {
  console.log(newDate + oldDate);
});

let SelectedDays = ref([]);

console.log(store.cart.values.length);

function select(e) {
  console.log("this is working");
  console.log(e);
  if (SelectedDays.value.includes(e)) {
    const newArray = SelectedDays.value.filter((el) => el !== e);
    SelectedDays.value = [...newArray];
  } else {
    SelectedDays.value = [...SelectedDays.value, e];
  }
}
</script>

<template>
  <div v-if="store.cart.length > 0 ? true : false" class="mt-14 flex justify-around  min-w-100">
    <div class="min-w-100 flex gap-10 flex-col justify-between">
      <h1 class="text-lg font-bold">Checkout</h1>
      <p>Items</p>
      <div class="flex gap-10 border-slate-900 " :key="store.cart.length + item.name" v-for="item in store.cart">
        <figure>
          <img class="h-20 rounded-sm w-20" :src="item.image" :alt="item.name" />
        </figure>
        <div>
          <p>
            {{ item.name }}
          </p>
          <p>quantity: {{ item.quantity }}</p>
        </div>
        <p>{{ item.quantity + " x " + "₹" + item.price }}</p>
        <p>₹ {{ item.price * item.quantity }}</p>
      </div>
      <div class="w-100 flex text-end justify-end">Total Amount: ₹{{ totalAmount }}</div>
    </div>
    <div
      class="min-w-20 border-green-100 rounded-md border-2 bg-green-50 text-green-900 p-20 flex gap-10 flex-col mt-10">
      <h1 class="text-lg font-extrabold">Start Subscription</h1>
      <DaysSelectorVue @select="select" :data="WeekData" :selected-days="SelectedDays" />

      <div class="flex max-w-md flex-col gap-3">
        <label>Start Date</label>
        <v-date-picker class="inline-block h-full" v-model="startDate">
          <template v-slot="{ inputValue, togglePopover }">
            <div class="flex items-center">
              <button
                class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
                @click="togglePopover()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current">
                  <path
                    d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z">
                  </path>
                </svg>
              </button>
              <input :value="inputValue" readonly
                class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500" />
            </div>
          </template>
        </v-date-picker>
      </div>



      <div class="flex max-w-md flex-col gap-3">
        <label>End Date</label>
        <v-date-picker class="inline-block h-full" v-model="endDate">
          <template v-slot="{ inputValue, togglePopover }">
            <div class="flex items-center">
              <button
                class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
                @click="togglePopover()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current">
                  <path
                    d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z">
                  </path>
                </svg>
              </button>
              <input :value="inputValue" readonly
                class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500" />
            </div>
          </template>
        </v-date-picker>
      </div>

      <div class="flex gap-4">
        <label>Select Type</label>
        <select class=" bg-white text-gray-900 ">
          <option :key="type" v-for="type in selectType" >
            {{ type }}
          </option>
        </select>
      </div>
      <div class="flex gap-4">
        <label>Order For Today</label>
        <input  :value="true" class="bg-white text-slate-900" type="radio" />
      </div>
      <button @click="store.startSubscription(SelectedDays, startDate)" class="btn  bottom-2 btn-success ">
        Start Subscription
      </button>
    </div>
  </div>
  <div v-else class="mt-14 min-w-100 flex justify-center items-center content-center flex-col">
    <p>Not Items in cart</p>

    <router-link class="btn btn-primary max-w-fit" to="/">Continue shopping</router-link>
  </div>
</template>
