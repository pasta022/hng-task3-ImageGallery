// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Y1tQh-6Vw7JeKfoJz2u-1ZRK0zvLAR8",
  authDomain: "react-auth-4a94f.firebaseapp.com",
  projectId: "react-auth-4a94f",
  storageBucket: "react-auth-4a94f.appspot.com",
  messagingSenderId: "329038341801",
  appId: "1:329038341801:web:35c2e3c361a599e4db2bb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);