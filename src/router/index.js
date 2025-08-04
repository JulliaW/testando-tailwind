import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Cadastro from '../views/Cadastro.vue'
import Listagem from '../views/Listagem.vue'

const routes = [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/cadastro',
    component: Cadastro
  },
  {
    path: '/listagem',
    component: Listagem
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router