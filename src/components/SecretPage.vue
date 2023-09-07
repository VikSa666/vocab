<template>
  <div>
    <h1>Welcome to secret page</h1>
    <!-- <p>Logged in {{ isAuthenticated }}</p> -->
  </div>
  <!-- </div>
  <div v-if="isAuthenticated && userData !== null">
    <h2>Welcome, {{ userData?.userName }}</h2>
    <p>Email: {{ userData?.email }}</p>
    <form @submit.prevent="addList">
      <span>Name: </span
      ><input type="text" v-model="name" placeholder="name of the list" />
      <button type="submit">Create</button>
    </form>
    <h2>Lists</h2>
    <ul>
      <li v-for="list in lists" :key="list.name">
        <VocabularyList :list="list" />
      </li>
    </ul>
  </div>
  <div v-else>Loading...</div> -->
</template>
<script lang="ts" setup>
import { ref } from "vue";
// import { useAuthStore } from "../stores/auth";
import VocabularyList from "./VocabularyList.vue";

// const authStore = useAuthStore();
// const isAuthenticated = authStore.isAuthenticated;
// const userData = authStore.getUserData;

// const lists = authStore.getAllVocabularyLists;

// const name = ref("");

// const addList = () => {
//   authStore.createList(name.value);
// };
//
</script>
<style lang="scss"></style>
