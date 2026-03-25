import { User } from "@/entities/user/model/types";

export type AuthStore = {
  username: string;
  loginCode: string;
  currentUser: User | null;
  setUsername: (username: string) => void;
  setLoginCode: (code: string) => void;
  setCurrentUser: (user: User | null) => void;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logOut: () => void;
}