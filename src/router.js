import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ './components/Login.vue')
// import Login from './components/Login.vue'
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ './components/Home.vue')
// import Home from './components/Home.vue'
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ './components/Welcome.vue')
// import Welcome from './components/Welcome.vue'
const Users = () => import(/* webpackChunkName:"user" */ './components/user/Users.vue')
// import Users from './components/user/Users.vue'
const Rights = () => import(/* webpackChunkName:"power" */ './components/power/Rights.vue')
// import Rights from './components/power/Rights.vue'
const Roles = () => import(/* webpackChunkName:"power" */ './components/power/Roles.vue')
// import Roles from './components/power/Roles.vue'
const Cate = () => import(/* webpackChunkName:"goods" */ './components/goods/Cate.vue')
// import Cate from './components/goods/Cate.vue'
const Params = () => import(/* webpackChunkName:"goods" */ './components/goods/Params.vue')
// import Params from './components/goods/Params.vue'
const List = () => import(/* webpackChunkName:"goods" */ './components/goods/List.vue')
// import GoodList from './components/goods/List.vue'
const Add = () => import(/* webpackChunkName:"goods" */ './components/goods/Add.vue')
// import GoodAdd from './components/goods/Add.vue'
const Order = () => import(/* webpackChunkName:"order" */ './components/order/order.vue')
// import Order from './components/order/Order.vue'
const Report = () => import(/* webpackChunkName:"report" */ './components/report/Report.vue')
// import Report from './components/report/Report.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }, {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome', component: Welcome

      }, {
        path: '/users', component: Users

      }, {
        path: '/rights', component: Rights

      }, {
        path: '/roles', component: Roles

      }, {
        path: '/categories', component: Cate

      }, {
        path: '/params', component: Params

      }, {
        path: '/goods', component: List

      }, {
        path: '/goods/add', component: Add

      },
      {
        path: '/orders', component: Order

      }, {
        path: '/reports', component: Report

      }]

    }
  ]

})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数，表示放行
  // next()放行    next('/login')强制跳转
  // eslint-disable-next-line eqeqeq
  if (to.path == '/login') return next()
  // 获取token值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

// 格式化时间处理函数在入口函数进行注册
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // padStart不足两位补0
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // return `yyyy-mm-dd hh:mm:ss`
  return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
})

export default router
