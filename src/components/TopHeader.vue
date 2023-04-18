<template>
  <div id="nav">
    <div>
      <router-link to="login" v-if="loggedIn">Sign out</router-link>
      <router-link to="login" v-if="!loggedIn">Log in</router-link>
      <router-link to="register" v-if="!loggedIn">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const loggedIn = ref(false);
const router = useRouter();

const signOut = async () => {
  const authStore = useAuthStore();
  authStore.signOut();
  router.replace({ name: "login" });
};

const login = () => {
  router.replace({ name: "login" });
};

const register = () => {
  router.replace({ name: "register" });
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

<style lang="scss">
#nav {
  display: flex;
  flex-direction: row;
}
</style>
