import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import Catalog from '../views/Catalog.vue'
import Single_product from '../views/Single_product.vue'
import Myfavorite from '../views/Favorites.vue'
import Cart from '../views/Cart.vue'
import SearchPage from '../views/SearchPage.vue'

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
    path: '/myfavorite',
    name: 'Myfavorite',
    component: Myfavorite
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
    path: '/catalog/:category/:id',
    name: 'Category',
    component: Single_product
  },
  {
    path: '/item',
    name: 'Single_product',
    component: Single_product
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    props: true
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