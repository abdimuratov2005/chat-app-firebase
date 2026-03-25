import { useUserStore } from "@/entities/user/model/store";
import { LOCAL_USER_UUID } from "@/shared/api/api";

export function handleLogOut() {
  useUserStore.getState().setCurrentUser(null);
  localStorage.removeItem(LOCAL_USER_UUID);
}