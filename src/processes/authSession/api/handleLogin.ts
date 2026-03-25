import { loginWithCode } from "@/entities/user/api/loginWithCode";
import { useUserStore } from "@/entities/user/model/store";
import { LOCAL_USER_UUID } from "@/shared/api/api";

export async function handleLogin(
  username: Parameters<typeof loginWithCode>[0],
  code: Parameters<typeof loginWithCode>[1],
) {
  const user = await loginWithCode(username, code);

  useUserStore.getState().setCurrentUser(user);
  localStorage.setItem(LOCAL_USER_UUID, user.uuid);

  return user;
}
