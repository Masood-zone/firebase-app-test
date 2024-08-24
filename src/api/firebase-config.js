import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FIREBASE_APIKEY,
  FIREBASE_APPID,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_MEASUREMENTID,
  FIREBASE_MESSAGINGSENDERID,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
} from "./root";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
