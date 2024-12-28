import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import UserDashboardView from "@/views/UserDashboardView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "registration",
    component: RegistrationView,
  },
  {
    path: "/user-dashboard",
    name: "user-dashboard",
    component: UserDashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
