import { io } from "socket.io-client";

export function connectWs(name) {
  return io("http://localhost:3000", {
    query: {
      name,
      room: "global",
    },
  });
}
