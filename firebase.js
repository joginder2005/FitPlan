// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAW03J_4UUeD0wnF_8flDZVt71f8SBrZoc",
  authDomain: "fitplan-ai-5774a.firebaseapp.com",
  projectId: "fitplan-ai-5774a",
  storageBucket: "fitplan-ai-5774a.appspot.com",
  messagingSenderId: "948030066446",
  appId: "1:948030066446:web:6ea8691226b93f701d515f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
