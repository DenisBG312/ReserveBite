import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJaAUH1Adl8c7K-i1jJhfDYLUjtqhM-9s",
  authDomain: "reservebite-7d336.firebaseapp.com",
  projectId: "reservebite-7d336",
  storageBucket: "reservebite-7d336.appspot.com",
  messagingSenderId: "788296387113",
  appId: "1:788296387113:web:67d753f777c2808e27ea38",
  measurementId: "G-R8Z7N392KZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };
