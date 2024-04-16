<script setup lang="ts">
import type { ChatMessageType } from "../State/models.ts";
defineProps<ChatMessageType>();
</script>

<template>
  <article :class="itsMe ? 'its-me' : 'its-not-me'">
    {{ message }}
  </article>
</template>

<style scoped>
article {
  padding: 0.5rem;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  color: white;
}

.its-me {
  margin-left: auto;
  background-color: #f43138;
}

.its-not-me {
  margin-right: auto;
  background-color: #646060;
}
</style>
