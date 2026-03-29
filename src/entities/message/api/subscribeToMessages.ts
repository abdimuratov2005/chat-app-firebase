import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Message } from "../model/types";
import { db } from "@/shared/config/firebase";
import { CHAT_LIST, MESSAGES_LIST } from "@/shared/api/api";

export function subscribeToMessages(chatId: string, callback: (msgs: Message[]) => void) {
  const messageCol = collection(db, CHAT_LIST, chatId, MESSAGES_LIST);
  const messagesQuery = query(messageCol, orderBy("createdAt", "asc"));

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Message[];

    callback(messages)
  })
}