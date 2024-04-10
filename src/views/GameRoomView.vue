<script setup lang="ts">
import { ref } from "vue";
import { store } from "../State/store"
import router from '@/router';
import type { SimpleCharacter } from "../State/models"
import Button from "@/components/Button.vue";
import ModalDialog from "@/components/ModalDialog.vue";

store.socket?.on("start", (charactersData: Array<SimpleCharacter>) => {
  characters.value = charactersData;
  loading.value = false;
})


const loading = ref(true);
const characters = ref<Array<SimpleCharacter>>([]);
const selectedChar = ref<SimpleCharacter | undefined>();
const ready = ref(false);


window.onpopstate = (event) => {
  event.preventDefault();
  store.socket?.disconnect();
  console.log("popstate")
  router.push("/")
}

const selectCharacter = (character: SimpleCharacter) => {
  if (!ready.value) {
    selectedChar.value = character;
    const prevSelect = document.querySelector(".selectedChar")
    prevSelect?.classList.remove("selectedChar");
    const selectedDiv = document.getElementById(character.id);
    console.log(selectedDiv)
    if (selectedDiv) selectedDiv.classList.add("selectedChar");
  }
}

const sendReady = () => {
  ready.value = true;
  store.socket?.emit("playerReady");
  store.socket?.on("goToGuessGame", (roomID: string) => {
    router.push({ name: "GuessGame", params: { roomID: roomID }, replace: true });
  });
}

</script>

<template>
  <h1>This is the game room</h1>
  <p v-if="loading">Loading ...</p>
  <section v-else>
    <div v-for="{ id, name, thumbnail } in   characters  " @click="selectCharacter({ id, name, thumbnail })" :key="id"
      :id="id">
      <img :src="thumbnail.path + '/portrait_medium.' + thumbnail.extension" :alt="name">
      <p>{{ id }}</p>
      <p>{{ name }}</p>
    </div>
  </section>
  <Button @click="sendReady" :disabled="ready">Im Ready</Button>
  <div v-if="selectedChar !== undefined">
    <img :src="selectedChar.thumbnail.path + '/portrait_medium.' + selectedChar.thumbnail.extension"
      :alt="selectedChar.name">
    <p>{{ selectedChar.id }}</p>
    <p>{{ selectedChar.name }}</p>
  </div>
  <h2 v-else>Personaje no seleccionado</h2>
  <ModalDialog :show="ready" @onClose="">
    <div>
      <h1>We are waiting for the other guy</h1>
      <p>loading ...</p>
    </div>
  </ModalDialog>
</template>

<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
  max-height: 70dvh;
  overflow-y: scroll;
  gap: 2rem;
}

.selectedChar {
  border: 5px solid orange;
}
</style>
