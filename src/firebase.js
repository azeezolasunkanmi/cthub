// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSm3tUIVA_xY6XzBkoBhouycJ_0XS2dkE",
  authDomain: "trade-demo-91e25.firebaseapp.com",
  projectId: "trade-demo-91e25",
  storageBucket: "trade-demo-91e25.appspot.com",
  messagingSenderId: "1028185862785",
  appId: "1:1028185862785:web:c0da28164ce5079613d380",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
