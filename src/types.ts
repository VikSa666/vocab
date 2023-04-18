interface VocabularyList {
  name: string;
  items: Array<VocabularyItem>;
}

interface VocabularyItem {
  word: string;
  translation: string;
}

export { VocabularyItem, VocabularyList };
