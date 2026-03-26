import { CHAT_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Chat } from "../model/types";
import { PublicUser } from "@/entities/user/model/types";

export async function createChat(member: PublicUser, currentUser: PublicUser):Promise<Chat> {
  const uuid = crypto.randomUUID();

  const newChat: Chat = {
    uuid,
    type: "text",
    members: [member.uuid, currentUser.uuid],
    lastMessage: null,
    membersInfo: {
      [member.uuid]: { ...member },
      [currentUser.uuid]: { ...currentUser }
    }
  }
  
  const chatsRef = doc(db, CHAT_LIST, uuid)

  await setDoc(chatsRef, newChat)
  
  return newChat;
}