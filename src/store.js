import { create } from "zustand";

export const useStore = create((set) => ({
  isLoggedin: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  login: (userData) => {
    if (!userData) return;
    localStorage.setItem("user", JSON.stringify(userData));
    set(() => ({ isLoggedin: true, user: userData }));
  },
  logout: () => {
    localStorage.removeItem("user");
    set(() => ({ isLoggedin: false }));
  },

  socket: null,
  setSocket: (socketInstance) => set({ socket: socketInstance }),
}));
