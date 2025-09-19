<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Firebase Sign In</h2>
            
            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            
            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>
            
            <form @submit.prevent="signIn">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  v-model="email"
                  required
                  placeholder="Enter your email"
                >
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  v-model="password"
                  required
                  minlength="6"
                  placeholder="Enter your password"
                >
              </div>
              
              <button type="submit" class="btn btn-primary w-100">
                Sign In
              </button>
              
              <div class="text-center mt-3">
                <p>Don't have an account? 
                  <RouterLink to="/FireRegister">Register</RouterLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'FirebaseSigninView',
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const successMessage = ref('')
    const router = useRouter()
    
    const signIn = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      
      const auth = getAuth()
      
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          email.value, 
          password.value
        )
        
        // Get current user
        const user = auth.currentUser
        
        successMessage.value = `Successfully signed in as ${userCredential.user.email}`
        
        // Log user info to console for verification
        console.log('Current user:', user)
        console.log('User email:', user.email)
        console.log('User ID:', user.uid)
        
        // Optional: Redirect after successful login
        // setTimeout(() => {
        //   router.push('/')
        // }, 2000)
        
      } catch (error) {
        errorMessage.value = error.message
        console.error('Sign in error:', error)
      }
    }
    
    return {
      email,
      password,
      errorMessage,
      successMessage,
      signIn
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>