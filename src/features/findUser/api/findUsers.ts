import { USERS_LIST } from "@/shared/api/api";
import { db } from "@/shared/config/firebase";
import { collection, endAt, getDocs, orderBy, query, startAt } from "firebase/firestore";
import { User } from "@/entities/user/model/types";

export async function findUsers(prefix: string): Promise<User[]> {
  const usersCol = collection(db, USERS_LIST);

  const usernameQuery = query(
    usersCol,
    orderBy("username"),
    startAt(prefix),
    endAt(prefix + "\uf8ff")
  );
  const usernameSnapshot = await getDocs(usernameQuery);

  return usernameSnapshot.docs.map((doc) => doc.data() as User);
}
