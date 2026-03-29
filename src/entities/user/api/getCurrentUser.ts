
import { USER_UUID, USERS_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { User } from "../model/types";
import { convertTimeStamp } from "@/shared/lib/utils";

export async function getCurrentUser(): Promise<User | null> {
  const userUUID = (await cookies()).get(USER_UUID)?.value;

  if (!userUUID) return null;

  const usersDoc = doc(db, USERS_LIST, userUUID);
  const currentUserSnapshot = await getDoc(usersDoc);

  if (currentUserSnapshot.exists()) {
    const user = {
      ...currentUserSnapshot.data(),
    } as User;
    
    user.createdAt = convertTimeStamp(
      // @ts-ignore
      user.createdAt.seconds,
      {}
    )
    return user;
  }

  return null;
}
