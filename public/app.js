import { auth, db, provider } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM elements
const emailForm = document.getElementById("emailForm");
const googleBtn = document.getElementById("googleBtn");
const signOutBtn = document.getElementById("signOutBtn");
const userLabel = document.getElementById("userLabel");
const authContainer = document.getElementById("auth-container");
const chatContainer = document.getElementById("chat");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messages");

// 🔹 Handle email/password login or signup
emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      // Auto create account if not found
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      alert(error.message);
    }
  }
});

// 🔹 Google sign-in
googleBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert(error.message);
  }
});

// 🔹 Sign out
signOutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// 🔹 Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    userLabel.textContent = `Signed in as ${user.email || user.displayName}`;
    authContainer.style.display = "none";
    chatContainer.style.display = "block";
    messageForm.style.display = "flex";
    signOutBtn.style.display = "inline-block";
    listenForMessages();
  } else {
    userLabel.textContent = "Not signed in";
    authContainer.style.display = "block";
    chatContainer.style.display = "none";
    messageForm.style.display = "none";
    signOutBtn.style.display = "none";
    messagesList.innerHTML = "";
  }
});

// 🔹 Send a message
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  try {
    await addDoc(collection(db, "messages"), {
      text,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email || auth.currentUser.displayName,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  } catch (error) {
    console.error("Error adding message: ", error);
  }
});

// 🔹 Listen for new messages in real-time
function listenForMessages() {
  const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
  onSnapshot(q, (snapshot) => {
    messagesList.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const li = document.createElement("li");
      li.textContent = `${msg.email}: ${msg.text}`;
      messagesList.appendChild(li);
    });
    // Auto scroll to latest message
    messagesList.scrollTop = messagesList.scrollHeight;
  });
}
