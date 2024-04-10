<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import PlayModal from './PlayModal.vue';

const showPlayModal = ref(false);
const openPlayModal = () => {
  showPlayModal.value = true;
}
const closePlayModal = () => {
  showPlayModal.value = false;
}
</script>

<template>
  <section id="hero">
    <div>
      <img src="" alt="">
    </div>
    <div>
      <h1>umc guest who</h1>
      <p>This is an online multiplayer guest who game about UMC!</p>
      <Button @click="openPlayModal">Play now!</Button>
      <PlayModal :show="showPlayModal" :onClose="closePlayModal" />
    </div>
  </section>
</template>

<style scoped>
#hero {
  min-height: 90dvh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
}

h1 {
  font-size: 4rem;
  text-transform: uppercase;
  font-weight: 900;
}

p {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
