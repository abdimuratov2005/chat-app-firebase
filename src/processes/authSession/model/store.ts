import { create } from "zustand";
import { login } from "@/entities/user/api/login";
import { register } from "@/entities/user/api/register";
import { AuthStore } from "./types";
import { USER_UUID } from "@/shared/api/api";
import { setCookie } from "@/shared/lib/utils";
import { UserStore } from "@/entities/user/model/types";

export const useAuthStore = create<AuthStore & UserStore>((set, get) => ({
  currentUser: null,
  username: "",
  loginCode: "",
  loading: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setLoginCode: (code) => set({ loginCode: code }),
  setUsername: (username) => set({ username: username }),
  goToChatPage: () => {
    setCookie(USER_UUID, get().currentUser?.uuid!, 7);
  },
  register: async () => {
    if (!get().username) return;

    set({ loading: true });
    const user = await register(get().username);
    
    set({
      currentUser: user,
      loading: false
    })
  },
  login: async () => {
    try {
      const user = await login(get().username, get().loginCode);
      set({ currentUser: user })
      get().goToChatPage();
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
    document.cookie = `${USER_UUID}=; max-age=0`;
  }
}))