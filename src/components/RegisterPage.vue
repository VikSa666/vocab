<template>
  <div v-if="error" class="error">{{ error }}</div>
  <form @submit.prevent="handleSignUp">
    <input type="text" v-model="name" placeholder="Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script lang="ts" setup>
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/supabaseClient";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const handleSignUp = async () => {
  try {
    let credentials: SignUpWithPasswordCredentials = {
      email: email.value,
      password: password.value,
      options: {
        data: {
          name: name.value,
        },
      },
    };
    supabase.auth.signUp(credentials);
    router.replace({ name: "secret" });
  } catch (err) {
    console.error(err);
  }
};
</script>
