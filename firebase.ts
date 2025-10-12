// src/firebase.ts (Includes persistence fix for React Native)
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore ,collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCydYeohrqJdQ-6aqSy7PShw8zhsTbkT2k",
  authDomain: "rn-recipes-23720.firebaseapp.com",
  projectId: "rn-recipes-23720",
  storageBucket: "rn-recipes-23720.firebasestorage.app",
  messagingSenderId: "250205837333",
  appId: "1:250205837333:web:b18aa5713cd90e1181961c",
  measurementId: "G-Z256FL5R4V",
};

const app = initializeApp(firebaseConfig);
 export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

export const db = getFirestore(app);
export const profileCollection = collection(db,"profile");
export const favoriteCollection=collection(db,"favorites");