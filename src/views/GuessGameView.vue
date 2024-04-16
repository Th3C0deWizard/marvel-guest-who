<script setup lang="ts">
import { reactive, ref, Transition } from "vue";
import {
  type SimpleCharacter,
  type Character,
  type ChatMessageType,
} from "../State/models";
import { store } from "../State/store";
import Loading from "@/components/Loading.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import IconInfo from "@/components/IconInfo.vue";
import IconGuess from "@/components/IconGuess.vue";
import IconCrossOut from "@/components/IconCrossOut.vue";
import Chat from "@/components/Chat.vue";
import Alert from "@/components/Alert.vue";

const characters = ref<Array<SimpleCharacter>>([]);
const infoChar = ref<Character | undefined>();
const selectedChar = ref<number>();
const loading = ref(true);
const openModal = ref(false);
const openWinModal = ref(false);
const chatActive = ref(false);
const chatHistory = ref<Array<ChatMessageType>>([]);
const myTurn = ref(false);
const answering = ref(false);
const alert = reactive({
  title: "",
  show: false,
  text: "",
});

store.socket?.on(
  "startGuess",
  (charactersData: Array<SimpleCharacter>, selectedCharID: number) => {
    console.log(charactersData);
    characters.value = charactersData;
    selectedChar.value = selectedCharID;
    loading.value = false;
  }
);

store.socket?.on("yourTurn", (failGuess: boolean) => {
  myTurn.value = true;
  const text = !failGuess
    ? "You can give it a try and make a guess, or ask your opponent for clues"
    : "Your opponent is a loser so it has failed the guess try";
  openAlert("Its your turn!", text);
});

store.socket?.on(
  "opponentAnswer",
  (chatHistoryData: Array<ChatMessageType>) => {
    chatHistory.value = chatHistoryData;
    openAlert(
      "You have got the clues you need to guess!",
      "Wait until your next turn"
    );
  }
);

store.socket?.on("playerAsk", (chatHistoryData: Array<ChatMessageType>) => {
  answering.value = true;
  chatHistory.value = chatHistoryData;
  openAlert(
    "You have been asked for clues!",
    "You have to answer your opponet question"
  );
});

store.socket?.on("guessResult", (assert: boolean) => {
  if (assert) {
    openWinModal.value = true;
    alert.title = "YOU WON!";
    alert.text = "YOU WON! A TI TE VOY A DAR DOS BOLITAS, PICOS Y CHAO";
  } else {
    openAlert("YOU MISS IT!", "YOU FAIL YOUR GUESS, LOOSER");
  }
});

store.socket?.on("youLose", () => {
  openWinModal.value = true;
  alert.title = "YOU LOSE";
  alert.text = "YOU ARE LOSER, A TI NO TE VOY A DAR BOLITAS";
});

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

const openAlert = (title: string, text: string) => {
  alert.title = title;
  alert.text = text;
  alert.show = true;
  setTimeout(() => {
    alert.show = false;
  }, 5000);
};

const closeAlert = () => {
  alert.show = false;
};

const guessAction = (id: number) => {
  console.log(id);
  myTurn.value = false;
  const actionData = { action: "guess", characterId: id };
  store.socket?.emit("playerAction", actionData);
};

const chatAction = (message: string) => {
  if (myTurn.value) {
    myTurn.value = false;
    chatHistory.value.push({ message, itsMe: true });
    console.log(chatHistory.value);
    const actionData = { action: "ask", message };
    store.socket?.emit("playerAction", actionData);
  } else if (answering.value) {
    answering.value = false;
    chatHistory.value.push({ message, itsMe: true });
    store.socket?.emit("playerAnswer", message);
  } else {
    console.log("No haremos nada al respecto ._.");
  }
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
                <button
                  @click="guessAction(id)"
                  :disabled="myTurn === false"
                  title="Guess"
                >
                  <IconGuess />
                </button>
                <button title="Info about character" @click="infoModal(id)">
                  <IconInfo />
                </button>
                <button title="Cross out / highlight" @click="crossOut(id)">
                  <IconCrossOut />
                </button>
              </div>
            </article>
          </section>
          <Chat
            :active="myTurn || answering"
            :chatHistory
            @onChat="chatAction"
          />
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
            <li v-for="comic in infoChar?.comics" :key="comic">
              {{ comic }}
            </li>
          </ul>
          <h2>Series</h2>
          <ul>
            <li v-for="serie in infoChar?.series" :key="serie">
              {{ serie }}
            </li>
          </ul>
        </div>
        <div>
          <h2>Stories</h2>
          <ul>
            <li v-for="story in infoChar?.stories" :key="story">
              {{ story }}
            </li>
          </ul>
        </div>
        <div>
          <h2>Events</h2>
          <ul>
            <li v-for="event in infoChar?.events" :key="event">
              {{ event }}
            </li>
          </ul>
        </div>
      </div>
    </ModalDialog>
    <Transition>
      <Alert
        :title="alert.title"
        :text="alert.text"
        v-if="alert.show"
        @closeAlertEmit="closeAlert"
      />
    </Transition>
    <ModalDialog :show="openWinModal" :noClose="true">
      <div class="modal-win-content">
        <h1>{{ alert.title }}</h1>
        <p>{{ alert.text }}</p>
        <button @click="store.socket?.disconnect()">OK</button>
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

.board-char {
  display: grid;
  grid-template-columns: 70% 30%;
}

.characters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  height: 80dvh;
  overflow-y: auto;
}

.character {
  display: flex;
  flex-direction: column;

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
    transition: 0.2s;
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
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.character:hover .info-character::before {
  transform: translate3d(0, 100%, 0);
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

.btn-actions {
  display: flex;
  justify-content: space-around;
  background-color: #202020;
  padding: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
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

.modal-win-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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
