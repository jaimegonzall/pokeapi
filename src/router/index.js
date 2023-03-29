import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/:idOrName',
      name: 'Pokemon Detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'PageNotFound',
      component: HomeView,
      meta: { auth: false, title: 'PageNotFound' }
    }
  ]
})

export default router
