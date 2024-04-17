<script setup lang="ts">
const props = defineProps();
</script>

<template>
  <button v-bind="props">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.7rem;
  border: none;
  cursor: pointer;
  background-color: #e62429;
  transition: 0.3s;
}

button:hover {
  background-color: #9f0013;
}
</style>
