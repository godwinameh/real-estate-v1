// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4CD83f9QJCEC31oIfose1V15DcBtWJS4",
    authDomain: "real-estate-v1-810a2.firebaseapp.com",
    projectId: "real-estate-v1-810a2",
    storageBucket: "real-estate-v1-810a2.appspot.com",
    messagingSenderId: "489477407940",
    appId: "1:489477407940:web:519ac133505632db1d3591",
};

// Initialize Firebase (make sure this line is active)
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
