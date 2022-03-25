import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'homeView',
    component: HomeView,
  },
  {
    path: '/chat',
    name: 'chatView',
    component: () => import('../views/ChatView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
