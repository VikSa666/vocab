<!-- <template>
  <div class="all-words">
    <p>{{ russianWord }}:{{ wordTranslation }}</p>
    <input type="text" v-model="answer" />
    <button @click="confirmAnswer()">Check</button>
    <div>
      Your answer was {{ answer }} and the actual answer was
      {{ wordTranslation }}. Therefore, you are {{ correct }}.
    </div>
    <button @click="nextWord">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useVocabularyStore } from "@/stores/vocabulary";
import { mapState } from "pinia";

export default defineComponent({
  name: "AllCathegories",
  setup() {
    const wordList = useVocabularyStore();
    return wordList;
  },
  mounted() {
    for (let key in this.wordList) {
      this.russianWords.push(key);
    }
  },
  data() {
    return {
      russianWords: [] as string[],
      russianWord: "",
      wordTranslation: [] as string[],
      correct: false,
      answer: "",
      id: 0,
    };
  },
  props: {},
  methods: {
    readWord(event: any) {
      this.answer = event.target.value;
    },
    confirmAnswer() {
      let input = this.wordList[this.russianWord];
      this.correct = input === this.wordTranslation;
    },
    nextWord() {
      this.russianWord = this.russianWords[this.id];
      this.wordTranslation = this.wordList[this.russianWords[this.id]];
      this.id++;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
