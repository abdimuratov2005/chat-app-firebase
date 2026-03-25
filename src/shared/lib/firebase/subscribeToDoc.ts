import { db } from "@shared/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export function subscribeToDoc<T>(
  path: string,
  id: string,
  callback: (data: T | null) => void
){
  const ref = doc(db, path, id);
  
  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) return callback(null);

    callback({
      id: snapshot.id,
      ...snapshot.data()
    } as T);
  })
} 