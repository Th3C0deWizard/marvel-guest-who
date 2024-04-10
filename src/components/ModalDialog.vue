<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "onClose"): void;
}>();

</script>

<template>
  <Transition>
    <main class="container" v-if="show">
      <section class="container">
        <div class="container">
          <button @click="$emit('onClose')">Cerrar</button>
        </div>
        <slot></slot>
      </section>
    </main>
  </Transition>
</template>

<style scoped>
main.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #00000066;
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
}

section.container {
  display: flex;
  flex-direction: column;
  background-color: #00001f;
  padding: 0.5rem;
  border-radius: 2rem;
}

div.container {
  display: flex;
  justify-content: right;
  padding: 0.2rem;

  button {
    background-color: red;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem;
    cursor: pointer;
    color: black;
    font-family: inherit;
    font-size: 1.1rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
