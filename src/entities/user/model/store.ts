import { create } from "zustand";
import { UserStore } from "./types";

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: async (user) => set({ currentUser: user }),
}))