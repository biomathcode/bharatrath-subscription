<script setup>
import NavbarVue from '../components/Navbar.vue';
</script>
<template>
  <div
    class="flex flex-col min-w-screen bg-secondary-content text-slate-900 min-h-screen"
  >
    <NavbarVue></NavbarVue>
    <slot class="mt-14"></slot>
    <!-- <footer>@copyright 2022</footer> -->
  </div>
</template>

<style>
footer {
  position: fixed ;
  bottom: 1px;
  width: 100vw;
  padding: 20px;
  text-align: center;
}
</style>
