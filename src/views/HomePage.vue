<template>
  <div>
    <h1>Learn Vocabulary</h1>
    <h2>Welcome to Learn Vocabulary application</h2>
    <p>
      <router-link class="link" :to="{ name: 'login' }"
        >Log in&nbsp;</router-link
      >or<router-link class="link" :to="{ name: 'register' }"
        >&nbsp;register&nbsp;</router-link
      >
      to start learning vocabulary and creating awesome lists.
    </p>
  </div>
</template>

<script lang="ts" setup></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  .link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
  }

  .link-light {
    color: #fff;
  }
}
</style>
