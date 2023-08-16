
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKDVnCFCapQ28Ut7S3ZXRKFcUBrAxMCN0",
  authDomain: "uy-supply.firebaseapp.com",
  projectId: "uy-supply",
  storageBucket: "uy-supply.appspot.com",
  messagingSenderId: "526528053576",
  appId: "1:526528053576:web:570c41da11e978ca52f37d",
  measurementId: "G-15FK62FVEL"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth , db , storage };