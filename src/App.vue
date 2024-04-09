<script setup lang="ts">
import { ref } from "vue";
const characters = ref({});

(async function () {
  try {
    const uri = "https://gateway.marvel.com//v1/public/characters?ts=1&apikey=95d22bad7531c452ae4f5c1ac9bae9ce&hash=1ea8bd47f0bb37318aeb0e21e3af9950&limit=100"
    const response = await fetch(uri);
    characters.value = await response.json();
  } catch (error) {
    console.error(error);
  }
})();


</script>

<template>
  <div v-for="character in characters.data.results">
    <img :src="`${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`" alt="">
    <p>{{ character.name }}</p>
  </div>
</template>

<style scoped></style>
