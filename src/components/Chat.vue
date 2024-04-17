<script setup lang="ts">
import type { ChatMessageType } from "../State/models.ts";
import { ref } from "vue";
import ChatMessage from "./ChatMessage.vue";
const props = defineProps<{
  active: boolean;
  chatHistory: Array<ChatMessageType>;
}>();

const message = ref("");

const emit = defineEmits<{
  (e: "onChat", message: string): void;
}>();

const onSend = () => {
  emit("onChat", message.value);
  message.value = "";
};
</script>

<template>
  <section class="chat">
    <span class="name-container">Chat</span>
    <div class="chat-container">
      <ChatMessage v-for="{ message, itsMe } in chatHistory" :message :itsMe />
    </div>
    <form class="input-container" v-on:submit.prevent="onSend">
      <input :disabled="!active" type="text" v-model="message" />
      <button :disabled="!active">Send</button>
    </form>
  </section>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
  height: 80dvh;
  border-radius: 0.5rem;
}

.name-container {
  display: flex;
  background-color: #f43138;
  justify-content: center;
  padding: 0.2;
  color: white;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  gap: 1rem;
  height: 100%;
  background-color: #202020;
  overflow-y: auto;
}

.input-container {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #202020;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
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
  background-color: #f43138;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
}

button:disabled {
  background-color: #911a1e;
  cursor: not-allowed;
}

button:hover {
  scale: 1.05;
}

input:disabled {
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .chat {
    margin-left: 0;
  }
  .input-container {
    gap: 0.5rem;
  }
}
</style>
