import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/reservas',
    name: 'Reservas',
    component: () => import('../views/Reservas.vue')
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: () => import('../views/Contacto.vue')
  },
  {
    path: '/churrasqueros',
    name: 'Churrasqueros',
    component: () => import('../views/Churrasqueros.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue')
  },
  {
    path: '/pedido-confirmado',
    name: 'PedidoConfirmado',
    component: () => import('../views/PedidoConfirmado.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 