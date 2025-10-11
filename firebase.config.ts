import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCydYeohrqJdQ-6aqSy7PShw8zhsTbkT2k",
  authDomain: "rn-recipes-23720.firebaseapp.com",
  projectId: "rn-recipes-23720",
  storageBucket: "rn-recipes-23720.firebasestorage.app",
  messagingSenderId: "250205837333",
  appId: "1:250205837333:web:b18aa5713cd90e1181961c",
  measurementId: "G-Z256FL5R4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };


// Initialize Firestore
export const db = getFirestore(app);