import { db } from "@/shared/config/firebase";
import { USER_UUID, USERS_LIST } from "@/shared/api/api";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { User } from "../model/types";

export async function auth(username: string, password: string): Promise<User> {
  const usersCol = collection(db, USERS_LIST);

  const usernameQuery = query(usersCol, where("username", "==", username));
  const usernameSnapshot = await getDocs(usernameQuery);

  if (!usernameSnapshot.empty) {
    const oldUserSnapshot = usernameSnapshot.docs[0];
    const oldUser = oldUserSnapshot.data() as User;

    if (oldUser.password !== password) {
      return {
        error: "inCorrectPassword",
      } as User;
    }

    return {
      ...oldUser,
      id: oldUserSnapshot.id,
    } as User;
  }

  const newUser = {
    createdAt: serverTimestamp(),
    username,
    password,
  } as User;

  const docRef = await doc(usersCol);

  await setDoc(docRef, { ...newUser, id: docRef.id } as User);

  return newUser;
}
