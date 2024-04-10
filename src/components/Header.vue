<script setup lang="ts">
const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
]
</script>

<template>
  <header>
    <nav>
      <ul>
        <li v-for="[content, uri] in navLinks">
          <a :href="uri">{{ content }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
}

a {
  display: block;
  text-decoration: none;
  padding: 1.5rem;
  color: white;
  font-size: 1.3rem;
}

ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}
</style>
