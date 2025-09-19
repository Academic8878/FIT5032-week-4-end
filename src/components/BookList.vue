<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Books (ISBN > 1000)</h3>
      
      <div v-if="books.length === 0" class="alert alert-info">
        No books found with ISBN > 1000
      </div>
      
      <ul class="list-group" v-else>
        <li 
          v-for="book in books" 
          :key="book.id" 
          class="list-group-item"
        >
          <strong>ISBN:</strong> {{ book.isbn }} - 
          <strong>Name:</strong> {{ book.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'

export default {
  name: 'BookList',
  setup() {
    const books = ref([])
    
    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000)
        )
        
        const querySnapshot = await getDocs(q)
        books.value = []
        
        querySnapshot.forEach((doc) => {
          books.value.push({
            id: doc.id,
            ...doc.data()
          })
        })
        
        console.log('Books fetched:', books.value)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    
    onMounted(() => {
      fetchBooks()
    })
    
    return {
      books
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>