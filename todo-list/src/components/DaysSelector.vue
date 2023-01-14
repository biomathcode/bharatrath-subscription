<script setup>
const props = defineProps(["data", "selectedDays", "label"]);

const emits = defineEmits(["select"]);
</script>

<template>
  <div class="flex flex-col">
    <label class="mb-2">{{ props.label }}</label>
    <div class="flex gap-1">
      <button
        :key="item.value"
        :class="
          selectedDays.includes(item.value)
            ? 'bg-green-700 p-1 rounded text-xs  text-slate-100 '
            : 'p-1 text-xs'
        "
        @click="emits('select', item.value)"
        v-for="item in data"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
