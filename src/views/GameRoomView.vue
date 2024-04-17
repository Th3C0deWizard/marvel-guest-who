<script setup lang="ts">
import { Transition, ref } from "vue";
import { store } from "../State/store";
import router from "@/router";
import type { SimpleCharacter, Character } from "../State/models";
import Button from "@/components/Button.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import Loading from "@/components/Loading.vue";
import CharacterBoard from "@/components/CharacterBoard.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import IconClick from "@/components/IconClick.vue";

const loading = ref(true);
const characters = ref<Array<SimpleCharacter>>([]);
const selectedChar = ref<Character | undefined>();
const ready = ref(false);
const showSelected = ref(false);

const closeSelected = () => {
  showSelected.value = false;
};

store.socket?.on("start", (charactersData: Array<SimpleCharacter>) => {
  characters.value = charactersData;
  setTimeout(() => {
    loading.value = false;
  }, 500);
});

window.onpopstate = (event) => {
  event.preventDefault();
  store.socket?.disconnect();
  console.log("popstate");
  router.push("/");
};

const selectCharacter = async (character: SimpleCharacter) => {
  if (!ready.value) {
    const response = await fetch(
      `https://gateway.marvel.com//v1/public/characters/${character.id}?ts=1&apikey=95d22bad7531c452ae4f5c1ac9bae9ce&hash=1ea8bd47f0bb37318aeb0e21e3af9950`
    );
    const data = await response.json();
    const result = data.data.results[0];
    if (result) {
      const character: Character = {
        id: result.id,
        name: result.name,
        thumbnail: result.thumbnail,
        description: result.description,
        comics: result.comics.items.map((item: { name: string }) => item.name),
        series: result.series.items.map((item: { name: string }) => item.name),
        stories: result.stories.items.map(
          (item: { name: string }) => item.name
        ),
        events: result.events.items.map((item: { name: string }) => item.name),
      };
      selectedChar.value = character;
    }
  }
};

const sendReady = () => {
  if (selectedChar.value === undefined) {
    return;
  }
  ready.value = true;
  store.socket?.emit("playerReady", selectedChar.value.id);
  store.socket?.on("goToGuessGame", (roomID: string) => {
    router.push({
      name: "GuessGame",
      params: { roomID: roomID },
      replace: true,
    });
  });
};
</script>

<template>
  <main>
    <header><span>Game Room</span></header>
    <section class="select">
      <h1>Choose your character</h1>
      <Loading v-if="loading" />
      <Transition>
        <div v-if="!loading" class="choose-char">
          <CharacterBoard
            :characters
            @onSelectChar="selectCharacter"
          ></CharacterBoard>
          <section class="selected-container">
            <CharacterCard :character="selectedChar"></CharacterCard>
            <Button @click="sendReady" :disabled="ready || !selectedChar"
              >Im Ready</Button
            >
          </section>
        </div>
      </Transition>
    </section>
    <ModalDialog :show="ready" :noClose="true">
      <div class="modal-content">
        <h2>Waiting for the other player</h2>
      </div>
    </ModalDialog>
    <ModalDialog :show="showSelected" @onClose="closeSelected">
      <section class="selected-container">
        <CharacterCard :character="selectedChar"></CharacterCard>
        <Button @click="sendReady" :disabled="ready || !selectedChar"
          >Im Ready</Button
        >
      </section>
    </ModalDialog>
    <Transition>
      <Button class="btn-selected" v-if="!loading">
        <IconClick @click="showSelected = !showSelected" />
      </Button>
    </Transition>
  </main>
</template>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  padding: 2rem 9rem;
  background: white;
  color: black;
  height: 86.3vh;
}

header {
  display: flex;
  justify-content: center;
  background-color: #202020;
}

span {
  padding: 0.6rem;
  color: white;
  font-size: 1.1rem;
  text-transform: uppercase;
}

h1 {
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.choose-char {
  display: grid;
  grid-template-columns: 70% 30%;
}

.selected-container {
  display: flex;
  flex-direction: column;
  padding-inline: 1rem;
  height: 100%;
  gap: 2rem;
  overflow-y: auto;
}

.btn-selected {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  transition: 0.3s;
  display: none;
  z-index: 100;
}

.btn-selected:hover {
  transform: scale(1.1);
}

@media (max-width: 900px) {
  .select {
    padding: 2rem 1rem;
  }
  h1 {
    text-align: center;
  }
  .choose-char {
    display: flex;
    flex-direction: column;
  }
  .choose-char > .selected-container {
    display: none;
  }
  .btn-selected {
    display: block;
  }
}

.modal-content {
  color: black;
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
