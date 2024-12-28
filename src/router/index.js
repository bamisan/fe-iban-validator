import { createRouter, createWebHistory } from "vue-router";

import AdminDashboard from "@/views/AdminDashboard.vue";
import Login from "../views/LoginView.vue";
import Registration from "../views/RegistrationView.vue";
import UserDashboard from "@/views/UserDashboard.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "registration",
    component: Registration,
  },
  {
    path: "/user-dashboard",
    name: "user-dashboard",
    component: UserDashboard,
  },
  {
    path: "/admin-dashboard",
    name: "admin-dashboard",
    component: AdminDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
