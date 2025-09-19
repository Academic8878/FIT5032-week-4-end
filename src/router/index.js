import { createRouter, createWebHistory } from 'vue-router'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'  // 导入注册组件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/LibraryRegistrationForm.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: { 
        template: '<div class="container mt-5"><h1>About Page</h1><p>This is the about page.</p></div>' 
      }
    },
    {
      path: '/contact-us',
      name: 'Contact',
      component: { 
        template: '<div class="container mt-5"><h1>Contact Us</h1><p>Contact information here.</p></div>' 
      }
    },
    {
      path: '/FireLogin',
      name: 'FireLogin',
      component: FirebaseSigninView
    },
    {
      path: '/FireRegister',  // 新增注册路由
      name: 'FireRegister',
      component: FirebaseRegisterView
    }
  ]
})

export default router