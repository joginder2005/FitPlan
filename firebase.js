// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW03J_4UUeD0wnF_8flDZVt71f8SBrZoc",
  authDomain: "fitplan-ai-5774a.firebaseapp.com",
  projectId: "fitplan-ai-5774a",
  storageBucket: "fitplan-ai-5774a.firebasestorage.app",
  messagingSenderId: "948030066446",
  appId: "1:948030066446:web:6ea8691226b93f701d515f",
  measurementId: "G-DJ7GG0NFDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);