<script setup lang="ts">
const props = defineProps<{
  image: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <article>
    <img :src="image" :alt="title" />
    <h2>{{ title }}</h2>
    <p>
      {{ description }}
    </p>
  </article>
</template>

<style scoped>
article {
  position: relative;
  align-items: center;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: 0.3s;
}

article::after {
  content: "";
  height: 4px;
  background-color: #f43138;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}

img {
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
}

article:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
}
</style>
