<script setup lang="ts">
const date = new Date().getFullYear();
</script>

<template>
  <footer>
    <p>&copy; {{ date }} Marvel Guess Who</p>
  </footer>
</template>

<style scoped>
footer {
  background-color: #202020;
  color: white;
  text-align: center;
  text-transform: uppercase;
  padding: 1rem;
}
</style>
