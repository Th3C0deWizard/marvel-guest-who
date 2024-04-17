<script setup lang="ts">
const props = defineProps<{
  fontSize?: string;
}>();
</script>

<template>
  <button v-bind="props" :style="{ fontSize: props.fontSize }">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.7rem;
  border: none;
  cursor: pointer;
  background-color: #f43138;
  transition: 0.3s;
}
button:disabled {
  background-color: #911a1e;
  cursor: not-allowed;
}

button:hover {
  scale: 1.05;
}
</style>
