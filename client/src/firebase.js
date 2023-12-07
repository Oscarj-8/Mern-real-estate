// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-9f30c.firebaseapp.com",
  projectId: "mern-real-estate-9f30c",
  storageBucket: "mern-real-estate-9f30c.appspot.com",
  messagingSenderId: "162858343841",
  appId: "1:162858343841:web:4a2a97eab0394b87e57fe0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
