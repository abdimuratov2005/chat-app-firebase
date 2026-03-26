import { CHAT_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Chat } from "../model/types";

export async function loadChats(userUUID: string):Promise<Chat[]> {
  const chatsCol = collection(db, CHAT_LIST);
  const chatsQuery = query(chatsCol, where("members", "array-contains", userUUID))
  const chatsSnapshot = await getDocs(chatsQuery);

  return chatsSnapshot.docs.map((doc) => doc.data() ) as Chat[];
}