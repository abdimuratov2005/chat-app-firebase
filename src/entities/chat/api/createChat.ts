import { CHAT_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { collection, doc, setDoc} from "firebase/firestore";
import { Chat } from "../model/types";
import { PublicUser } from "@/entities/user/model/types";

export async function createChat(member: PublicUser, currentUser: PublicUser):Promise<Chat> {
  const chatsCol = collection(db, CHAT_LIST);

  const newChat = {
    type: "text",
    members: [member.id, currentUser.id],
    lastMessage: null,
    membersInfo: {
      [member.id]: { ...member },
      [currentUser.id]: { ...currentUser }
    }
  } as Chat;

  const docRef = await doc(chatsCol)

  await setDoc(docRef, {
    ...newChat,
    id: docRef.id,
  } as Chat)
  
  return newChat
}