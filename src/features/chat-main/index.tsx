"use client";

import { useChatsStore } from "@/entities/chat/model/store";
import { useUserStore } from "@/entities/user/model/store";
import { Button } from "@/shared/ui/Button";
import { ButtonGroup } from "@/shared/ui/ButtonGroup";
import { Field } from "@/shared/ui/Field";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Input } from "@/shared/ui/Input";
import { SendHorizontal } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/shared/ui/Item";
import { Plus } from "lucide-react";
import { Textarea } from "@/shared/ui/TextArea";
import { useMessageStore } from "@/entities/message/model/store";
import { useEffect, useState } from "react";

export function ChatMain() {
  const { currentUser } = useUserStore();
  const { messages, sendMessage, clearMessages, loadMessages, subscribe } = useMessageStore();
  const [inputText, setInputText] = useState('')
  const activeChat = useChatsStore((state) =>
    state.chats.find((chat) => chat.uuid === state.activeChatId),
  );

  const otherUser = activeChat
    ? activeChat.membersInfo[
        activeChat.members.find((uuid) => uuid !== currentUser?.uuid)!
      ]
    : null;

  const handleSendMessage = () => {
    if (!activeChat) return;
    sendMessage(activeChat.uuid, inputText)
  }

  useEffect(() => {
    if (!activeChat) return;
    
    clearMessages();
    loadMessages(activeChat.uuid)

    return () => subscribe(activeChat.uuid);
  }, [activeChat])

  return (
    <>
      <FlexContainer direction={"col"} className="w-full h-screen p-3 pb-5">
        <Item className="shrink-0" variant="outline">
          <ItemContent>
            <ItemTitle>{otherUser?.username}</ItemTitle>
            <ItemDescription>Last seen 5 months ago</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              size="icon-sm"
              variant="outline"
              className="rounded-full"
              aria-label="Invite"
            >
              <Plus />
            </Button>
          </ItemActions>
        </Item>
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <Item key={message.uuid} variant="outline">
              <ItemContent>
                <ItemTitle>{message.text}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </div>
        <Field className="shrink-0">
          <div className="relative w-full">
            <Textarea
              placeholder="Type your message here..."
              className="pr-12 resize-none min-h-[40] max-h-[150]"
              onChange={(event) => {
                setInputText(event.target.value)
              }}
            />

            <Button
              type="button"
              className="absolute right-2 bottom-[5]"
              variant="outline"
              size="icon"
              onClick={handleSendMessage}
            >
              <SendHorizontal />
            </Button>
          </div>
        </Field>
      </FlexContainer>
    </>
  );
}
