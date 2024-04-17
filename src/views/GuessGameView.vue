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
import CharacterBoard from "@/components/CharacterBoard.vue";
import CharacterInfoModal from "@/components/CharacterInfoModal.vue";
import IconChat from "@/components/IconChat.vue";
import Button from "@/components/Button.vue";

const characters = ref<Array<SimpleCharacter>>([]);
const infoChar = ref<Character | undefined>();
const selectedChar = ref<number>();
const loading = ref(true);
const openModal = ref(false);
const openWinModal = ref(false);
const showChat = ref(false);
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
    alert.text = "YOU ARE THE BEST GUESSER, CONGRATULATIONS!";
  } else {
    openAlert("YOU MISS IT!", "YOU FAIL YOUR GUESS, LOOSER");
  }
});

store.socket?.on("youLose", () => {
  openWinModal.value = true;
  alert.title = "YOU LOSE";
  alert.text = "YOU ARE THE WORST GUESSER, YOU LOSE!";
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

const closeChat = () => {
  showChat.value = false;
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
        <section v-if="!loading" class="board-char">
          <CharacterBoard :characters>
            <template v-slot="{ id }">
              <div class="btn-actions">
                <Button
                  @click="guessAction(id)"
                  :disabled="myTurn === false"
                  title="Guess"
                  fontSize="0.5rem"
                >
                  <IconGuess />
                </Button>
                <Button
                  title="Info about character"
                  @click="infoModal(id)"
                  fontSize="0.5rem"
                >
                  <IconInfo />
                </Button>
                <Button
                  title="Cross out / highlight"
                  @click="crossOut(id)"
                  fontSize="0.5rem"
                >
                  <IconCrossOut />
                </Button>
              </div>
            </template>
          </CharacterBoard>
          <Chat
            :active="myTurn || answering"
            :chatHistory
            @onChat="chatAction"
          />
        </section>
      </Transition>
    </section>
    <CharacterInfoModal
      :show="openModal"
      :character="infoChar"
      :onClose="closeModal"
    />
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
        <Button @click="store.socket?.disconnect()" fontSize="1.5rem"
          >OK</Button
        >
      </div>
    </ModalDialog>
    <ModalDialog :show="showChat" @onClose="closeChat">
      <Chat :active="myTurn || answering" :chatHistory @onChat="chatAction" />
    </ModalDialog>
    <Transition>
      <Button class="btn-chat">
        <IconChat @click="showChat = !showChat" />
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
  .loader {
    margin-left: 46%;
    margin-top: 5rem;
  }
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

.modal-win-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: black;
}

.btn-chat {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  border-radius: 50%;
  transition: 0.3s;
  display: none;
  z-index: 100;
}

.btn-chat:hover {
  scale: 1.1;
}

@media (max-width: 900px) {
  .select {
    padding: 2rem 1rem;
  }
  h1 {
    text-align: center;
  }
  .board-char {
    display: flex;
    flex-direction: column;
  }
  .board-char > .chat {
    display: none;
  }
  .btn-chat {
    display: block;
  }
  .btn-actions {
    padding: 0;
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
