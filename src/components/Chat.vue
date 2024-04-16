<script setup lang="ts">
import type { ChatMessageType } from "../State/models.ts"
import { ref } from "vue"
import ChatMessage from "./ChatMessage.vue"
const props = defineProps<{
  active: boolean;
  chatHistory: Array<ChatMessageType>;
}>();

const message = ref("");

const emit = defineEmits<
  {
    (e: "onChat", message: string): void
  }
>();

const onSend = () => {
  emit("onChat", message.value)
  message.value = "";
}

</script>

<template>
  <section class="chat">
    <span class="name-container">Chat</span>
    <div class="chat-container">
      <ChatMessage v-for="{ message, itsMe } in chatHistory" :message :itsMe />
    </div>
    <div class="input-container">
      <input :disabled="!active" type="text" v-model="message" />
      <button @click="onSend" :disabled="!active">Send</button>
    </div>
  </section>
</template>

<style scoped>
.chat {
  margin-left: 2rem;
  width: 100%;
  height: 90dvh;
}

.name-container {
  display: flex;
  background-color: #e62429;
  justify-content: center;
  padding: 0.2;
}

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  gap: 2rem;
  height: 90%;
  background-color: #202020;
  overflow-y: auto;
}

.input-container {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #202020;
}

input {
  width: 80%;
  padding: 0.5rem;
  border: none;
  background-color: white;
  color: black;
  border-radius: 0.5rem;
}

button {
  padding: 0.5rem;
  border: none;
  background-color: #e62429;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
