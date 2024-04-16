<script setup lang="ts">
import { ref } from "vue";
import { Socket, io } from "socket.io-client";
import Button from "../components/Button.vue";
import { store } from "../State/store";
import router from "@/router";

const matched = ref(false);

function connect() {
  const socket: Socket = io("ws://190.248.212.126:3000");
  console.log("hola socket");
  socket.emit("match");
  socket.on("matched", () => {
    matched.value = true;
  });
  socket.on("cancel", () => {
    matched.value = false;
    setTimeout(() => socket.emit("match"), 10000);
    console.log("hola :D");
  });
  socket.on("disconnect", () => {
    router.push("/");
  });
  window.onpopstate = () => {
    store.socket?.disconnect();
  };
  store.socket = socket;
}
connect();

function onAccept() {
  store.socket?.emit("matchAccept");
  store.socket?.on("toGameRoom", () => {
    router.push({ path: "/gameroom", replace: true });
  });
}

function onCancel() {
  store.socket?.disconnect();
}
</script>

<template>
  <main>
    Ruedita cargando ...
    <RouterLink to="/">
      <Button @click="onCancel">Cancelar</Button>
    </RouterLink>
    <Button v-if="matched" @click="onAccept">Aceptar</Button>
  </main>
</template>

<style scoped></style>
