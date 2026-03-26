import { FieldValue } from "firebase/firestore";

type MessageStatus = "delivered" | "read" | "sending";
export type MessageType = "text";

export type MessageReplyTo = Pick<Message, "senderUUID" | "createdAt" | "uuid">;

export type Message = {
  uuid: string;
  senderUUID: string;
  chatId: string;
  createdAt: FieldValue;
  text: string;
  editedAt: string | null;
  status: MessageStatus;
  replyTo: MessageReplyTo | null;
};

export type MessageStore = {
  messages: Message[];
  isLoading: boolean;

  loadMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  clearMessages: () => void;
  subscribe: (chatId: string) => void
};
