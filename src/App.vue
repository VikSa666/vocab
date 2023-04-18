<template>
  <div id="app">
    <div id="nav">
      <top-header></top-header>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import json from "./assets/vocab.json";
// TODO: import AllWords from "./components/exams/AllCathegories.vue";
// TODO: import { foo } from "@/utils";
// import { mapState } from "pinia";
import TopHeader from "./components/TopHeader.vue";
import "firebase/compat/auth";
import { useAuthStore } from "./stores/auth";

enum Modality {
  All,
  One,
  Selection,
}

export default defineComponent({
  setup() {
    // const wordList = useVocabularyStore();

    const authStore = useAuthStore();

    const isAuthenticated = authStore.isAuthenticated;
    const signOut = authStore.signOut;

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
@import "./styles.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
