import { defineStore } from "pinia";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

interface UserData {
  email: string;
  userName: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as firebase.User | null, // User object or null if not authenticated
    error: null as firebase.auth.Error | null, // Error object or null if no error
    userData: null as UserData | null, // User data fetched from Firestore
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // Returns true if user is authenticated, otherwise false
    getUserData: (state) => state.userData,
  },
  actions: {
    async signUp(email: string, password: string) {
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        this.user = userCredential.user; // Set user object to the state
        await this.fetchUserData();
        this.error = null; // Reset error object
        const dataBase = db.firestore().collection("users").doc(this.user?.uid);
        await dataBase.set({
          userName: this.userData?.userName,
          email: this.userData?.email,
        });
      } catch (error) {
        this.error = error as firebase.auth.Error; // Set error object to the state
        throw error; // Rethrow the error for handling in the calling component
      }
    },
    async signIn(email: string, password: string) {
      try {
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        this.user = userCredential.user; // Set user object to the state
        await this.fetchUserData();
        this.error = null; // Reset error object
      } catch (error) {
        this.error = error as firebase.auth.Error; // Set error object to the state
        throw error; // Rethrow the error for handling in the calling component
      }
    },
    async signOut() {
      try {
        await firebase.auth().signOut();
        this.user = null; // Reset user object
        this.userData = null; // Reset user data
        this.error = null; // Reset error object
      } catch (error) {
        this.error = error as firebase.auth.Error; // Set error object to the state
        throw error; // Rethrow the error for handling in the calling component
      }
    },
    async fetchUserData() {
      if (!this.user) {
        return; // Return early if user is not authenticated
      }

      try {
        const userId = this.user.uid;
        const db = firebase.firestore();
        const userDataRef = db.collection("users").doc(userId);
        const userDataSnapshot = await userDataRef.get();
        console.log(userId);
        this.userData = userDataSnapshot.data() as UserData; // Set user data to the state
      } catch (error) {
        this.error = error as firebase.auth.Error;
        throw error;
      }
    },
  },
});
