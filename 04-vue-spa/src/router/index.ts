import isAuthenticatedGuard from "@/modules/auth/guards/is-authenticated.guard";
import LoginPage from "@/modules/auth/pages/LoginPage.vue";
import NotFound404 from "@/modules/common/pages/NotFound404.vue";
import HomePage from "@/modules/landing/page/HomePage.vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name:'landing',
            component:() => import('@/modules/landing/layouts/LandingLayout.vue'),
            children:[
                 {
                    path: '/',
                    name:'home',
                    component:HomePage // carga perezosa
        },
                  {
            path: '/features',
            name:'features',
            component:()=> import('@/modules/landing/page/FeaturesPages.vue') // carga perezosa
        },

         {
            path: '/pricing',
            name:'princing',
            component:()=> import('@/modules/landing/page/PricingPage.vue') // carga perezosa
        },

         {
            path: '/contact',
            name:'contact',
            component:()=> import('@/modules/landing/page/ConctacPage.vue') // carga perezosa
        },

        {
            path:'/pokemon/:id',
            name:'pokemon',
            props: (route) => {
                const id = Number(route.params.id);
                
                return isNaN(id) ? {id:1} : {id}
            },
            beforeEnter:[
                isAuthenticatedGuard
            ],
            component: () => import('@/modules/pokemon/pages/PokemonPage.vue')
        }
            ]
        },

       

        //Auuth
        {
            path: '/auth',
            redirect:'/login',
            name:'auth',
            component:()=> import('@/modules/auth/layouts/AuthLayout.vue'), // carga perezosa
            children: [
                {
                    path: '/login',
                    name:'login',
                    component: ()=> import('@/modules/auth/pages/LoginPage.vue')
                },
                 {
                    path: '/regitser',
                    name:'register',
                    component: () => import('@/modules/auth/pages/RegisterPage.vue')
                }
            ]
        
        },


        // Not found
        {
            path: '/:pathMatch(.*)*',
            // redirect:'/'
            component: NotFound404
        }



    ]
});


export default router;