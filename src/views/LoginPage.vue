<template>
  <div class="form-wrap">
    <form @submit.prevent="pressed" class="login">
      <p class="login-register">
        Need an account?
        <router-link class="link" :to="{ name: 'register' }"
          >Click here to register</router-link
        >
      </p>
      <h2>Login to LearnVocab</h2>
      <div class="inputs">
        <!-- <email-icon /> -->
        <!-- <i class="`mdi mdi-email-outline mdi-14px`"></i> -->
        <input class="input" type="email" placeholder="login" v-model="email" />
      </div>
      <div class="inputs">
        <!-- <password-icon /> -->
        <input
          class="input"
          type="password"
          placeholder="password"
          v-model="password"
        />
      </div>
      <router-link class="forgot-password" :to="{ name: 'forgot' }"
        >Forgot your password?</router-link
      >
      <button type="submit">Login</button>
    </form>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const pressed = async () => {
  try {
    const authStore = useAuthStore();
    await authStore.signIn(email.value, password.value);
    router.replace({ name: "secret" });
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        // input {
        width: 100%;
        border: none;
        background-color: #f2f7f6;
        padding: 4px 4px 4px 30px;
        height: 50px;

        &:focus {
          outline: none;
        }
        // }

        i {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: black;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }
  }
}
</style>
