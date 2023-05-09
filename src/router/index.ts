import { createRouter, createWebHashHistory } from "vue-router";
import RegisterPage from "../views/RegisterPage.vue";
import LoginPage from "../views/LoginPage.vue";
import UserHomePage from "../views/UserHomePage.vue";
import HomePage from "../views/HomePage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/secret", // TODO: Change this
    name: "secret",
    component: UserHomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/forgot-password",
    name: "forgot",
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
