// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getDatabase } from "firebase/database"; // Sử dụng Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX31LhNzoFVB50yjJckNtqB66iF7ptI54",
    authDomain: "ghidim-2718d.firebaseapp.com",
    databaseURL: "https://ghidim-2718d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ghidim-2718d",
    storageBucket: "ghidim-2718d.firebasestorage.app",
    messagingSenderId: "802578627346",
    appId: "1:802578627346:web:65a1a7fded1081b81191cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = getDatabase(app);
