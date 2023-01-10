<script setup>
import { dateRange } from "../utils";

const props = defineProps(["startDate", "endDate", "days", "type"]);

console.log('from calendar Preview', props.type)

const customAttributes = props.days.map((el) => ({
  dot: true,
  content: "red",
  popover: {
    label: "Products will be delivery on this date",
  },
  dates: el,
  order: 0,
  excludeDates: null,
}))

const newAttributes = dateRange({
  selectedDays: props.type === "everyday" ? [0, 1, 2, 3, 4, 5, 6] : props.days,
  startDate: props.startDate,
  endDate: props.endDate,
}).map((date) => ({
  dot: true,
  content: "red",
  popover: {
    label: "Products will be delivery on this date",
  },
  dates: date,
  order: 0,
  excludeDates: null,
}));
</script>

<template>
  <v-calendar class="mt-2" :attributes=" type=== 'custom'?customAttributes : newAttributes" />
</template>
