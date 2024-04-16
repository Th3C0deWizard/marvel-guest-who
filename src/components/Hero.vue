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
</script>

<template>
  <section id="hero">
    <h1>marvel guest who</h1>
    <p>This is an online multiplayer guess who game about UMC!</p>
    <Button @click="openPlayModal">Play now</Button>
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("../assets/hero.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  clip-path: polygon(0 0, 0 98%, 100% 92%, 100% 0);
}

h1 {
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: 900;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
</style>
