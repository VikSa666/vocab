import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmKA7PfpPzIZi0qDPm9yjnQQISDPymGOc",
  authDomain: "vocab-2a260.firebaseapp.com",
  projectId: "vocab-2a260",
  storageBucket: "vocab-2a260.appspot.com",
  messagingSenderId: "430558672869",
  appId: "1:430558672869:web:d26941d1c0ace00fa8e10c",
  measurementId: "G-P1GDVEM22L",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp;
