<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Add New Book</h2>
            
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="isbn" class="form-label">ISBN</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="isbn" 
                  v-model.number="isbn"
                  required
                  placeholder="Enter ISBN number"
                >
              </div>
              
              <div class="mb-3">
                <label for="name" class="form-label">Book Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  v-model="name"
                  required
                  placeholder="Enter book name"
                >
              </div>
              
              <button type="submit" class="btn btn-primary w-100">
                Add Book
              </button>
            </form>
          </div>
        </div>
        
        <!-- Book List Component -->
        <div class="mt-4">
          <BookList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../firebase/init.js'
import BookList from '../components/BookList.vue'

export default {
  name: 'AddBookView',
  components: {
    BookList
  },
  setup() {
    const isbn = ref('')
    const name = ref('')
    
    const submitForm = async () => {
      try {
        const docRef = await addDoc(collection(db, 'books'), {
          isbn: isbn.value,
          name: name.value
        })
        
        console.log('Book added with ID: ', docRef.id)
        alert('Book added successfully!')
        
        // Clear form
        isbn.value = ''
        name.value = ''
      } catch (error) {
        console.error('Error adding book: ', error)
        alert('Error adding book')
      }
    }
    
    return {
      isbn,
      name,
      submitForm
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>