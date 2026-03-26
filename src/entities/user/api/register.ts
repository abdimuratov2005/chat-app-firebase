import { db } from "@/shared/config/firebase";
import { USERS_LIST } from "@/shared/api/api";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { User } from "../model/types";

function generateLoginCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function register(username: string): Promise<User> {
  const usersCol = collection(db, USERS_LIST);

  const usernameQuery = query(usersCol, where("username", "==", username));
  const usernameSnapshot = await getDocs(usernameQuery);

  if (!usernameSnapshot.empty) {
    const oldUser = {
      ...usernameSnapshot.docs[0].data(),
      alreadyCreated: true,
    } as User;
    
    return oldUser
  }

  const uuid = crypto.randomUUID();
  const loginCode = generateLoginCode();

  const newUser: User = {
    uuid,
    username,
    loginCode,
    alreadyCreated: false,
    createdAt: new Date().toISOString(),
  };

  const ref = doc(db, USERS_LIST, uuid);

  await setDoc(ref, newUser);

  return newUser;
}
