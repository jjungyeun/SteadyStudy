import Vue from 'vue'
import Router from 'vue-router'

import Login from './page/register/LoginPage.vue'
import SignUp from './page/register/SignupPage.vue'
import EditProfile from './page/register/EditProfilePage.vue'
import Home from'./page/calendar/HomePage.vue'
import MyToday from'./page/calendar/MyTodayPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/register/editProfile',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/calendar',
      name: 'Home',
      component: Home
    },
    {
      path: '/calendar/today',
      name: 'MyToday',
      component: MyToday
    }
  ]
})
