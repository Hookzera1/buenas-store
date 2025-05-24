// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBarOm1Reg7J8Mvgp5jvDQQpEVfVf9SM4k",
  authDomain: "buenas-store.firebaseapp.com",
  projectId: "buenas-store",
  storageBucket: "buenas-store.appspot.com", // ✅ CORRIGIDO AQUI
  messagingSenderId: "104277551109",
  appId: "1:104277551109:web:8fce1bc556491bf10dd46c",
  measurementId: "G-JLCV8MZNSY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
