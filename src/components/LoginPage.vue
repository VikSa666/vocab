<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="email" placeholder="login" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="error" v-if="error">{{ error }}</div>
    <span
      >Need an account? Click here to <router-link to="/register"></router-link
    ></span>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const pressed = async () => {
  try {
    const authStore = useAuthStore();
    const val = await authStore.signIn(email.value, password.value);
    router.replace({ name: "secret" });
    console.log(val);
  } catch (err) {
    alert(err);
  }
};
</script>
<style lang="scss"></style>
