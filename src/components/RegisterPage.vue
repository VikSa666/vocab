<template>
  <form @submit.prevent="handleSignUp">
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script lang="ts">
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  data() {
    return {
      email: "" as string,
      password: "" as string,
    };
  },
  methods: {
    handleSignUp(): void {
      try {
        const email = this.email;
        const password = this.password;
        firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
