import { createRouter, createWebHashHistory } from "vue-router";
import RegisterPage from "../components/RegisterPage.vue";
import LoginPage from "../components/LoginPage.vue";
import SecretPage from "../components/SecretPage.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/secret", // TODO: Change this
    name: "secret",
    component: SecretPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const isAuthenticated = firebase.auth().currentUser;
//   if (requiresAuth && !isAuthenticated) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
