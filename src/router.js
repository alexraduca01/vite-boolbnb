import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './pages/AppHome.vue'
import AppShow from './pages/AppShow.vue'
import NotFound from "./pages/NotFound.vue";
import AppLoader from "./pages/AppLoader.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: '/apartments/:slug',
      name: 'show',
      component: AppShow
    },
    {
      path: '/loader',
      name: 'loader',
      component: AppLoader
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound
    },
  ]
})

export default router
