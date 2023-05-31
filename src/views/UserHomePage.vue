<template>
  <div>
    <h1>Welcome to your LearnVocab User Home Page</h1>
  </div>
  <div v-if="isAuthenticated && userData !== null">
    <div class="lists-top-header">
      <h2>Your languages</h2>
      <div class="create-list-option">
        <button @click="createListDropdownActive = !createListDropdownActive">
          Create
        </button>
        <div
          :class="[
            createListDropdownActive
              ? 'create-list-dropdown-active'
              : 'create-list-dropdown-inactive',
          ]"
        >
          <form @submit.prevent="addList">
            <span>Name: </span
            ><input type="text" v-model="name" placeholder="name of the list" />
            <button type="button" @click.prevent="inactiveDropdown">
              Cancel
            </button>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
      <button @click="editSelected">Edit selected</button>
      <button @click="deleteSelection">Delete Selection</button>
    </div>
    <ul>
      <li v-for="list in lists?.vocabularyLists" :key="list.name">
        <vocabulary-list-item
          :list="list"
          @click="modifySelectedList(list)"
          :class="[
            selected.includes(list)
              ? 'vocabulary-list-item-active'
              : 'vocabulary-list-item',
          ]"
        />
      </li>
    </ul>
    <div class="lang-card-wrap">
      <div class="container">
        <h3>View your language lists here</h3>
        <div class="lang-cards">
          <lang-card
            v-for="(card, index) in sampleLangCards"
            :key="index"
            :lang="card.lang"
            :listNumber="card.lists"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useVocabularyStore } from "../stores/vocabulary";
import VocabularyListItem from "../components/VocabularyListItem.vue";
import { VocabularyList, Language } from "../types";
import LangCard from "../components/LangCard.vue";

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const userData = authStore.getUserData;
const selected = ref<Array<VocabularyList>>([]);

const vocabularyStore = useVocabularyStore();
const lists = vocabularyStore.getLists;

const name = ref("");

// DELETEEEEE
const sampleLangCards = [
  {
    lang: Language.Russian,
    lists: 18,
  },
  {
    lang: Language.Russian,
    lists: 18,
  },
  {
    lang: Language.Russian,
    lists: 18,
  },
  {
    lang: Language.Russian,
    lists: 18,
  },
  {
    lang: Language.Russian,
    lists: 18,
  },
  {
    lang: Language.Russian,
    lists: 18,
  },
  {
    lang: Language.Russian,
    lists: 18,
  },
];

const createListDropdownActive = ref(false);

const addList = () => {
  vocabularyStore.createLanguageList(userData, name.value);

  // Hide the dropdown when the "create" button is pressed
  createListDropdownActive.value = false;
};

const modifySelectedList = (list: VocabularyList) => {
  const alreadySelected = selected.value.find(
    (someList) => someList.name == list.name
  );
  console.log(alreadySelected);
  if (alreadySelected) {
    const index = selected.value.indexOf(alreadySelected);
    console.log(index);
    selected.value.splice(index, 1);
  } else {
    selected.value.push(list);
    console.log(list);
    console.log(selected.value);
    console.log(selected.value.includes(list));
  }
};

const editSelected = () => {
  console.log("todo");
};

const deleteSelection = () => {
  selected.value.forEach((list) => {
    // authStore.removeList(list);
    console.log("todo");
  });
};

const inactiveDropdown = () => {
  createListDropdownActive.value = false;
};
</script>
<style lang="scss" scoped>
@import "../styles.scss";
.vocabulary-list-item {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.vocabulary-list-item:hover {
  background-color: aliceblue;
}

.vocabulary-list-item-active {
  border: 2px black;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  background-color: azure;
}

.create-list-option {
  display: flex;
  flex-direction: column;
}

.vocabulary-list-item-active:hover {
  background-color: aliceblue;
}

.create-list-dropdown-inactive {
  display: none;
  position: absolute;
  z-index: 1;
}

.create-list-dropdown-active {
  display: flex;
  flex-direction: column;
}

.lang-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
