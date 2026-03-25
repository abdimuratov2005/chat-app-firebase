import { create } from "zustand";
import { loginWithCode } from "@/entities/user/api/loginWithCode";
import { addUser } from "@/entities/user/api/addUser";
import { AuthStore } from "./types";
import { PATHS, USER_UUID } from "@/shared/api/api";

export const useAuthStore = create<AuthStore>((set, get) => ({
  username: "",
  loginCode: "",
  currentUser: null,
  setLoginCode: (code) => set({ loginCode: code }),
  setUsername: (username) => set({ username: username }),
  setCurrentUser: (user) => set({ currentUser: user }),
  register: async () => {
    try {
      const user = await addUser(get().currentUser?.username || get().username);
      set({ currentUser: user })
      document.cookie = `${USER_UUID}=${get().currentUser?.uuid}; path=${PATHS[0]}; max-age=604800`;

    } catch (e: any) {
      alert(e.message);
    }
  },
  login: async () => {
    try {
      const user = await loginWithCode(get().currentUser?.username || get().username, get().loginCode);
      set({ currentUser: user })
      document.cookie = `${USER_UUID}=${get().currentUser?.uuid}; path=${PATHS[0]}; max-age=604800`;
    } catch (e: any) {
      alert(e.message);
    }
  },
  logOut: () => {
    set({
      currentUser: null,
      username: "",
      loginCode: "",
    })
    document.cookie = `${USER_UUID}=; path=${PATHS[0]}; max-age=0`;
  }
}))