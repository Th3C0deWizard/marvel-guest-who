import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import MatchMakingView from "../views/MatchMakingView.vue"
import GameRoomView from "../views/GameRoomView.vue"
import GuessGameView from "../views/GuessGameView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", name: "Home", component: HomeView,
    },
    {
      path: "/matchmaking", name: "MatchMaking", component: MatchMakingView,
    },
    {
      path: "/gameroom", name: "GameRoom", component: GameRoomView,
    },
    {
      path: "/gameroom/:roomID", props: true, name: "GuessGame", component: GuessGameView,
    },
  ]
})

export default router
