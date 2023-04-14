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
import db from "../firebase/firebaseInit";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const handleSignUp = async () => {
  try {
    const firebaseAuth = await firebase.auth();
    const createUser = await firebaseAuth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    const user = await createUser;
    console.log(user);
    const dataBase = db.firestore().collection("users").doc(user.user?.uid);
    await dataBase.set({
      email: email.value,
    });
    router.replace({ name: "secret" });
  } catch (err) {
    error.value = err as string;
    alert(err);
  }
};
</script>
