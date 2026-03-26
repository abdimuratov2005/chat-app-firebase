import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Message } from "../model/types";
import { db } from "@/shared/config/firebase";
import { CHAT_LIST, MESSAGES_LIST } from "@/shared/api/api";

export async function sendMessage(message: Message) {
  const uuid = crypto.randomUUID();

  const newMessage: Message = {
    uuid,
    text: message.text,
    senderUUID: message.senderUUID,
    chatId: message.chatId,
    createdAt: serverTimestamp(),
    editedAt: null,
    replyTo: null,
    status: "delivered"
  };

  const messagesRef = doc(db, CHAT_LIST, message.chatId, MESSAGES_LIST, uuid);

  await setDoc(messagesRef, newMessage)

  return newMessage;
}