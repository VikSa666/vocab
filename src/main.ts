import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmKA7PfpPzIZi0qDPm9yjnQQISDPymGOc",
  authDomain: "vocab-2a260.firebaseapp.com",
  projectId: "vocab-2a260",
  storageBucket: "vocab-2a260.appspot.com",
  messagingSenderId: "430558672869",
  appId: "1:430558672869:web:d26941d1c0ace00fa8e10c",
  measurementId: "G-P1GDVEM22L",
};
firebase.initializeApp(firebaseConfig);
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount("#app");
