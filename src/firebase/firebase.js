// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA41MeHSVBuvYPLV7r0cvjHRXVBA6WkYpg",
    authDomain: "degreeauditproject.firebaseapp.com",
    projectId: "degreeauditproject",
    storageBucket: "degreeauditproject.appspot.com",
    messagingSenderId: "1747207834",
    appId: "1:1747207834:web:dba479911c6365e6dd4123",
    measurementId: "G-1KCZ1WTPXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
