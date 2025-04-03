// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsH00hJ8tCQ0GyWreukQ7HsRrn5YoGr_s",
    authDomain: "goride-12710.firebaseapp.com",
    projectId: "goride-12710",
    storageBucket: "goride-12710.firebasestorage.app",
    messagingSenderId: "411990507291",
    appId: "1:411990507291:web:bd095d4e37ed10eecc9dbe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);