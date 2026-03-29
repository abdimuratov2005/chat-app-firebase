import { FieldValue } from "firebase/firestore";

export type UserErrorTypes = "inCorrectPassword";

export type User = {
  id: string;
  username: string;
  createdAt: FieldValue | string;
  password: string;
  error?: UserErrorTypes;
};

export type PublicUser = Pick<User, "id" | "username">;

export type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};
