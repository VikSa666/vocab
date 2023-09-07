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
// import { useAuthStore } from "../stores/auth";

const loggedIn = ref(false);
const router = useRouter();

// const signOut = async () => {
//   const authStore = useAuthStore();
//   authStore.signOut();
//   router.replace({ name: "login" });
// };

const signOut = () => {
  router.replace({ name: "login" });
  alert("ok bro");
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
