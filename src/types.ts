interface VocabularyList {
  name: string;
  items: Array<VocabularyItem>;
}

interface VocabularyItem {
  word: string;
  translation: string;
}

interface LanguageList {
  language: Language;
  vocabularyLists: Array<VocabularyList>;
}

enum Language {
  English = "English",
  German = "German",
  Russian = "Russian",
  French = "French",
  Spanish = "Spanish",
  Catalan = "Catalan",
  Italian = "Italian",
}

Language.toString = function (): string {
  return String(this.valueOf()).toLocaleLowerCase();
};

export { VocabularyItem, VocabularyList, LanguageList, Language };
