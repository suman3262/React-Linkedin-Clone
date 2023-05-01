// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXQOrvjiddlur7Vkso-DfprlEiOuEwe_U",
  authDomain: "linked-clone-98fa9.firebaseapp.com",
  projectId: "linked-clone-98fa9",
  storageBucket: "linked-clone-98fa9.appspot.com",
  messagingSenderId: "757819453201",
  appId: "1:757819453201:web:21dfbadcdb8669c50d66b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const store=getFirestore(app);
const storage=getStorage(app);
export {app,auth,store,storage}