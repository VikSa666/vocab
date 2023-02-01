import { defineStore } from "pinia";

export const useVocabularyStore = defineStore("vocabulary", {
  state: () => {
    return { wordList: {} as { [key: string]: string[] } };
  },
  getters: {
    keys(state): string[] {
      return Object.keys(state.wordList);
    },
  },
});
