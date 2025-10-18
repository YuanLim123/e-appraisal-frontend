import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/LoginView.vue'),
    },
    {
      path: '/',
      name: 'dash',
      component: () => import('@/DashLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Auth/RegisterView.vue'),
        },
      ],
    },
  ],
})

export default router
