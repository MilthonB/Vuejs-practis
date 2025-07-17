import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path:'/',
    name:'home',
    redirect: {name:'projects'},
    component: ProjectsLayout,
    children: [
      {
        path: 'projects',
        name:'projects',
        component:()=> import('@/modules/projects/views/ProjectsView.vue')
      },
      {
        path: 'project/:id',
        name:'project',
        props:true,
        component:()=> import('@/modules/projects/views/ProjectView.vue')
      }
    ]
   }
  ],
})

export default router
