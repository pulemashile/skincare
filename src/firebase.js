import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const db = getFirestore(app);
export default db;
