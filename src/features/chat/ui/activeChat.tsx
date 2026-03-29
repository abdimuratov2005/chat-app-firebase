"use client";

import { useChatsStore } from "@/entities/chat/model/store";
import { useUserStore } from "@/entities/user/model/store";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { FlexContainer } from "@/shared/ui/FlexContainer";
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
import { useEffect } from "react";

export function ActiveChat() {
  const { currentUser } = useUserStore();
  const {
    text,
    setText,
    messages,
    sendMessage,
    clearMessages,
    subscribe,
  } = useMessageStore();

  const activeChat = useChatsStore((state) =>
    state.chats.find((chat) => chat.id === state.activeChatId),
  );

  const otherUser = activeChat
    ? activeChat.membersInfo[
        activeChat.members.find((id) => id !== currentUser?.id)!
      ]
    : null;

  const handleSendMessage = () => {
    if (!activeChat) return;
    sendMessage(activeChat.id);
  };

  useEffect(() => {
    if (!activeChat) return;
    clearMessages();

    const unsubcribe = subscribe(activeChat.id);

    // @ts-ignore
    return () => unsubcribe();
  }, [activeChat]);

  return (
    activeChat && (
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
          <div className="flex-1 overflow-y-auto py-2">
            <FlexContainer direction={"col"} gap={"sm"}>
              {messages.map((message) => (
                <Item
                  key={message.id}
                  className={`w-fit py-1 ${otherUser?.id === message.senderUUID ? "self-start" : "self-end"}`}
                  variant="muted"
                >
                  <ItemContent>
                    <ItemTitle>{message.text}</ItemTitle>
                  </ItemContent>
                </Item>
              ))}
            </FlexContainer>
          </div>
          <Field className="shrink-0">
            <div className="relative w-full">
              <Textarea
                placeholder="Type your message here..."
                className="pr-12 resize-none min-h-[40] max-h-[150]"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
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
    )
  );
}
