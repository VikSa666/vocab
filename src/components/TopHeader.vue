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
import { useRouter } from "vue-router";
import { supabase } from "../supabase/supabaseClient";

const loggedIn = ref(false);
const router = useRouter();

const signOut = async () => {
  supabase.auth.signOut();
  router.replace({ name: "login" });
};

onMounted(() => {
  supabase.auth.onAuthStateChange((user) => {
    if (user) {
      loggedIn.value = true;
    } else {
      loggedIn.value = false;
    }
  });
});
</script>
