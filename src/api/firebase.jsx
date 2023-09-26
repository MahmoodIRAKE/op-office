import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth';

const app=initializeApp({
  apiKey: "AIzaSyDYtHpiO_Q1GkbDTIcItdCUTbWKicjy3uo",
  authDomain: "optimaloffice-bde1c.firebaseapp.com",
  projectId: "optimaloffice-bde1c",
  storageBucket: "optimaloffice-bde1c.appspot.com",
  messagingSenderId: "529269717376",
  appId: "1:529269717376:web:d17e345f99fa9a211a2965"
  });
  export const auth=getAuth();

  export default getFirestore(app);
  export const storage = getStorage(app);


 