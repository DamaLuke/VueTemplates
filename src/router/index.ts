import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../Home.vue')
  },
  {
    path: '/project-upload',
    name: 'ProjectUpload',
    component: () => import('../views/ProjectFileUploadDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
