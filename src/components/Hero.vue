<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";
import PlayModal from "./PlayModal.vue";

const showPlayModal = ref(false);
const openPlayModal = () => {
  showPlayModal.value = true;
};
const closePlayModal = () => {
  showPlayModal.value = false;
};

const imgUrl = "/src/assets/Hero";
const imgExt = ".webp";
const random = Math.floor(Math.random() * 2);
const imgSrc = imgUrl + random + imgExt;
</script>

<template>
  <section
    id="hero"
    :style="{
      'background-image': `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imgSrc})`,
    }"
  >
    <h1>marvel guess who</h1>
    <p>This is an online multiplayer guess who game about marvel!</p>
    <Button @click="openPlayModal" fontSize="1.4rem">Play now</Button>
    <div></div>
  </section>
  <PlayModal :show="showPlayModal" :onClose="closePlayModal" />
</template>

<style scoped>
#hero {
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  clip-path: polygon(0 0, 0 98%, 100% 92%, 100% 0);
}

h1 {
  font-size: 4rem;
  text-transform: uppercase;
  font-weight: 900;
  text-align: center;
}

p {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
