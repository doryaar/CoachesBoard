import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
//import CoachRegistration from './pages/coaches/CoachRegistration.vue'
//import ContactCoach from './pages/request/ContactCoach.vue'
//import RequestReceive from './pages/request/RequestReceive.vue'
import NotFound from './pages/NotFound.vue'
//import UserAuth from './pages/auth/UserAuth.vue'

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/request/ContactCoach.vue');
const RequestReceive = () => import('./pages/request/RequestReceive.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const CoachProfile = () => import('./pages/coaches/CoachProfile.vue')

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }
      ],
    },
    { 
      path: '/profile/:id',
      component: CoachProfile,
      props: true,
      meta: { requiresAuth: true },
    },
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true }},
    { path: '/requests', component: RequestReceive, meta: { requiresAuth: true }},
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true }},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('coaches')
  } else {
    next();
  }
});

export default router;
