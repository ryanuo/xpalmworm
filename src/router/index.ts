import { createRouter, createWebHashHistory } from 'vue-router'
import $cookie from '@/utils/samll/cookieConfig'

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    redirect: "/hello",
    component: () => import('../views/home/Home.vue'),
    children: [
      {
        path: "/news",
        name: 'News',
        component: () => import('../views/home/menu/newslist/NewsList.vue')
      },
      {
        path: "/hello",
        name: 'Hello',
        component: () => import('../views/home/menu/hello/Hello.vue')
      },
      {
        path: "/collection",
        name: 'Collection',
        component: () => import('../views/home/menu/collection/Collection.vue')
      },
      {
        path: "/med1",
        name: 'Med1',
        component: () => import('../views/home/menu/med1/Med1.vue')
      },
      {
        path: "/user",
        name: 'User',
        component: () => import('../views/home/menu/user/User.vue')
      },
      {
        path: "/rank",
        name: 'Rank',
        component: () => import('../views/home/menu/rank/Rank.vue')
      },
      {
        path: "/setting",
        name: 'Setting',
        component: () => import('../views/home/menu/setting/Setting.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginRegister.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  // createWebHashHistory
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = localStorage.getItem('token')
  if (!token) return next('/login')
  const { email: a } = JSON.parse(token as any)
  const cookie = $cookie.getCookie('e_id')
  if (!token || a !== cookie) return next('/login')
  next()
})
export default router
