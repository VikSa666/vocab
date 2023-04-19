<template>
  <div id="app">
    <div id="nav">
      <top-header></top-header>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import TopHeader from "./components/TopHeader.vue";
import { useRouter } from "vue-router";
const router = useRouter();
router.replace({ name: "home" });
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
