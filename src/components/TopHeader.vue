<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'home' }"
          >LearnVocab</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link
            class="link"
            :to="{ name: 'login' }"
            v-if="loggedIn"
            @click="logout"
            >Sign out</router-link
          >
          <router-link class="link" :to="{ name: 'login' }" v-if="!loggedIn"
            >Log in</router-link
          >
          <router-link class="link" :to="{ name: 'register' }" v-if="!loggedIn"
            >Register</router-link
          >
        </ul>
        <!-- <div class="profile" ref="profile">
          <span>asdf</span>
        </div> -->
      </div>
    </nav>
    <div @click="toggleMobileNav" v-show="mobile" class="menu-icon">
      MENU ICON
    </div>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'login' }" v-if="loggedIn"
          >Sign out</router-link
        >
        <router-link class="link" :to="{ name: 'login' }">Log in</router-link>
        <router-link class="link" :to="{ name: 'register' }"
          >Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const loggedIn = ref(false);

const router = useRouter();

onMounted(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Logged in");
      loggedIn.value = true;
    } else {
      console.log("Logged out");
      loggedIn.value = false;
    }
  });
});

// Mobile vs wide screen
const mobile = ref<boolean>(false);
const mobileNav = ref<boolean>(false);
const windowWidth = ref<number>(-1);

// This function should be executed when first load and when screen is resized
const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 750) {
    mobile.value = true;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
};

const logout = async () => {
  try {
    const authStore = useAuthStore();
    await authStore.signOut();
    router.replace({ name: "secret" });
  } catch (err) {
    console.error(err);
  }
};
window.addEventListener("resize", () => checkScreen());

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};
</script>

<style lang="scss" scoped>
@import "../styles.scss";

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.5s background-color ease;

    &:hover {
      background-color: #eee;
    }
  }

  nav {
    min-height: 50px;
    display: flex;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }
    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }

    ul {
      margin-right: 32px;
      margin-top: 0;
      margin-bottom: 0;
      height: 100%;
      margin-block-start: 0;
      margin-block-end: 0;

      a {
        display: inline-block;
        height: 100%;
        align-content: center;
        text-align: center;
      }

      .link {
        text-align: center;
        align-content: center;
        align-items: center;
        padding-left: 32px;
        padding-right: 32px;
        height: 100%;
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
