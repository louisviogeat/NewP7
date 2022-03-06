import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/connexion',
    name: 'connexion',

    component: () => import('../components/ConnexionPage.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/SignupPage.vue')
  },
  {
    path: '/createPost',
    name: 'createPost',
    component: () => import('../components/CreatePost.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
