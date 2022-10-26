import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlofI8_wpZFPPps1e9Rv3ILgJNkM2CJ5M",
    authDomain: "mytodoapp-811bc.firebaseapp.com",
    projectId: "mytodoapp-811bc",
    storageBucket: "mytodoapp-811bc.appspot.com",
    messagingSenderId: "596055302690",
    appId: "1:596055302690:web:ba2073ec82795e0391207b",
    measurementId: "G-7HLQS77E9D"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db };