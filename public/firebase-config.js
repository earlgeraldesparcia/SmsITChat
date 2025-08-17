import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwMiX7LUW_yIcriCvSkFWHog-aAO3Hssw",
  authDomain: "smsitchat.firebaseapp.com",
  databaseURL: "https://smsitchat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smsitchat",
  storageBucket: "smsitchat.appspot.com",
  messagingSenderId: "426807364618",
  appId: "1:426807364618:web:751fdc0875bb7a4805a3f3",
  measurementId: "G-XQGJ46SMH9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
