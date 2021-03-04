import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin View',
    component: () => import('../templates/AdminView.vue'),
    children: [
      {
        path: 'clients',
        name: 'Client List',
        component: () => import('../views/admin/Clients.vue'),
        meta: { adminAuth: true }
      },
      {
        path: 'client/:id',
        name: 'Client Details',
        component: () => import('../views/admin/Client.vue'),
        meta: { adminAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.adminAuth) {
    store.state.isAdmin ? next() : next('/')
  }

  if (to.name === 'Login' && store.state.token !== '') {
    store.state.isAdmin ? next('/admin/clients') : next('/')
  }

  next()
})

export default router
