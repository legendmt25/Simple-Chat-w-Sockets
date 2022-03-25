import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

router.beforeEach((to, from, next) => {
  if (to.name == 'homeView') {
    next();
    return;
  }
  if (to.name == 'chatView' && sessionStorage.getItem('username')) {
    next();
    return;
  }
  next('/');
  return;
});

createApp(App).use(router).mount('#app');
