<script setup>
import { ref, onMounted } from "vue";

// reactive state
const text = ref("");

// functions that mutate state and trigger updates

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${text.value}.`);
});

function handleSubmit(e) {
  e.preventDefault();
  console.log(text.value);
  alert(text.value);
}

function onInput(e) {
  text.value = e.target.value;
}
</script>

<template>
  <div class="flex flex-col center">
    <h1 class="text-lg">TODO List</h1>
    <form @submit="handleSubmit" class="flex gap-10">
      <input
        @input="onInput"
        placeholder="write your task here"
        :value="text"
      />
      <button
        type="submit"
        class="bg-sky-500 hover:bg-sky-700 rounded text-white px-10"
      >
        add
      </button>
    </form>
  </div>
</template>
