<script setup lang="ts">
import { ref, Transition } from "vue";
import type { SimpleCharacter, Character } from "../State/models";
import { store } from "../State/store";
import Loading from "@/components/Loading.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import IconInfo from "@/components/IconInfo.vue";
import IconGuess from "@/components/IconGuess.vue";
import IconCrossOut from "@/components/IconCrossOut.vue";

const characters = ref<Array<SimpleCharacter>>([]);
const infoChar = ref<Character | undefined>();
const selectedChar = ref<number>();
const loading = ref(true);
const openModal = ref(false);

store.socket?.on(
  "startGuess",
  (charactersData: Array<SimpleCharacter>, selectedCharID: number) => {
    console.log(charactersData);
    characters.value = charactersData;
    selectedChar.value = selectedCharID;
    loading.value = false;
  }
);

const infoModal = async (charID: number) => {
  const response = await fetch(
    `https://gateway.marvel.com//v1/public/characters/${charID}?ts=1&apikey=95d22bad7531c452ae4f5c1ac9bae9ce&hash=1ea8bd47f0bb37318aeb0e21e3af9950`
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
      stories: result.stories.items.map((item: { name: string }) => item.name),
      events: result.events.items.map((item: { name: string }) => item.name),
    };
    infoChar.value = character;
    openModal.value = true;
  }
};

const crossOut = (charID: number) => {
  const article = document.getElementById(charID.toString());
  if (article) {
    if (article.classList.contains("cross-out")) {
      article.classList.remove("cross-out");
    } else {
      article.classList.add("cross-out");
    }
  }
};

const closeModal = () => {
  openModal.value = false;
};
</script>

<template>
  <main>
    <header><span>Guess Room</span></header>
    <section class="select">
      <h1>Character board</h1>
      <Loading v-if="loading" />
      <Transition>
        <div v-if="!loading" class="board-char">
          <section class="characters-container">
            <article
              class="character"
              v-for="{ id, name, thumbnail } in characters"
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
              <div class="btn-actions">
                <button title="Guess"><IconGuess /></button>
                <button title="Info about character" @click="infoModal(id)">
                  <IconInfo />
                </button>
                <button title="Cross out / highlight" @click="crossOut(id)">
                  <IconCrossOut />
                </button>
              </div>
            </article>
          </section>
          <section class="chat">
            <span class="name-container">Chat</span>
            <div class="chat-container"></div>
            <div class="input-container">
              <input type="text" />
              <button>Send</button>
            </div>
          </section>
        </div>
      </Transition>
    </section>
    <ModalDialog :show="openModal" @onClose="closeModal">
      <div class="modal-content">
        <div>
          <h1>{{ infoChar?.name }}</h1>
          <figure>
            <img
              :src="
                infoChar?.thumbnail.path +
                '/portrait_fantastic.' +
                infoChar?.thumbnail.extension
              "
              :alt="infoChar?.name"
            />
          </figure>
          <p>
            {{
              infoChar?.description
                ? infoChar?.description
                : "Desscription no available"
            }}
          </p>
        </div>
        <div>
          <h2>Comics</h2>
          <ul>
            <li v-for="comic in infoChar?.comics" :key="comic">{{ comic }}</li>
          </ul>
          <h2>Series</h2>
          <ul>
            <li v-for="serie in infoChar?.series" :key="serie">{{ serie }}</li>
          </ul>
        </div>
        <div>
          <h2>Stories</h2>
          <ul>
            <li v-for="story in infoChar?.stories" :key="story">{{ story }}</li>
          </ul>
        </div>
        <div>
          <h2>Events</h2>
          <ul>
            <li v-for="event in infoChar?.events" :key="event">{{ event }}</li>
          </ul>
        </div>
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

.board-char {
  display: grid;
  grid-template-columns: 70% 30%;
}

.characters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.character {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  figure {
    position: relative;
    overflow: hidden;
    z-index: 40;
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
  height: 7rem;
}

.info-character::before {
  content: "";
  background-color: #e62429;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 100%;
  z-index: -1;
  transition: 0.3s;
}

.cross-out {
  img {
    filter: grayscale(100%);
  }
  figure::after {
    background-color: #202020;
  }
  div::before {
    background-color: #202020;
  }
}

.character:hover img {
  transform: scale(1.05);
}

.character:hover .info-character::before {
  transform: translate3d(0, 100%, 0);
}

.btn-actions {
  display: flex;
  justify-content: space-around;
  background-color: #202020;
  padding: 0.5rem;
}

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

.modal-content {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
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
