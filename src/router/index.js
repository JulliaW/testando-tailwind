import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import Produtos from '@/views/Produtos.vue'

const routes = [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/produtos',
    component: Produtos
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router