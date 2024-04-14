<script setup lang="ts">
import IconClose from "./IconClose.vue";

const props = defineProps<{
  show: boolean;
  noClose: { type: Boolean; default: false };
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
        <slot></slot>
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
  padding: 0.5rem;
  border-radius: 2rem;
  max-height: 90%;
  overflow-y: auto;
}

div.container {
  display: flex;
  justify-content: right;
  padding: 0.2rem;
}

.close {
  display: flex;
  justify-content: right;
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  cursor: pointer;
  color: #e62429;
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
