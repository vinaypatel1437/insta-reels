// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from 'firebase/compat/app'; 
// import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKRV71z46cBs71a4PlnCCzf0rQhUkTvac",
  authDomain: "reels-insta-765b0.firebaseapp.com",
  projectId: "reels-insta-765b0",
  storageBucket: "reels-insta-765b0.appspot.com",
  messagingSenderId: "578095238030",
  appId: "1:578095238030:web:b59615f40ff1d70a4ff2df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const fstore = firestore;
export const database = {
  users: collection(firestore, "users"),
  posts: collection(firestore, "posts"),
  comments: collection(firestore, "comments")
}

export const storage = getStorage(app);
