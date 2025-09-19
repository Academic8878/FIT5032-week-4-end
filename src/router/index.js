import { createRouter, createWebHistory } from 'vue-router'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookView from '../views/GetBookView.vue'

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
      path: '/FireRegister',
      name: 'FireRegister',
      component: FirebaseRegisterView
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: AddBookView
    },
    {
      path: '/getbook',
      name: 'GetBook',
      component: GetBookView
    }
  ]
})

export default router