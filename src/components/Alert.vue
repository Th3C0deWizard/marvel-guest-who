<script setup lang="ts">
import IconCheck from "./IconCheck.vue";
import IconClose from "./IconClose.vue";

defineProps<{
  title: string;
  text: string;
}>();

const emit = defineEmits(["closeAlertEmit"]);

</script>

<template>
  <section class="alert">
    <div class="alert-content">
      <IconCheck class="check" />

      <div class="message">
        <span class="text text-1">{{ title }}</span>
        <span class="text text-2">{{ text }}</span>
      </div>
    </div>
    <IconClose class="close" @click="emit('closeAlertEmit')" />
    <div class="progress active"></div>
  </section>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 4rem;
  right: 1rem;
  border-radius: 12px;
  background: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  height: 60px;
  margin: 0;
  color: black;
}

.alert-content {
  display: flex;
  align-items: center;
}

.message {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}

.text {
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

.message .text.text-1 {
  font-weight: 600;
  color: #333;
}

.close {
  cursor: pointer;
  opacity: 0.7;
}

.close:hover {
  opacity: 1;
}

.check {
  color: #e62429;
}

.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
}

.alert .progress:before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: #e62429;

}

.progress.active:before {
  animation: progress 5s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}
</style>
