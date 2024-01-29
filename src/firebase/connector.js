// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr_Ekkb7Cso7gpIswBsA3wtzr7RpBajyI",
  authDomain: "feu-tagging.firebaseapp.com",
  projectId: "feu-tagging",
  storageBucket: "feu-tagging.appspot.com",
  messagingSenderId: "290020468548",
  appId: "1:290020468548:web:567f2f4b552a49d87fd911"
};

// Initialize Firebase
const firebaseInstance = initializeApp(firebaseConfig);

const fireDb = getFirestore(firebaseInstance);

export default fireDb;