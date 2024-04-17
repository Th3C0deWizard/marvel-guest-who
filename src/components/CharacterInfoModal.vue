<script setup lang="ts">
import ModalDialog from './ModalDialog.vue';
import type { Character } from "../State/models"

const props = defineProps<{
  show: boolean;
  character: Character
  onClose: () => void;
}>();

</script>

<template>
  <ModalDialog :show @onClose="onClose">
    <div class="modal-content">
      <div>
        <h1>{{ character?.name }}</h1>
        <figure>
          <img :src="character?.thumbnail.path +
            '/portrait_fantastic.' +
            character?.thumbnail.extension
            " :alt="character?.name" />
        </figure>
        <p>
          {{
            character?.description
            ? character?.description
            : "Desscription no available"
          }}
        </p>
      </div>
      <div>
        <h2>Comics</h2>
        <ul>
          <li v-for="comic in character?.comics" :key="comic">
            {{ comic }}
          </li>
        </ul>
        <h2>Series</h2>
        <ul>
          <li v-for="serie in character?.series" :key="serie">
            {{ serie }}
          </li>
        </ul>
      </div>
      <div>
        <h2>Stories</h2>
        <ul>
          <li v-for="story in character?.stories" :key="story">
            {{ story }}
          </li>
        </ul>
      </div>
      <div>
        <h2>Events</h2>
        <ul>
          <li v-for="event in character?.events" :key="event">
            {{ event }}
          </li>
        </ul>
      </div>
    </div>
  </ModalDialog>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  color: black;
}

div.modal-content {
  max-width: 50dvw;
}
</style>
