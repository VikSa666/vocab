import { defineStore } from "pinia";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";
import { VocabularyList, LanguageList, Language } from "../types";

interface UserData {
  email: string;
  userName: string;
  uid: string;
  isAuthenticated: boolean;
}

export { UserData };

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as firebase.User | null, // User object or null if not authenticated
    error: null as firebase.auth.Error | null, // Error object or null if no error
    userData: null as UserData | null, // User data fetched from Firestore
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // Returns true if user is authenticated, otherwise false
    getUserData: (state) => state.userData,
    // getLanguageList: (state) => {
    //   return (langName: Language) => {
    //     state.userData?.languages?.find((lang) => lang.language == langName);
    //   };
    // },
    // getAllLanguageLists: (state) => state.userData?.languages,
    // countListsOfLanguage: (state) => {
    //   return (langName: Language) => {
    //     state.userData?.languages?.find((lang) => lang.language == langName)
    //       ?.vocabularyLists.length;
    //   };
    // },
  },
  actions: {
    async signUp(
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      password: string
    ) {
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const createdUser = await userCredential;
        this.user = createdUser.user; // Set user object to the state
        this.error = null; // Reset error object

        const dataBase = db.firestore().collection("users").doc(this.user?.uid);

        await dataBase.set({
          firstName,
          lastName,
          username,
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

        await userDataBase.set({
          ...this.userData,
        });
      } catch (error) {
        this.error = error as firebase.auth.Error;
        throw error;
      }
    },

    // async createLang(language: Language) {
    //   const lang = {
    //     language,
    //     vocabularyLists: [],
    //   };
    //   this.userData?.languages?.push(lang);
    //   await this.updateUserData();
    // },

    // async removeLang(lang: LanguageList) {
    //   let index = -1;
    //   if (lang) {
    //     index = this.userData?.languages.indexOf(lang) ?? -1;
    //   }
    //   if (index !== -1) {
    //     this.userData?.languages.splice(index, 1);
    //   }
    //   await this.updateUserData();
    // },

    // async createList(lang: Language, listName: string) {
    //   const list = {
    //     name: listName,
    //     items: [],
    //   };
    //   this.userData?.languages
    //     ?.find((language) => language.language == lang)
    //     ?.vocabularyLists.push(list);
    //   await this.updateUserData();
    // },

    // async createWord(
    //   lang: Language,
    //   listName: string,
    //   word: string,
    //   translation: string
    // ) {
    //   const item = {
    //     word,
    //     translation,
    //   };
    //   this.userData?.languages
    //     ?.find((language) => language.language == lang)
    //     ?.vocabularyLists.find((list) => list.name == listName)
    //     ?.items.push(item);
    //   await this.updateUserData();
    // },
  },
});
