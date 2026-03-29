export type AuthStore = {
  username: string;
  password: string;
  
  isLoading: boolean;
  isUsernameSetted: boolean;
  isPasswordSetted: boolean;

  setUsername: (username: string) => void;
  setPassword: (password: string) => void;

  onAuth: () => Promise<void>;
  logOut: () => void;
}