import { createRouter, createWebHistory } from "vue-router";

function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    return next({ name: "login" });
  }

  next();
}

function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "dashboard" });
  }

  next();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      beforeEnter: guest,
      component: () => import("@/LoginView.vue"),
    },
    {
      path: "/",
      name: "dash",
      beforeEnter: auth,
      component: () => import("@/DashLayout.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/Auth/RegisterView.vue"),
        },
      ],
    },
  ],
});

export default router;
