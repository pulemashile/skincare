// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKxFhD8P3v6ipO9rgfo6eyfMgtDH-LXag",
  authDomain: "skin-751d2.firebaseapp.com",
  projectId: "skin-751d2",
  storageBucket: "skin-751d2.firebasestorage.app",
  messagingSenderId: "370426503364",
  appId: "1:370426503364:web:8d9bb87748a050c87be991",
  measurementId: "G-V257G8GQVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);