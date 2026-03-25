import { addUser } from "@/entities/user/api/addUser";
import { useUserStore } from "@/entities/user/model/store";
import { LOCAL_USER_UUID } from "@/shared/api/api";

export async function handleRegister(username: Parameters<typeof addUser>[0]) {
  const user = await addUser(username);

  useUserStore.getState().setCurrentUser(user);
  localStorage.setItem(LOCAL_USER_UUID, user.uuid);

  return user;
}