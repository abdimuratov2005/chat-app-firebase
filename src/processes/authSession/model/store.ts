import { create } from "zustand";
import { AuthStore } from "./types";
import { USER_UUID } from "@/shared/api/api";
import { UserStore } from "@/entities/user/model/types";
import { auth } from "@/entities/user/api/auth";
import { setCookie } from "@/shared/lib/utils";

export const useAuthStore = create<AuthStore & UserStore>((set, get) => ({
  username: "",
  password: "",

  isUsernameSetted: false,
  isPasswordSetted: false,

  currentUser: null,

  isLoading: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setPassword: (password) => set({ password: password }),
  setUsername: (username) => set({ username: username }),

  onAuth: async () => {
    const { username, password } = get();

    if (!username || !password) return;

    set({ isLoading: true });

    const user = await auth(username, password);

    if (!Object.hasOwn(user, "error")) {
      setCookie(USER_UUID, user.id, 7);
    }

    set({
      currentUser: user,
      password: "",
      isLoading: false,
    });
  },

  logOut: () => {
    set({
      currentUser: null,
      username: "",
      password: "",
      isUsernameSetted: false,
      isPasswordSetted: false,
    });
    setCookie(USER_UUID, '', 0);
  },
}));
