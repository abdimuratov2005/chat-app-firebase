import { FieldValue } from "firebase/firestore";

type MessageStatus = "delivered" | "read" | "sending";
export type MessageType = "text";

export type MessageReplyTo = Pick<Message, "senderUUID" | "createdAt" | "id">;

export type Message = {
  id: string;
  senderUUID: string;
  chatId: string;
  createdAt: FieldValue;
  text: string;
  editedAt: string | null;
  status: MessageStatus;
  replyTo: MessageReplyTo | null;
};``

export type MessageStore = {
  text: string;
  messages: Message[];
  isLoading: boolean;

  setText: (text: string) => void;
  sendMessage: (chatId: string) => Promise<void>;
  clearMessages: () => void;
  subscribe: (chatId: string) => void;
};
