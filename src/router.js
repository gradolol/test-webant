import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'all',
          component: () => import('@/views/Gallery.vue'),
        },
        {
          path: '/new',
          name: 'new',
          props: { category: 'new' },
          component: () => import('@/views/Gallery.vue'),
        },
        {
          path: '/popular',
          name: 'popular',
          props: { category: 'popular' },
          component: () => import('@/views/Gallery.vue'),
        },
        {
          path: '/upload',
          name: 'upload',
          component: () => import('@/views/UploadForm.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/Registration.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login') 
  } else {
    if (store.getters.isAuthenticated) {
      next('/')
      return
    }
      next() 
  }
})

export default router