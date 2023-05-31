import { defineStore } from "pinia";
import { LanguageList } from "../types";
import firebase from "firebase/compat/app";
import { UserData } from "./auth";

export const useVocabularyStore = defineStore("vocabulary", {
  state: () => ({
    language: null as LanguageList | null,
  }),
  getters: {
    getLists(state) {
      return this.language;
    },
  },

  actions: {
    createLanguageList(userData: UserData, language: string) {
      let languageRef;
      let unsubscribe;
      const db = firebase.firestore();
      if (userData.isAuthenticated) {
        languageRef = db.collection("languages");
        languageRef.add({
          uid: userData.uid,
          language: {
            language,
            vocabularyLists: [],
          },
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    },

    fetchData(userData: UserData) {
      let languageRef;
      let unsubscribe;
      const db = firebase.firestore();
      if (userData.isAuthenticated) {
        languageRef = db.collection("languages").doc(userData.uid);
      }
    },
  },
});
