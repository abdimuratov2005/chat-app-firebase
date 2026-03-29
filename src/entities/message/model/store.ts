import { create } from "zustand";
import { Message, MessageStore } from "./types";
import { useUserStore } from "@/entities/user/model/store";
import { sendMessage } from "../api/sendMessage";
import { subscribeToMessages } from "../api/subscribeToMessages";

export const useMessageStore = create<MessageStore>((set, get) => ({
  text: "",
  messages: [],
  isLoading: false,

  setText: (text) => set({ text }),

  sendMessage: async (currentChatID) => {
    const currentUser = useUserStore.getState().currentUser;
    const { text } = get();

    if (!currentUser) return;

    const tempMessage = {
      chatId: currentChatID,
      senderUUID: currentUser.id,
      text,
      status: "sending",
    } as Message;

    await sendMessage(tempMessage);

    set({ text: "" });
  },

  subscribe: (chatId) => {
    const unsubscribe = subscribeToMessages(chatId, (messages) => {
      set({ messages });
    });
    return unsubscribe;
  },
  clearMessages: () => {
    set({ messages: [] });
  },
}));
