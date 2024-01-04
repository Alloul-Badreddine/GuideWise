
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyCul3ig6IyHX-FDWOQ6xrsiGOhwkws7RwI",
  authDomain: "guidewise-df75e.firebaseapp.com",
  projectId: "guidewise-df75e",
  storageBucket: "guidewise-df75e.appspot.com",
  messagingSenderId: "26113342429",
  appId: "1:26113342429:web:6811a60fcba165083a1434",
  measurementId: "G-5P2XK1GFTN"
};


export const Firebase = initializeApp(firebaseConfig);
export const Authentication = getAuth(Firebase);
