import { defineStore } from "pinia";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

interface UserData {
  email: string;
  userName: string;
  vocabularyLists: Array<VocabularyList>;
}

interface VocabularyList {
  name: string;
  items: Array<VocabularyItem>;
}

interface VocabularyItem {
  word: string;
  translation: string;
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
    getVocabularyList: (state) => {
      return (listName: string) => {
        state.userData?.vocabularyLists?.find((list) => list.name == listName);
      };
    },
    getAllVocabularyLists: (state) => state.userData?.vocabularyLists,
  },
  actions: {
    async signUp(name: string, email: string, password: string) {
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const createdUser = await userCredential;
        this.user = createdUser.user; // Set user object to the state
        this.error = null; // Reset error object

        console.log(this.user?.uid);
        const dataBase = db.firestore().collection("users").doc(this.user?.uid);
        await dataBase;

        await dataBase.set({
          userName: name,
          email,
          vocabularyLists: [] as Array<VocabularyList>,
        });
        await this.fetchUserData();
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
        console.log(this.userData);
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
        console.log("user not logged in");
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

    async updateUserData() {
      if (!this.user) {
        console.log("user not logged in");
        return;
      }

      try {
        const userDataBase = db
          .firestore()
          .collection("users")
          .doc(this.user?.uid);

        await userDataBase;
        if (!userDataBase) console.error("asdfasdfasdf");
        console.log(this.userData?.vocabularyLists);

        await userDataBase.set({
          vocabularyLists: this.userData?.vocabularyLists,
        });
      } catch (error) {
        this.error = error as firebase.auth.Error;
        throw error;
      }
    },

    async createList(name: string) {
      const vocabularyList = {
        name,
        items: [],
      };
      this.userData?.vocabularyLists?.push(vocabularyList);
      await this.updateUserData();
    },

    async createWord(listName: string, word: string, translation: string) {
      this.userData?.vocabularyLists
        ?.find((vlist) => vlist.name == listName)
        ?.items.push({ word, translation });
      await this.updateUserData();
    },
  },
});
