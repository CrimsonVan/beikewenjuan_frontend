import { createRouter, createWebHashHistory } from 'vue-router'
import { userInfoStore } from '../stores/index'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  //路由模式hash
  history: createWebHashHistory('/startform/'),
  routes: [
    {
      //登录成功以后展示数据的路由
      path: '/',
      component: () => import('../views/layout/index.vue'),
      name: 'layout',
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('../views/layout/home/index.vue')
        }
      ]
    },
    {
      path: '/publish',
      component: () => import('../views/publish/index.vue'),
      name: 'publish'
    },
    {
      path: '/edit',
      component: () => import('../views/edit/index.vue'),
      name: 'edit'
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
      name: 'login'
    }
  ]
})
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = userInfoStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})
export default router
