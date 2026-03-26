import { create } from "zustand";
import { Message, MessageStore } from "./types";
import { getMessages } from "../api/getMessages";
import { useUserStore } from "@/entities/user/model/store";
import { sendMessage } from "../api/sendMessage";
import { subscribeToMessages } from "../api/subscribeToMessages";

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  isLoading: false,

  loadMessages: async (chatID) => {
    set({ isLoading: true });

    const messages = await getMessages(chatID);
    set({
      messages,
      isLoading: false
    })
  },
  sendMessage: async (currentChatID, text) => {
    const currentUser = useUserStore.getState().currentUser;
    if (!currentUser) return;

    const tempMessage = {
      chatId: currentChatID,
      senderUUID: currentUser.uuid,
      text,
      status: "sending",
    } as Message;
    
    const newMessage = await sendMessage(tempMessage);

    set((state) => ({
      messages: [...state.messages, newMessage]
    }))
  },

  subscribe: (chatId) => {
    const unsubscribe = subscribeToMessages(chatId, (messages) => {
      set({ messages })
    })
    return unsubscribe
  },
  clearMessages: () => {
    set({ messages: [] })
  }
}))