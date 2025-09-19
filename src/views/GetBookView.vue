<template>
  <div class="container mt-5">
    <h2>Book Management - Query, Update & Delete</h2>
    
    <!-- Query Controls -->
    <div class="card mt-3">
      <div class="card-body">
        <h4>Query Books</h4>
        <button @click="fetchBooksWithQuery" class="btn btn-primary me-2">
          Get Books (ISBN > 1000, Order by ISBN, Limit 5)
        </button>
        <button @click="fetchAllBooks" class="btn btn-secondary">
          Get All Books
        </button>
      </div>
    </div>
    
    <!-- Books List -->
    <div class="card mt-3">
      <div class="card-body">
        <h4>Books List</h4>
        <table class="table" v-if="books.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>ISBN</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>
                <input 
                  v-if="editingId === book.id" 
                  v-model.number="editForm.isbn" 
                  type="number"
                  class="form-control"
                >
                <span v-else>{{ book.isbn }}</span>
              </td>
              <td>
                <input 
                  v-if="editingId === book.id" 
                  v-model="editForm.name" 
                  class="form-control"
                >
                <span v-else>{{ book.name }}</span>
              </td>
              <td>
                <button 
                  v-if="editingId === book.id"
                  @click="saveBook(book.id)" 
                  class="btn btn-success btn-sm me-1"
                >
                  Save
                </button>
                <button 
                  v-if="editingId === book.id"
                  @click="cancelEdit" 
                  class="btn btn-secondary btn-sm me-1"
                >
                  Cancel
                </button>
                <button 
                  v-else
                  @click="editBook(book)" 
                  class="btn btn-warning btn-sm me-1"
                >
                  Update
                </button>
                <button 
                  @click="deleteBook(book.id)" 
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-muted">No books found</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import db from '../firebase/init.js'

export default {
  name: 'GetBookView',
  setup() {
    const books = ref([])
    const editingId = ref(null)
    const editForm = ref({ isbn: '', name: '' })
    
    // Fetch books with query (where, orderBy, limit)
    const fetchBooksWithQuery = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn'),
          limit(5)
        )
        
        const querySnapshot = await getDocs(q)
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        console.log('Books fetched with query:', books.value)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    
    // Fetch all books
    const fetchAllBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'))
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        console.log('All books fetched:', books.value)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    
    // Edit book
    const editBook = (book) => {
      editingId.value = book.id
      editForm.value = { isbn: book.isbn, name: book.name }
    }
    
    // Save updated book
    const saveBook = async (id) => {
      try {
        const bookRef = doc(db, 'books', id)
        await updateDoc(bookRef, {
          isbn: editForm.value.isbn,
          name: editForm.value.name
        })
        
        console.log('Book updated:', id)
        editingId.value = null
        fetchAllBooks() // Refresh list
        alert('Book updated successfully!')
      } catch (error) {
        console.error('Error updating book:', error)
        alert('Error updating book')
      }
    }
    
    // Cancel edit
    const cancelEdit = () => {
      editingId.value = null
      editForm.value = { isbn: '', name: '' }
    }
    
    // Delete book
    const deleteBook = async (id) => {
      if (!confirm('Are you sure you want to delete this book?')) return
      
      try {
        await deleteDoc(doc(db, 'books', id))
        console.log('Book deleted:', id)
        fetchAllBooks() // Refresh list
        alert('Book deleted successfully!')
      } catch (error) {
        console.error('Error deleting book:', error)
        alert('Error deleting book')
      }
    }
    
    return {
      books,
      editingId,
      editForm,
      fetchBooksWithQuery,
      fetchAllBooks,
      editBook,
      saveBook,
      cancelEdit,
      deleteBook
    }
  }
}
</script>