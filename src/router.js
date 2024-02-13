import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './pages/AppHome.vue'
import AppSearch from './pages/AppSearch.vue'
import AppShow from './pages/AppShow.vue'
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: '/search',
      name: 'search',
      component: AppSearch
    },
    {
      path: '/apartments/:slug',
      name: 'show',
      component: AppShow
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound
    },
  ]
})

export default router
