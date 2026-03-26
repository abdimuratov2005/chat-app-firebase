export type AuthStore = {
  username: string;
  loginCode: string;
  loading: boolean;

  setUsername: (username: string) => void;
  setLoginCode: (code: string) => void;

  login: () => Promise<void>;
  register: () => Promise<void>;
  logOut: () => void;
  goToChatPage: () => void;
}