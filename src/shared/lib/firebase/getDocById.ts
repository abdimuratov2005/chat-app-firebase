import { db } from "@/shared/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getDocByID<T>(path: string, id: string): Promise<T | null> {
  const ref = doc(db, path, id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data()
  } as T;
}