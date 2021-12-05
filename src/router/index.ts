import { createRouter, createWebHashHistory } from 'vue-router'
// import $cookie from '../utils/cookieConfig'

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    redirect: "/hello",
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: "/news",
        name: 'News',
        component: () => import('../components/NewsList.vue')
      },
      {
        path: "/hello",
        name: 'Hello',
        component: () => import('../components/Hello.vue')
      },
      {
        path: "/collection",
        name: 'Collection',
        component: () => import('../components/Collection.vue')
      },
      {
        path: "/user",
        name: 'User',
        component: () => import('../components/User.vue')
      },
      {
        path: "/rank",
        name: 'Rank',
        component: () => import('../components/Rank.vue')
      },
      {
        path: "/setting",
        name: 'Setting',
        component: () => import('../components/Setting.vue')
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
  // console.log($cookie.getCookie('iui9@qq.com'));
  if (to.path === '/login') return next()
  const token = localStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
