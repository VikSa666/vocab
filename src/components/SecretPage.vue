<template>
  <div>
    <h1>Welcome to secret page</h1>
    <p>Logged in {{ session }}</p>
  </div>
  <div v-if="session && userData !== null">
    <h2>Welcome, {{ userData?.id }}</h2>
    <p>Email: {{ userData?.email }}</p>
    <!-- <form @submit.prevent="addList">
      <span>Name: </span
      ><input type="text" v-model="name" placeholder="name of the list" />
      <button type="submit">Create</button>
    </form> -->
    <!-- <h2>Lists</h2>
    <ul>
      <li v-for="list in lists" :key="list.name">
        <VocabularyList :list="list" />
      </li>
    </ul> -->
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
// import VocabularyList from "./VocabularyList.vue";
import { supabase } from "../supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";

const session = ref<Session | null>(null);

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});

const userData = session.value?.user;

// const lists = supabase.

// authStore.getAllVocabularyLists;

// const name = ref("");

// const addList = () => {
//   authStore.createList(name.value);
// };
</script>
<style lang="scss"></style>
