import { adminRoutes } from '@/modules/admin/routes'
import { authRoute } from '@/modules/auth/routes'
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue'
import HomeView from '@/modules/shop/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      // redirect: 'home',
      component: ShopLayout,
      children: [
        {
          path: '',
          name:'home',
          component: () => import('@/modules/shop/views/HomeView.vue')
        }
      ]
    },
    

    //AuthRoute

    authRoute,

    // AdminRoutes
    adminRoutes
  ],
})

export default router
