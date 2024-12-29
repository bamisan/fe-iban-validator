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
    meta: { public: true },
  },
  {
    path: "/register",
    name: "registration",
    component: Registration,
    meta: { public: true },
  },
  {
    path: "/user-dashboard",
    name: "user-dashboard",
    component: UserDashboard,
    meta: { requiresAuth: true, role: "user" },
  },
  {
    path: "/admin-dashboard",
    name: "admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (to.meta.public) {
    return next();
  }

  if (to.meta.requiresAuth) {
    if (!token) {
      return next({ name: "login" });
    }

    if (to.meta.role != role) {
      return next({ name: "login" });
    }

    return next();
  }

  next();
});

export default router;
