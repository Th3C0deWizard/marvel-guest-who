<script setup lang="ts">
import type { Character } from "../State/models";

const props = defineProps<{
  character: Character;
}>();
</script>

<template>
  <article class="character">
    <figure>
      <img
        :src="
          character
            ? `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
            : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg'
        "
        :alt="character ? character.name : 'No character selected'"
      />
    </figure>
    <div class="info-character info-select">
      <p>{{ character ? character.id : "No character" }}</p>
      <div v-if="character !== undefined">
        <p>
          {{ character.name }}
        </p>
        <p>
          {{
            character.description === ""
              ? "No description available"
              : character.description
          }}
        </p>
        <p>
          {{ character.comics.length > 0 ? character.comics.length : "No" }}
          comics
        </p>
        <p>
          {{ character.series.length > 0 ? character.series.length : "No" }}
          series
        </p>
        <p>
          {{ character.stories.length > 0 ? character.stories.length : "No" }}
          stories
        </p>
        <p>
          {{ character.events.length > 0 ? character.events.length : "No" }}
          events
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.character {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-height: 70%;

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
    height: 100%;
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

h2 {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.info-select {
  height: auto;
}
</style>
