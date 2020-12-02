import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import Catalog from '../views/Catalog.vue'
import Single_product from '../views/Single_product.vue'
import Cart from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/catalog/:id',
    name: 'Item',
    component: Single_product
  },
  {
    path: '/item',
    name: 'Single_product',
    component: Single_product
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
