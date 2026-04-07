import { io } from "socket.io-client";

export function connectWs() {
  const isLoggedin = !!localStorage.getItem("user");
  const userId = isLoggedin
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;
  return io("http://localhost:3000", {
    query: { userId },
  });
}
