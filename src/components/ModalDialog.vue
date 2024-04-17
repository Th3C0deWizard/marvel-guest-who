<script setup lang="ts">
import IconClose from "./IconClose.vue";

defineProps<{
  show: boolean;
  noClose: boolean;
}>();

const emit = defineEmits<{
  (e: "onClose"): void;
}>();
</script>

<template>
  <Transition>
    <main class="modal-container" v-if="show">
      <section class="container">
        <button v-if="!noClose" @click="$emit('onClose')" class="close">
          <IconClose />
        </button>
        <slot class="slot"></slot>
      </section>
    </main>
  </Transition>
</template>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(10px);
  gap: 5rem;
}

section.container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 0.8rem 1rem;
  border-radius: 2rem;
  max-height: 90%;
  max-width: 90%;
}

.close {
  display: flex;
  margin-left: auto;
  border: none;
  background-color: transparent;
  padding-bottom: 0.5rem;
  cursor: pointer;
  color: #e62429;
  svg {
    transition: 0.3s;
  }
}

.close:hover svg {
  transform: scale(1.2);
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
