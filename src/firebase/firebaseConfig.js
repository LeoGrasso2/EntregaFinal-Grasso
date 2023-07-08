// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf9NkL5qnaCtpBr19VyTqyyUkLcf5P5Wk",
  authDomain: "pokestore-ee03c.firebaseapp.com",
  projectId: "pokestore-ee03c",
  storageBucket: "pokestore-ee03c.appspot.com",
  messagingSenderId: "571641109888",
  appId: "1:571641109888:web:a3967d0dbf45a89571f565",
  measurementId: "G-WDTCVQBTCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);