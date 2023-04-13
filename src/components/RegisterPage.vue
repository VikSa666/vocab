<template>
  <div v-if="error" class="error">{{ error }}</div>
  <form @submit.prevent="handleSignUp">
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

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const handleSignUp = async () => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    console.log(user);
    router.replace({ name: "secret" });
  } catch (err) {
    error.value = err as string;
    alert(err);
  }
};
</script>
