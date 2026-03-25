import { create } from "zustand";
import { FindUserStore } from "./types";
import { findUsers } from "../api/findUsers";

export const useFindUserStore = create<FindUserStore>((set) => ({
  users: [],
  loading: false,
  notFound: false,
  query: "",

  setQuery: (query) => set({ query: query }),

  search: async (query) => {
    const result = await findUsers(query);

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