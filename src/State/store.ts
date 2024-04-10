import { Socket, io } from "socket.io-client";
import { reactive } from "vue";


export const store = reactive<{ socket: any }>(
  {
    socket: io(),
  }
)
