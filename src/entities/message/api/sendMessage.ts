import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Message } from "../model/types";
import { db } from "@/shared/config/firebase";
import { CHAT_LIST, MESSAGES_LIST } from "@/shared/api/api";

export async function sendMessage(message: Message) {
  const messagesRef = collection(
    db,
    CHAT_LIST,
    message.chatId,
    MESSAGES_LIST
  );

  const newMessage = {
    text: message.text,
    senderUUID: message.senderUUID,
    chatId: message.chatId,
    createdAt: serverTimestamp(),
    editedAt: null,
    replyTo: null,
    status: "delivered"
  } as Message;

  const docRef = await doc(messagesRef);
  
  await setDoc(docRef, {
    ...newMessage,
    id: docRef.id
  } as Message)
}