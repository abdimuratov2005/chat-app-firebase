export type User = {
  uuid: string;
  username: string;
  createdAt: string;
  loginCode: string;
  alreadyCreated: boolean;
}

export type PublicUser = Pick<User, "uuid" | "username">

export type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}