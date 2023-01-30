// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWBuoIvm7g4sOBnoJx6lDECYp5DesymTQ",
  authDomain: "group-asia-task.firebaseapp.com",
  projectId: "group-asia-task",
  storageBucket: "group-asia-task.appspot.com",
  messagingSenderId: "239221971556",
  appId: "1:239221971556:web:3d2cb7beb85694f5c9dd71",
  measurementId: "G-KFZW9H5H9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app ; 
