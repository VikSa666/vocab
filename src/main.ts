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

const pinia = createPinia();
let app: any;
// Load app but first get the user auth
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    console.log(user);
    app = createApp(App);
    app.use(router);
    app.use(pinia);
    app.config.globalProperties.$axios = axios;
    app.mount("#app");
  }
});
