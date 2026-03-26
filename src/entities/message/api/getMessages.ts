import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Message } from "../model/types";
import { db } from "@/shared/config/firebase";
import { CHAT_LIST, MESSAGES_LIST } from "@/shared/api/api";

export async function getMessages(chatID: string):Promise<Message[]> {
  const messagesCol = collection(db, CHAT_LIST, chatID, MESSAGES_LIST);
  const messagesQuery = query(messagesCol, orderBy("createdAt", 'asc'));

  const messagesSnapshot = await getDocs(messagesQuery);
  
  return messagesSnapshot.docs.map((doc) => doc.data() as Message)
}