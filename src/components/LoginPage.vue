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
import { async } from "@firebase/util";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const pressed = async () => {
  const val = await firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  if (val) {
    router.replace({ name: "secret" });
    console.log(val);
  }
};
</script>
<style lang="scss"></style>
