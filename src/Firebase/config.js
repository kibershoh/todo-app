import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyAWrnZfIhad3HZCJQp43sIPj1Z9QQOYIdQ",
  authDomain: "note-web-2698b.firebaseapp.com",
  projectId: "note-web-2698b",
  storageBucket: "note-web-2698b.appspot.com",
  messagingSenderId: "1042190030878",
  appId: "1:1042190030878:web:ee48a7baa41daa184cb60f"
};
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export default app;