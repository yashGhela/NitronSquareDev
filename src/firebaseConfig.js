
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import 'firebase/functions';
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyBY9ZR5MAfMNsYXc9bCKAOn6YhDfz1KCXU",
    authDomain: "nstudy-dev.firebaseapp.com",
    databaseURL: "https://nstudy-dev-default-rtdb.firebaseio.com",
    projectId: "nstudy-dev",
    storageBucket: "nstudy-dev.appspot.com",
    messagingSenderId: "183760020266",
    appId: "1:183760020266:web:59d75899fdf96384973453",
    measurementId: "G-066B3JC33X"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const storage=getStorage(app)

  export {db, auth, provider,storage};