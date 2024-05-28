import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsyX2epXIM-BQusb1KvgIqXRCgKpgSk1U",
  authDomain: "space-invaders-c5dee.firebaseapp.com",
  projectId: "space-invaders-c5dee",
  storageBucket: "space-invaders-c5dee.appspot.com",
  messagingSenderId: "939842426411",
  appId: "1:939842426411:web:4335207c8f9381f1197c6e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
