import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './pages/AppHome.vue'
import AppShow from './pages/AppShow.vue'
import NotFound from "./pages/NotFound.vue";
import LoaderComponent from "./components/LoaderComponent.vue";
import AppSearch from "./pages/AppSearch.vue";

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
      path: '/search',
      name: 'search',
      component: AppSearch
    },
    {
      path: '/loader',
      name: 'loader',
      component: LoaderComponent
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound
    },
  ]
})

export default router
