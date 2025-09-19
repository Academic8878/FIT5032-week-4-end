// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import Firebase
import { initializeApp } from "firebase/app"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpgx5h4S8xJltAyTbZdEUogYUt9yiK_X4",
  authDomain: "week7-haoyu-wang.firebaseapp.com",
  projectId: "week7-haoyu-wang",
  storageBucket: "week7-haoyu-wang.firebasestorage.app",
  messagingSenderId: "994307617124",
  appId: "1:994307617124:web:1b43047fa5a314434eca71"
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')