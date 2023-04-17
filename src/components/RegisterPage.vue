<template>
  <div v-if="error" class="error">{{ error }}</div>
  <form @submit.prevent="handleSignUp">
    <input type="text" v-model="name" placeholder="Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script lang="ts" setup>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import db from "../firebase/firebaseInit";
import { useAuthStore } from "../stores";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const handleSignUp = async () => {
  try {
    const authStore = useAuthStore();
    await authStore.signIn(email.value, name.value);
    router.replace({ name: "secret" });
  } catch (err) {
    alert(err);
  }
};
</script>
