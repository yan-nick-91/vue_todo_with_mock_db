import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/completed-tasks',
      name: 'completed',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/pages/CompletedTasksView.vue'),
    },
    {
      path: '/drafts',
      name: 'drafts',
      component: () => import('@/views/pages/DraftView.vue'),
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: () => import('@/views/pages/TaskView.vue'), // Ensure this file exists at the specified path
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: () => import('@/views/pages/NotFoundView.vue'),
    },
  ],
})

export default router
