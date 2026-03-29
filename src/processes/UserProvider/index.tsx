"use client";

import { useUserStore } from "@/entities/user/model/store";
import { User } from "@/entities/user/model/types";
import { useEffect } from "react";

type UserProviderProps = {
  user: User | null;
  children: React.ReactNode;
};

export function UserProvider({ user, children }: UserProviderProps) {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  return children;
}
