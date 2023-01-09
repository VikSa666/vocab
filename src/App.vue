<template>
  <div>
    <h1>Hello World</h1>
    <div class="cathegory-picker">
      <button @click="setAllCathegories">All Cathegories</button>
      <button @click="setOneCathegory">One Cathegories</button>
      <button @click="setSelectedCathegories">Selected Cathegories</button>
    </div>
    <AllWords :list="wordsList" v-if="matchesAll()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import json from "./assets/vocab.json";
import AllWords from "./components/exams/AllCathegories.vue";
import { foo } from "@/utils";

enum Modality {
  All,
  One,
  Selection,
}

export default defineComponent({
  data() {
    return {
      json: json,
      cathegoryList: [] as string[],
      modality: Modality.All,
      cathegorySelected: "" as string,
      cathegoriesSelected: [] as string[],
      wordsList: [] as { russian: string; spanish: string[] }[],
    };
  },
  methods: {
    cathegories() {
      this.json.forEach((element) => {
        this.cathegoryList.push(element.name);
      });
    },
    matchesAll(): boolean {
      return this.modality === Modality.All;
    },
    matchesOne(): boolean {
      return this.modality === Modality.One;
    },
    matchesSelection(): boolean {
      return this.modality === Modality.Selection;
    },
    setAllCathegories() {
      this.modality = Modality.All;
    },
    setOneCathegory() {
      this.modality = Modality.One;
      //   this.cathegorySelected = cathegory;
    },
    setSelectedCathegories() {
      this.modality = Modality.Selection;
      //   this.cathegoriesSelected = cathegories;
    },
    loadAllWords() {
      this.json.forEach((element) => {
        element.words.forEach((word) => this.wordsList.push(word));
      });
    },
  },
  components: {
    AllWords,
  },
});
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
