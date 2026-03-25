"use client";

import { Button } from "@/shared/ui/Button";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "@/shared/ui/Item";
import { Typography } from "@/shared/ui/Typography";
import { Plus } from 'lucide-react'
import { useFindUserStore } from "../model/store";

export function FindUserResult() {
  const { users, loading, notFound } = useFindUserStore();

  return (
    <FlexContainer className="" direction={"col"} gap={"md"}>
        {loading && <Typography className="text-center">Loading...</Typography>}
        {notFound && <Typography className="text-center">Not Found</Typography>}
        <ItemGroup className="gap-3">
          {users.map((user) => (
            <Item key={user.username} variant={"outline"} role="listitem">
              <ItemContent>
                <ItemTitle className="line-clamp-1">{user.username}</ItemTitle>
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
          ))}
        </ItemGroup>
      </FlexContainer>
  )
}