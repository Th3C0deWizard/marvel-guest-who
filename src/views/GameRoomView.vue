<script setup lang="ts">
import { Transition, ref } from "vue";
import { store } from "../State/store";
import router from "@/router";
import type { SimpleCharacter, Character } from "../State/models";
import Button from "@/components/Button.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import Loading from "@/components/Loading.vue";

const loading = ref(true);
const characters = ref<Array<SimpleCharacter>>([]);
const selectedChar = ref<Character | undefined>();
const ready = ref(false);

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
          <section class="characters-container">
            <article
              class="character"
              v-for="{ id, name, thumbnail } in characters"
              @click="selectCharacter({ id, name, thumbnail })"
              :key="id"
              :id="id.toString()"
            >
              <figure>
                <img
                  :src="
                    thumbnail.path +
                    '/portrait_fantastic.' +
                    thumbnail.extension
                  "
                  :alt="name"
                />
              </figure>
              <div class="info-character">
                <p>{{ id }}</p>
                <p>{{ name }}</p>
              </div>
            </article>
          </section>
          <section class="selected-container">
            <article class="character">
              <figure>
                <img
                  :src="
                    selectedChar
                      ? `${selectedChar.thumbnail.path}/portrait_uncanny.${selectedChar.thumbnail.extension}`
                      : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg'
                  "
                  :alt="
                    selectedChar ? selectedChar.name : 'No character selected'
                  "
                />
              </figure>
              <div class="info-character info-select">
                <p>{{ selectedChar ? selectedChar.id : "No character" }}</p>
                <div v-if="selectedChar !== undefined">
                  <p>
                    {{ selectedChar.name }}
                  </p>
                  <p>
                    {{
                      selectedChar.description === ""
                        ? "No description available"
                        : selectedChar.description
                    }}
                  </p>
                  <p>
                    {{
                      selectedChar.comics.length > 0
                        ? selectedChar.comics.length
                        : "No"
                    }}
                    comics
                  </p>
                  <p>
                    {{
                      selectedChar.series.length > 0
                        ? selectedChar.series.length
                        : "No"
                    }}
                    series
                  </p>
                  <p>
                    {{
                      selectedChar.stories.length > 0
                        ? selectedChar.stories.length
                        : "No"
                    }}
                    stories
                  </p>
                  <p>
                    {{
                      selectedChar.events.length > 0
                        ? selectedChar.events.length
                        : "No"
                    }}
                    events
                  </p>
                </div>
              </div>
            </article>
            <Button @click="sendReady" :disabled="ready">Im Ready</Button>
          </section>
        </div>
      </Transition>
    </section>
    <ModalDialog :show="ready" :noClose="true">
      <div class="modal-content">
        <h2>Waiting for the other player</h2>
      </div>
    </ModalDialog>
  </main>
</template>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  padding: 2rem 9rem;
  background: white;
  color: black;
  min-height: 100vh;
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

.choose-char {
  display: grid;
  grid-template-columns: 70% 30%;
}

.characters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  overflow-y: auto;
}

.character {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  figure {
    position: relative;
    overflow: hidden;
    z-index: 40;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  figure::after {
    content: "";
    height: 4px;
    background-color: #e62429;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: 0.2s;
  }

  img {
    overflow: hidden;
    transition: 0.2s;
    width: 100%;
  }
}

.info-character {
  padding: 1rem 1.5rem;
  background-color: #202020;
  color: white;
  position: relative;
  z-index: 30;
  height: 6rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.info-character::before {
  content: "";
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 100%;
  z-index: -1;
  transition: color 0.01s ease, transform 0.4s;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.character:hover img {
  transform: scale(1.05);
}

.character:hover .info-character::before {
  background-color: #e62429;
  transform: translate3d(0, 100%, 0);
}

.selected-container {
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
  gap: 3rem;
}

h2 {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.info-select {
  height: auto;
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
