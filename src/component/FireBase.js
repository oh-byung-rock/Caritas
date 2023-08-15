// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg4EEnRQNyhWmALfFBkZujGBN9JzPXmN8",
  authDomain: "healthgem-pro.firebaseapp.com",
  projectId: "healthgem-pro",
  storageBucket: "healthgem-pro.appspot.com",
  messagingSenderId: "104497741323",
  appId: "1:104497741323:web:abb6d01740fd806eaf510e",
  measurementId: "G-P2EZ9B9LS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{app}