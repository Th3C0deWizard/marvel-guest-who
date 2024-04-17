<script setup lang="ts">
import AboutCard from "./AboutCard.vue";

const articleContent = [
  {
    image: "/src/assets/Select.webp",
    title: "Select character",
    description:
      "Select a character from the panel characters, the opponent does the same.",
  },
  {
    image: "/src/assets/Question.webp",
    title: "Ask and answer",
    description:
      "Asks questions about opponent's character to guess the character, and answers the questions about your character.",
  },
  {
    image: "/src/assets/Guess.webp",
    title: "Guess",
    description:
      "Guess the opponent's character with the information provided and win!",
  },
];
</script>

<template>
  <section id="about">
    <h1>About</h1>
    <p>
      Marvel guess who is an online multiplayer guess who game about marvel
      characters, comics, games and movies characters are included in the game.
    </p>
    <p>
      The game is played by two players, each player selects a character and the
      other player has to guess the character by asking questions about the
      character. For this we provide information about the character to help the
      player guess the character, like an image, description, comics, series and
      events the character appeared in.
    </p>
    <p>
      Each player has a board with all the characters for that game (25), the
      player can eliminate characters from the board based on the answers to the
      questions. Also the player have a chat to communicate with the other
      player. The player who guesses the character first wins the game, try to
      guess the character with the least amount of questions and enjoy the game!
    </p>
    <h1 id="how-to-play">How to play</h1>
    <div>
      <AboutCard
        v-for="content in articleContent"
        :key="content.title"
        :image="content.image"
        :title="content.title"
        :description="content.description"
      />
    </div>
  </section>
</template>

<style scoped>
#about {
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  padding: 0 9rem;
  background: white;
  color: black;
  gap: 0.6rem;
  padding-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

p {
  font-size: 1.1rem;
}

div {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  #about {
    padding: 0 1rem;
  }
}
</style>
