"use client";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/shared/ui/Item";
import { useChatsStore } from "@/entities/chat/model/store";
import { useEffect } from "react";
import { Typography } from "@/shared/ui/Typography";
import { useUserStore } from "@/entities/user/model/store";

export function DisplayChats() {
  const { chats, loadChats, isLoading, setActiveChat } = useChatsStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    loadChats()
  }, []);

  return (
    <>
      <FlexContainer className="" direction={"col"} gap={"md"}>
        {isLoading && (
          <Typography className="text-center">Loading...</Typography>
        )}
        <ItemGroup className="gap-3">
          {chats.map((chat) => {
            const user =
              chat.membersInfo[
                currentUser?.id === chat.members[0]
                  ? chat.members[1]
                  : chat.members[0]
              ];
            return (
              <Item key={user.id} onClick={() => setActiveChat(chat.id)} className="cursor-pointer" variant={"outline"} role="listitem">
                <ItemContent>
                  <ItemTitle className="line-clamp-1">
                    {user.username}
                  </ItemTitle>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>
      </FlexContainer>
    </>
  );
}
