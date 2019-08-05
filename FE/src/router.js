import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register/login',
      name: 'Login',
      component: () => import('./page/register/LoginPage.vue')
    },
    {
      path: '/register/signup',
      name: 'SignUp',
      component: () => import('./page/register/SignupPage.vue')
    },
    {
      path: '/register/editProfile',
      name: 'EditProfile',
      component: () => import('./page/register/EditProfilePage.vue')
    },
    {
      path: '/calendar',
      name: 'Home',
      component: () => import('./page/calendar/HomePage.vue')
    },
    {
      path: '/calendar/today',
      name: 'MyToday',
      component: () => import('./page/calendar/MyTodayPage.vue')
    }
  ]
})
