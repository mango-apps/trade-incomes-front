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
      },
      {
        path: 'register',
        name: 'Client Register',
        component: () => import('../views/admin/RegisterNewClient.vue'),
        meta: { adminAuth: true }
      },
      {
        path: 'withdrawals',
        name: 'Withdrawals Requests',
        component: () => import('../views/admin/Withdrawals.vue'),
        meta: { adminAuth: true }
      },
      {
        path: 'settings',
        name: 'Admin Settings',
        component: () => import('../views/admin/Settings.vue'),
        meta: { adminAuth: true }
      },
      {
        path: 'change-pass',
        name: 'Change Admin Pass',
        component: () => import('../views/admin/ChangePass.vue'),
        meta: { adminAuth: true }
      }
    ]
  },
  {
    path: '/user',
    name: 'User View',
    component: () => import('../templates/UserView.vue'),
    children: [
      {
        path: 'investments',
        name: 'Client Investments',
        component: () => import('../views/user/Investments.vue'),
        meta: { userAuth: true }
      },
      {
        path: 'settings',
        name: 'Client Settings',
        component: () => import('../views/user/Settings.vue'),
        meta: { userAuth: true }
      },
      {
        path: 'withdrawals',
        name: 'Client Withdrawals Requests',
        component: () => import('../views/user/Withdrawals'),
        meta: { userAuth: true }
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

  if (to.meta.userAuth) {
    store.state.token && !store.state.isAdmin ? next() : next('/')
  }

  if (to.name === 'Login' && store.state.token !== '') {
    store.state.isAdmin ? next('/admin/clients') : next('/user/investments')
  }

  next()
})

export default router
