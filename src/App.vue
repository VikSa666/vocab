<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { supabase } from "./supabase/supabaseClient";
import { RouterLink, RouterView } from "vue-router";

const countries = ref([] as any[] | null);

async function getCountries() {
  const { data } = await supabase.from("countries").select();
  countries.value = data;
}

onMounted(() => {
  getCountries();
});
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/secret">Secret</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </div>
  <h1>Countries</h1>
  <ul>
    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
  </ul>
  <router-view />
</template>
