import isAdminGuard from "@/modules/auth/guards/is-admin.guard";
import isAuthenticatedGuard from "@/modules/auth/guards/is-authenticated.guard";
import type { RouteRecordRaw } from "vue-router";


export const adminRoutes: RouteRecordRaw = {
    path: '/admin',
    name:'admin',
    beforeEnter:[
        isAuthenticatedGuard,
        isAdminGuard
    ],
    redirect:{name:'dashboard'},
    component:()=>import('@/modules/admin/layouts/AdminLayout.vue'),
    children:[
        {
            path:'dashboard',
            name:'dashboard',
            component: ()=> import('@/modules/admin/view/DashboardView.vue')
        },

        {
            path:'products',
            name:'admin-products',
            component: ()=> import('@/modules/admin/view/ProductsView.vue')
        },

        {
            path:'products/:productId',
            name:'admin-product',
            props: true,
            component: ()=> import('@/modules/admin/view/ProductView.vue')
        },
    ]
}