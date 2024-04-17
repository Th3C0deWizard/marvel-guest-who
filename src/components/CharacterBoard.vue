<script setup lang="ts">
import type { SimpleCharacter } from "../State/models.ts"

const props = defineProps<
  {
    characters: Array<SimpleCharacter>
  }
>();

const emit = defineEmits<
  {
    (e: "onSelectChar", character: SimpleCharacter): void
  }
>();

</script>

<template>
  <section class="characters-container">
    <article class="character" v-for="{ id, name, thumbnail } in characters"
      @click="$emit('onSelectChar', { id, name, thumbnail })" :key="id" :id="id.toString()">
      <figure>
        <img :src="thumbnail.path +
          '/portrait_fantastic.' +
          thumbnail.extension
          " :alt="name" />
      </figure>
      <div class="info-character">
        <p>{{ id }}</p>
        <p>{{ name }}</p>
      </div>
      <slot :id></slot>
    </article>
  </section>
</template>

<style scoped>
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
</style>
