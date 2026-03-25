import { addChat } from "@/entities/chat/api/addChat";

export async function handleAddChat(members: Parameters<typeof addChat>) {
  const member = await addChat(...members);
  
  return member;
}