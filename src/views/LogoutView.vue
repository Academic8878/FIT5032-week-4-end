<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="card-title mb-4">Logout</h2>
            
            <div v-if="user" class="mb-4">
              <p>Current user: <strong>{{ user.email }}</strong></p>
              <p>User ID: {{ user.uid }}</p>
              <button @click="handleLogout" class="btn btn-danger">
                Logout
              </button>
            </div>
            
            <div v-else class="mb-4">
              <p>No user is currently logged in</p>
              <RouterLink to="/FireLogin" class="btn btn-primary">
                Go to Login
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LogoutView',
  setup() {
    const user = ref(null)
    const router = useRouter()
    const auth = getAuth()
    
    onMounted(() => {
      // Check current user on component mount
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        console.log('Current user on logout page:', currentUser)
      })
    })
    
    const handleLogout = async () => {
      try {
        await signOut(auth)
        console.log('User logged out successfully')
        user.value = null
        
        // Redirect to login page after 1 second
        setTimeout(() => {
          router.push('/FireLogin')
        }, 1000)
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
    
    return {
      user,
      handleLogout
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>