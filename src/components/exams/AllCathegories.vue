<template>
  <div class="all-words">
    <div v-for="item in myJson" :key="item.name">
      <!-- <h2>{{ item.name }}</h2> -->
      <div v-for="word in item.words" :key="word.russian">
        <p>{{ word.russian }}:{{ word.spanish }}</p>
        <input type="text" v-model="inputs[word.russian]" />
        <button @click="confirmAnswer(word.russian)">Check</button>
        <div>
          Your answer was {{ confirmedAnswer }} and the actual answer was
          {{ word.spanish }}. Therefore, you are {{ correct }}.
        </div>
        <button @click="i++">Next</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AllCathegories",
  data() {
    return {
      correct: false,
      answer: "",
      confirmedAnswer: "",
      inputs: {} as { [key: string]: string },
      i: 0,
    };
  },
  props: {
    list: Object,
  },
  methods: {
    readWord(event: any) {
      this.answer = event.target.value;
    },
    confirmAnswer(russian: string) {
      let input = this.inputs[russian];
      this.correct = input === russian;
    },
    loadWords() {
      let words = [] as { [key: string]: string }[];
      this.list?.forEach;
    },
  },
  mounted() {
    this.loadWords();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
