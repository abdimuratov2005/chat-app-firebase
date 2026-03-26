import { PublicUser } from "@/entities/user/model/types";

export type FindUserStore = {
  users: PublicUser[];
  loading: boolean;
  notFound: boolean;
  query: string;

  setQuery: (query: string) => void;
  search: (query: string, currentUserUUID: string) => Promise<void>;
};
