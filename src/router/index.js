import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import Catalog from '../views/Catalog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'Contacts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Contacts
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
