import { MessageType } from "@/entities/message/model/types";
import { PublicUser } from "@/entities/user/model/types";


type ChatLastMessage = {
  senderId: string,
  createdAt: string;
  text: string,
}

export type Chat = {
  id: string;
  type: MessageType;
  members: string[];
  lastMessage: ChatLastMessage | null;
  membersInfo: Record<string, PublicUser>;
}

export type ChatsStore = {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  
  setActiveChat: (uuid: string) => void
  createChat: (member: PublicUser, currentUser: PublicUser) => void;
  removeChat: (user: PublicUser) => void;
  loadChats: () => void;
}