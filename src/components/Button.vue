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
  border-radius: 0.7rem;
  border: none;
  cursor: pointer;
  background-color: green;
}
</style>
