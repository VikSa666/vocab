<template>
  <div>
    <h1>Welcome to secret page</h1>
    <p>Logged in {{ isAuthenticated }}</p>
  </div>
  <div v-if="isAuthenticated && userData !== null">
    <h2>Welcome, {{ userData?.userName }}</h2>
    <p>Email: {{ userData?.email }}</p>
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/index";

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const userData = authStore.getUserData;
console.log(userData);
</script>
<style lang="scss"></style>
