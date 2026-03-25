type ChatLastMessage = {
  senderId: string,
  createdAt: string;
  text: string,
}
type MessageType = "text"
type MessageStatus = "delivered" | "read";
type MessageReplyTo = {
  messageUUID: string,
  text: string,
  senderId: string,
};

export type Chat = {
  type: MessageType;
  members: string[];
  lastMessage: ChatLastMessage | null;
  messages: Message | null;
}

export type Message = {
  senderUUID: string,
  createdAt: string,
  text: string,
  editedAt: string | null,
  status: MessageStatus,
  replyTo: MessageReplyTo | null,
};