<template>
  <div class="form-wrap">
    <div v-if="error" class="error">{{ error }}</div>
    <form @submit.prevent="handleSignUp" class="login">
      <p class="login-register">
        Already have an account?&nbsp;<router-link
          class="link"
          :to="{ name: 'login' }"
          >Click here to login</router-link
        >
      </p>
      <h2>Create your LearnVocab account</h2>
      <div class="inputs">
        <input
          class="input"
          type="text"
          v-model="firstName"
          placeholder="First name"
        />
      </div>
      <div class="inputs">
        <input
          class="input"
          type="text"
          v-model="lastName"
          placeholder="Last name"
        />
      </div>
      <div class="inputs">
        <input
          class="input"
          type="text"
          v-model="username"
          placeholder="Username"
        />
      </div>
      <div class="inputs">
        <input class="input" type="email" v-model="email" placeholder="Email" />
      </div>
      <div class="inputs">
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import db from "../firebase/firebaseInit";
import { useAuthStore } from "../stores/auth";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const handleSignUp = async () => {
  try {
    const authStore = useAuthStore();
    await authStore.signUp(
      firstName.value,
      lastName.value,
      username.value,
      email.value,
      password.value
    );
    router.replace({ name: "secret" });
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss" scoped></style>
