import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqDj80HTx50mCUkSs4ea9raMFDspNzwj4",
  authDomain: "dashboard-c4de3.firebaseapp.com",
  projectId: "dashboard-c4de3",
  storageBucket: "dashboard-c4de3.appspot.com",
  messagingSenderId: "615964566392",
  appId: "1:615964566392:web:b6fc2bb6bf8d0bbc141e8d",
  measurementId: "G-12MPMZTHQP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); // autoryzacja przez dowolny email
export const googleProvider = new GoogleAuthProvider(); // autoryzacja przez gmail'a

export const db = getFirestore(app); // baza danych
export const storage = getStorage(app);
