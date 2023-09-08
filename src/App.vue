<script lang="ts" setup>
import { onMounted, ref } from "vue";
import LoginPage from "./components/LoginPage.vue";
import SecretsPage from "./components/SecretPage.vue";
import { supabase } from "./supabase/supabaseClient";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <secrets-page v-if="session" :session="session" />
    <login-page v-else />
  </div>
</template>
