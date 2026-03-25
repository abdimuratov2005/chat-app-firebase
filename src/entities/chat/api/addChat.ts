import { CHAT_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Chat } from "../model/types";

export async function addChat(membersUUID: string[]):Promise<Chat> {
  const uuid = crypto.randomUUID();

  const newChat: Chat = {
    type: "text",
    members: [...membersUUID],
    lastMessage: null,
    messages: null,
  }

  const ref = doc(db, CHAT_LIST, uuid);
  
  await setDoc(ref, newChat);
  
  return newChat;
}