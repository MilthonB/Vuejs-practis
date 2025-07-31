import type { RouteRecordRaw } from "vue-router";
import isNotAuthenticatedGuard from "../guards/is-not-authenticated.guard";


export const authRoute: RouteRecordRaw = {
    path: '/auth',
    redirect: {name: 'login'},
    name: 'auth',
    beforeEnter: [isNotAuthenticatedGuard],
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: 'login',
            name: 'login',
            component: () =>import('@/modules/auth/views/LoginView.vue')
        },
        {
            path: 'register',
            name: 'register',
            component: () =>import('@/modules/auth/views/RegisterView.vue')
        }
    ]
}