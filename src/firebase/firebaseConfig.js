import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyD77vfAu1kBoFFgavfDxBjkkj9xEx24E10",
  authDomain: "terrunocolombiano-60fec.firebaseapp.com",
  projectId: "terrunocolombiano-60fec",
  storageBucket: "terrunocolombiano-60fec.appspot.com",
  messagingSenderId: "577528921707",
  appId: "1:577528921707:web:dddfe1a265569fa906fb2e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const facebook = new FacebookAuthProvider();
export const google = new GoogleAuthProvider();
