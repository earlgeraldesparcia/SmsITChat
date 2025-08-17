// public/firebase-config.js
// This file exports nothing — it initializes Firebase via the modular SDK imports used by app.js.
// IMPORTANT: Replace the values in firebaseConfig below with the ones from your Firebase console.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* ===== Replace this config with YOUR Firebase project's config =====
   Get these values from Firebase Console -> Project Settings -> Your apps -> Firebase SDK snippet
*/
const firebaseConfig = {
  apiKey: "AIzaSyCwMiX7LUW_yIcriCvSkFWHog-aAO3Hssw",
  authDomain: "smsitchat.firebaseapp.com",
  databaseURL: "https://smsitchat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smsitchat",
  storageBucket: "smsitchat.firebasestorage.app",
  messagingSenderId: "426807364618",
  appId: "1:426807364618:web:751fdc0875bb7a4805a3f3",
  measurementId: "G-XQGJ46SMH9"
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Export commonly used services for app.js */
export const auth = getAuth(app);
export const db = getFirestore(app);

/* Optionally auto sign-in anonymously on load */
signInAnonymously(auth).catch((err) => {
  console.error("Anonymous sign-in failed:", err);
});
