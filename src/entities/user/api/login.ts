import { USERS_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "../model/types";

export async function login(username: string, code: string): Promise<User> {
  if (!username) {
    throw new Error("Username is required!")
  }
  if (!code) {
    throw new Error("Code is required!")
  }

  const usersCol = collection(db, USERS_LIST);

  const usernameQuery = query(usersCol, where("username", "==", username));
  const usernameSnapshot = await getDocs(usernameQuery);

  if (usernameSnapshot.empty) throw new Error("Username not found!");

  const userDocData = usernameSnapshot.docs[0].data() as User;

  if (userDocData.loginCode != code) throw new Error("Incorrect code!");

  return {
    ...userDocData
  }
}