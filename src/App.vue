<template>
  <div id="app">
    <top-header></top-header>
    <h1>Hello World</h1>
    <div id="nav">
      <router-link to="/">home</router-link> |
      <router-link to="/login">login</router-link>|
      <router-link to="/secret">secret</router-link>|
      <router-link to="/register">register</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import json from "./assets/vocab.json";
// TODO: import AllWords from "./components/exams/AllCathegories.vue";
// TODO: import { foo } from "@/utils";
import { useVocabularyStore } from "@/stores/vocabulary";
// import { mapState } from "pinia";
import TopHeader from "./components/TopHeader.vue";
import Vue from "vue";
import { StoreState, defineStore } from "pinia";
import { supabase } from "./supabase/supabaseClient";

enum Modality {
  All,
  One,
  Selection,
}

export default defineComponent({
  setup() {
    // const wordList = useVocabularyStore();

    const isAuthenticated = supabase.auth
      .getSession()
      .then((session) => session.data.session);
    const signOut = supabase.auth.signOut();

    return { isAuthenticated, signOut };
  },
  data() {
    return {
      json: json,
      cathegoryList: [] as string[],
      modality: Modality.All,
      wordsList: {} as { [key: string]: string[] },
    };
  },
  //   mounted() {
  //     this.json.forEach((element) => {
  //       element.words.forEach(
  //         (word) => (this.wordList[word.russian] = word.spanish)
  //       );
  //     });
  //   },
  methods: {
    // cathegories() {
    //   this.json.forEach((element) => {
    //     this.cathegoryList.push(element.name);
    //   });
    // },
    matchesAll(): boolean {
      return this.modality === Modality.All;
    },
    // matchesOne(): boolean {
    //   return this.modality === Modality.One;
    // },
    // matchesSelection(): boolean {
    //   return this.modality === Modality.Selection;
    // },
    setAllCathegories() {
      this.modality = Modality.All;
    },
    // setOneCathegory() {
    //   this.modality = Modality.One;
    //   //   this.cathegorySelected = cathegory;
    // },
    // setSelectedCathegories() {
    //   this.modality = Modality.Selection;
    //   //   this.cathegoriesSelected = cathegories;
    // },
  },
  components: {
    // AllWords,
    TopHeader,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
./supabase/firebaseInit
