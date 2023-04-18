<template>
  <div>
    <h3>{{ list.name }}</h3>
    <form @submit.prevent="addWord">
      <span>Word: </span>
      <input type="text" v-model="word" placeholder="add word" />
      <span>Translation: </span>
      <input type="text" v-model="translation" placeholder="translation" />
      <button type="submit">Submit</button>
    </form>
    <ul>
      <li v-for="item in list.items" :key="item.word">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { VocabularyList } from "../types";

const authStore = useAuthStore();

interface Props {
  list: VocabularyList;
}

const props = defineProps<Props>();

const word = ref("");
const translation = ref("");
const addWord = () => {
  authStore.createWord(props.list.name, word.value, translation.value);
};
</script>
