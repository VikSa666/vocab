import { createRouter, createWebHashHistory } from "vue-router";
import RegisterPage from "../components/RegisterPage.vue";
import LoginPage from "../components/LoginPage.vue";
import SecretPage from "../components/SecretPage.vue";

const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/secret", // TODO: Change this
    name: "secret",
    component: SecretPage,
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

export default router;
