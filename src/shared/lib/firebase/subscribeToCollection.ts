import { db } from "@/shared/config/firebase";
import { collection, onSnapshot, query, QueryConstraint } from "firebase/firestore";

export function subscribeToCollection<T>(
  path: string,
  callback: (data: T[]) => void,
  contraints: QueryConstraint[] = []
) {
  const ref = collection(db, path);
  const q = query(ref, ...contraints);

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as T[]

    callback(data)
  })
}