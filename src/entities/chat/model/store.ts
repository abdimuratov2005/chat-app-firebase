import { create } from "zustand";
import { Chat, ChatsStore } from "./types";
import { loadChats } from "../api/loadChats";
import { USER_UUID } from "@/shared/api/api";
import { getCookie } from "@/shared/lib/utils";
import { createChat } from "../api/createChat";

export const useChatsStore = create<ChatsStore>((set, get) => ({
  chats: [],
  isLoading: false,
  activeChatId: null,
  createChat: async (member, currentUser) => {
    const chat = await createChat(member, currentUser);
    set(state => ({
      chats: [...state.chats, chat]
    }))
  },
  
  removeChat: (user) => {},

  loadChats: async () => {
    const { isLoading } = get();

    if (isLoading) return;

    set({ isLoading: true });

    const chats = await loadChats(getCookie(USER_UUID));

    set(({
      chats,
      isLoading: false
    }))
  },
  setActiveChat: (uuid) => {
    set({ activeChatId: uuid })
  },
}))