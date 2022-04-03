/*
 * @Author: Harry
 * @Date: 2021-11-27 20:50:49
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-30 16:10:22
 * @FilePath: \xpalmworm\src\router\index.ts
 */
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
        path: "/banner",
        name: 'Banner',
        component: () => import('../views/home/menu/banner/Banner.vue')
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
  const { email: e_id, username: u_id } = JSON.parse(token as any)
  const e = $cookie.getCookie('e_id')
  const u = $cookie.getCookie('u_id')
  // console.log(!token || e_id !== e || u_id !== u);
  if (!token || e_id !== e || u_id !== u) return next('/login')
  next()
})
export default router
