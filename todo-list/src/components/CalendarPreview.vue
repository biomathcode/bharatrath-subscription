<script setup>
import { dateRange } from "../utils";

const props = defineProps(["startDate", "endDate", "days"]);

console.log('from calendar Preview', props.startDate, props.endDate)

const newAttributes = dateRange({
  selectedDays: props.days || [2, 3, 4, 5],
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
  <v-calendar class="mt-2" :attributes="newAttributes" />
</template>
