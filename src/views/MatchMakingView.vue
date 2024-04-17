<script setup lang="ts">
import { ref, Transition } from "vue";
import { Socket, io } from "socket.io-client";
import Button from "../components/Button.vue";
import { store } from "../State/store";
import router from "@/router";
import Loading from "@/components/Loading.vue";

const matched = ref(false);

function connect() {
  const socket: Socket = io("ws://190.248.212.126:3000");
  socket.emit("match");
  socket.on("matched", () => {
    matched.value = true;
  });
  socket.on("cancel", () => {
    matched.value = false;
    setTimeout(() => socket.emit("match"), 10000);
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

const imgUrl = "/src/assets/matchmaking";
const imgExt = ".webp";
const random = Math.floor(Math.random() * 5);
const imgSrc = imgUrl + random + imgExt;
</script>

<template>
  <main
    :style="{
      'background-image': `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imgSrc})`,
    }"
  >
    <h1>finding game</h1>
    <Loading />
    <div>
      <RouterLink to="/">
        <Button @click="onCancel" fontSize="2em">Cancel</Button>
      </RouterLink>
      <Transition>
        <Button v-if="matched" @click="onAccept" fontSize="2em">Accept</Button>
      </Transition>
    </div>
  </main>
</template>

<style scoped>
main {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

h1 {
  font-size: 8rem;
  color: white;
  text-shadow: 2px 2px 2px black;
  font-style: italic;
  text-transform: uppercase;
  text-align: center;
}

div {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 5.5rem;
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
