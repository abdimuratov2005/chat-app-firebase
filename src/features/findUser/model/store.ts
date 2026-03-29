import { create } from "zustand";
import { FindUserStore } from "./types";
import { findUsers } from "../api/findUsers";

export const useFindUserStore = create<FindUserStore>((set) => ({
  users: [],
  loading: false,
  notFound: false,
  query: "",

  setQuery: (query) => set({ query: query }),

  search: async (query, currentUserUUID) => {
    const dataFindedUsers = await findUsers(query);

    const result = dataFindedUsers.filter((user) => {
      const userUUID = typeof user === 'string' ? user : user.id;
      return userUUID !== currentUserUUID
    })

    if (!result.length || !query) return set({
      users: [],
      loading: false,
      notFound: Boolean(query.length) && true
    })
    
    set({ loading: true, notFound: false });

    set({
      users: result,
      loading: false
    })
  }
}))