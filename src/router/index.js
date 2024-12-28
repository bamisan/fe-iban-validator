import { createRouter, createWebHistory } from "vue-router";

import AdminDashboardView from "@/views/AdminDashboardView.vue";
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
  {
    path: "/admin-dashboard",
    name: "admin-dashboard",
    component: AdminDashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
