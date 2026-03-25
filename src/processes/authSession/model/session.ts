import { useUserStore } from "@/entities/user/model/store";
import { User } from "@/entities/user/model/types";
import { LOCAL_USER_UUID, USERS_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function restoreSession() {
  const uuid = localStorage.getItem(LOCAL_USER_UUID);
  if (!uuid) return;

  const snapshot = await getDoc(doc(db, USERS_LIST, uuid));
  if (!snapshot.exists()) return;

  useUserStore.getState().setCurrentUser({
    uuid,
    ...snapshot.data()
  } as User)
}