<script setup lang="ts">
const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
];
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
  background-color: #202020;
}

a {
  display: block;
  text-decoration: none;
  padding: 0.5rem;
  color: white;
  font-size: 1.1rem;
  text-transform: uppercase;
}

ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

li {
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

li:hover {
  border-bottom: 2px solid #e62429;
}
</style>
