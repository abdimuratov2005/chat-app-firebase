import { db } from "@/shared/config/firebase";
import { collection, getDocs, query, QueryConstraint } from "firebase/firestore";

export async function getCollection<T>(
  path: string,
  contraints: QueryConstraint[] = []
): Promise<T[]>{
  const ref = collection(db, path);
  const q = query(ref, ...contraints);
  
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as T[];
}