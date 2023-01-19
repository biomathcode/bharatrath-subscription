<script setup>
const data = ["6-9 am", "9-12 am", "12-3 pm", "3-6 pm", "6-9 pm"];

const props = defineProps(["selectedTime", "label"]);

const emits = defineEmits(["select"]);
</script>

<template>
  <div class="flex flex-col">
    <label class="mb-2">{{ props.label }}</label>
    <div class="flex gap-1">
      <button
        :key="item"
        :class="
          selectedTime.includes(item)
            ? 'bg-green-700 p-1 rounded text-xs  text-slate-100 '
            : 'p-1 text-xs'
        "
        @click="emits('select', item)"
        v-for="item in data"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>
