<script setup lang="ts">
import { ref } from "vue";
import { type SimpleCharacter } from "../State/models";
import { store } from "../State/store";

const characters = ref<Array<SimpleCharacter>>([]);
const selectedChar = ref<number>();
const loading = ref(true);

store.socket?.on(
  "startGuess",
  (charactersData: Array<SimpleCharacter>, selectedCharID: number) => {
    console.log(charactersData);
    characters.value = charactersData;
    selectedChar.value = selectedCharID;
    loading.value = false;
  }
);
</script>

<template>
  <h1>This is the guess room</h1>
  <p v-if="loading">Loading ...</p>
  <section v-if="!loading">
    <div
      v-for="{ id, name, thumbnail } in characters"
      :key="id"
      :id="id.toString()"
    >
      <img
        :src="thumbnail.path + '/portrait_medium.' + thumbnail.extension"
        :alt="name"
      />
      <p>{{ id }}</p>
      <p>{{ name }}</p>
    </div>
  </section>
</template>

<style scoped></style>
