// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, child, update, remove } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configurations
const firebaseConfig = {
    apiKey: "AIzaSyBp5RbdOowAzNy8du0_eDwVaE9wgC_0Wag",
    authDomain: "pti-project-2.firebaseapp.com",
    projectId: "pti-project-2",
    storageBucket: "pti-project-2.appspot.com",
    messagingSenderId: "630895776045",
    appId: "1:630895776045:web:2ca4b7ab89675f471e03a4",
    measurementId: "G-XWFQPV9ZM2"
  };

// Initialize Firebase apps
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export all instances
export{ 
  app,
  getDatabase,
  analytics,
  auth,
  database, 
  db,
  storage,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  ref,
  set,
  push,
  onValue,
  child,
  update,
  remove
};