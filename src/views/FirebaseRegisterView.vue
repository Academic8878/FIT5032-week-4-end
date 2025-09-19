<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Firebase Registration</h2>
            
            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            
            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>
            
            <form @submit.prevent="register">
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
                  placeholder="Minimum 6 characters"
                >
              </div>
              
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword" 
                  v-model="confirmPassword"
                  required
                  minlength="6"
                  placeholder="Re-enter your password"
                >
              </div>
              
              <button type="submit" class="btn btn-primary w-100">
                Register
              </button>
              
              <div class="text-center mt-3">
                <p>Already have an account? 
                  <RouterLink to="/FireLogin">Sign In</RouterLink>
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'FirebaseRegisterView',
  setup() {
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const errorMessage = ref('')
    const successMessage = ref('')
    const router = useRouter()
    
    const register = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      
      // Validate password match
      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match'
        return
      }
      
      const auth = getAuth()
      
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          email.value, 
          password.value
        )
        
        successMessage.value = `Registration successful! Welcome ${userCredential.user.email}`
        console.log('User registered:', userCredential.user)
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/FireLogin')
        }, 2000)
        
      } catch (error) {
        errorMessage.value = error.message
        console.error('Registration error:', error)
      }
    }
    
    return {
      email,
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      register
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>