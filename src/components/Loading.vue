<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 120px;
  aspect-ratio: 1;
  background: linear-gradient(45deg, #f43138 50%, #0000 0),
    linear-gradient(45deg, #0000 50%, #f43138 0),
    linear-gradient(-45deg, #d0d0d0 50%, #0000 0),
    linear-gradient(-45deg, #0000 50%, #d0d0d0 0), linear-gradient(#202020 0 0);
  background-size: 50% 50%;
  background-repeat: no-repeat;
  animation: l18 1.5s infinite;
  margin-left: auto;
  margin-right: auto;
}
@keyframes l18 {
  0% {
    background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%;
  }
  25% {
    background-position: 0 100%, 100% 0, 50% 50%, 50% 50%, 50% 50%;
  }
  50% {
    background-position: 0 100%, 100% 0, 100% 100%, 0 0, 50% 50%;
  }
  75% {
    background-position: 50% 50%, 50% 50%, 100% 100%, 0 0, 50% 50%;
  }
  100% {
    background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%;
  }
}
</style>
