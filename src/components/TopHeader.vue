<template>
  <div>
    Logged in
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <div><button @click="signOut">Sign out</button></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "vue-router";

const loggedIn = ref(false);
const router = useRouter();

const signOut = async () => {
  try {
    const data = await firebase.auth().signOut();
    console.log(data);
    router.replace({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loggedIn.value = true;
    } else {
      loggedIn.value = false;
    }
  });
});
</script>
