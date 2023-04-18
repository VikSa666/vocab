<template>
  <div>
    <h1>Welcome to secret page</h1>
    <p>Logged in {{ isAuthenticated }}</p>
  </div>
  <div v-if="isAuthenticated && userData !== null">
    <h2>Welcome, {{ userData?.userName }}</h2>
    <p>Email: {{ userData?.email }}</p>

    <div class="lists-top-header">
      <h2>Your lists</h2>
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
      <li v-for="list in lists" :key="list.name">
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
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import VocabularyListItem from "../components/VocabularyListItem.vue";
import { VocabularyList } from "../types";

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const userData = authStore.getUserData;
const selected = ref<Array<VocabularyList>>([]);

const lists = authStore.getAllVocabularyLists;

const name = ref("");

const createListDropdownActive = ref(false);

const addList = () => {
  authStore.createList(name.value);

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
    authStore.removeList(list);
  });
};

const inactiveDropdown = () => {
  createListDropdownActive.value = false;
};
</script>
<style lang="scss" scoped>
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
</style>
