<script setup>
const props = defineProps(['data', 'selectedDays'])

const emits = defineEmits(['select'])


</script>

<template>
    <div class="flex flex-col">
        <label class="mb-2">Select Days for Subscription</label>
    <div class="flex gap-1">
        <button :key="item.id" :class="selectedDays.includes(item.id)? 'bg-green-700 p-1 rounded text-xs  text-slate-100 ': 'p-1 text-xs'"  @click="emits('select', item.id)" v-for="item in data">
            {{ item.alt }}
            
        </button>
    </div>

    </div>
    
    
</template>