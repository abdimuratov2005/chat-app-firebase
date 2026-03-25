import { User } from "@/entities/user/model/types";

export type FindUserStore = {
  users: User[];
  loading: boolean;
  notFound: boolean;
  query: string;

  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
};
