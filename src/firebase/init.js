// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpgx5h4S8xJltAyTbZdEUogYUt9yiK_X4",
  authDomain: "week7-haoyu-wang.firebaseapp.com",
  projectId: "week7-haoyu-wang",
  storageBucket: "week7-haoyu-wang.firebasestorage.app",
  messagingSenderId: "994307617124",
  appId: "1:994307617124:web:1b43047fa5a314434eca71"
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore()

export default db