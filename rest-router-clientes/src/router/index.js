import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: {
        title: 'Registros',
      },
    },
    {
      path: '/new-register',
      name: 'nuevo-registro',
      props: {
        title: 'Nuevo Registro',
      },
      component: () => import('../views/NewRegisterView.vue'),
    },
    {
      path: '/edit-register/:id',
      name: 'edit-client',
      props: {
        title: 'Editar Registro',
      },
      component: () => import('../views/EditRegisterView.vue'),
    }
  ],
})

export default router
