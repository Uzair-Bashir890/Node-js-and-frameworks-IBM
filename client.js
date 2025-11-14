// client.js - Node.js client for testing all endpoints using async/await and Promises with Axios

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Helper function to create axios instance with session cookie jar support
const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

let sessionCookie = '';

// Update session cookie from response headers
client.interceptors.response.use(
  response => {
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      const cookieStr = Array.isArray(setCookie) ? setCookie[0] : setCookie;
      sessionCookie = cookieStr.split(';')[0];
    }
    return response;
  },
  error => Promise.reject(error)
);

// Make sure to send session cookie in requests
client.interceptors.request.use(
  config => {
    if (sessionCookie) {
      config.headers.Cookie = sessionCookie;
    }
    return config;
  }
);

// Task 1: Get all books
async function task1_getBooks() {
  console.log('\n=== TASK 1: Get all books ===');
  try {
    const response = await client.get('/');
    console.log('Response Status:', response.status);
    console.log('Books:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 2: Get book by ISBN
async function task2_getByISBN() {
  console.log('\n=== TASK 2: Get book by ISBN ===');
  try {
    const response = await client.get('/isbn/9783161484100');
    console.log('Response Status:', response.status);
    console.log('Book:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 3: Get books by Author
async function task3_getByAuthor() {
  console.log('\n=== TASK 3: Get books by Author ===');
  try {
    const response = await client.get('/author/F. Scott Fitzgerald');
    console.log('Response Status:', response.status);
    console.log('Books by Author:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 4: Get books by Title
async function task4_getByTitle() {
  console.log('\n=== TASK 4: Get books by Title ===');
  try {
    const response = await client.get('/title/The Great Gatsby');
    console.log('Response Status:', response.status);
    console.log('Books by Title:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 5: Get book reviews
async function task5_getReviews() {
  console.log('\n=== TASK 5: Get book reviews ===');
  try {
    const response = await client.get('/review/9783161484100');
    console.log('Response Status:', response.status);
    console.log('Reviews:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 6: Register new user
async function task6_registerUser() {
  console.log('\n=== TASK 6: Register New User ===');
  try {
    const response = await client.post('/customer/register', {
      username: 'testuser',
      password: 'password123'
    });
    console.log('Response Status:', response.status);
    console.log('Message:', response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 7: Login user
async function task7_loginUser() {
  console.log('\n=== TASK 7: Login User ===');
  try {
    const response = await client.post('/customer/login', {
      username: 'testuser',
      password: 'password123'
    });
    console.log('Response Status:', response.status);
    console.log('Message:', response.data.message);
    console.log('Token:', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 8: Add/Modify book review
async function task8_addReview() {
  console.log('\n=== TASK 8: Add/Modify Book Review ===');
  try {
    const response = await client.put('/customer/auth/review/9783161484100', 
      { review: 'Great book! Highly recommended.', rating: 5 },
      { headers: { Cookie: sessionCookie } }
    );
    console.log('Response Status:', response.status);
    console.log('Message:', response.data.message);
    console.log('Reviews:', JSON.stringify(response.data.reviews, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 9: Delete book review
async function task9_deleteReview() {
  console.log('\n=== TASK 9: Delete Book Review ===');
  try {
    const response = await client.delete('/customer/auth/review/9783161484100',
      { headers: { Cookie: sessionCookie } }
    );
    console.log('Response Status:', response.status);
    console.log('Message:', response.data.message);
    console.log('Reviews:', JSON.stringify(response.data.reviews, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 10: Get all books using async/await
async function task10_asyncBooks() {
  console.log('\n=== TASK 10: Get All Books (Async/Await with Promise) ===');
  try {
    const response = await client.get('/async/books');
    console.log('Response Status:', response.status);
    console.log('Books:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Task 11: Get book by ISBN using Promises
function task11_promiseISBN() {
  console.log('\n=== TASK 11: Get Book by ISBN (Promises) ===');
  return client.get('/async/isbn/9783161484100')
    .then(response => {
      console.log('Response Status:', response.status);
      console.log('Book:', JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error.response?.data || error.message);
    });
}

// Task 12: Get books by Author using Promises
function task12_promiseAuthor() {
  console.log('\n=== TASK 12: Get Books by Author (Promises) ===');
  return client.get('/async/author/Harper Lee')
    .then(response => {
      console.log('Response Status:', response.status);
      console.log('Books by Author:', JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error.response?.data || error.message);
    });
}

// Task 13: Get books by Title using async/await
async function task13_asyncTitle() {
  console.log('\n=== TASK 13: Get Books by Title (Async/Await) ===');
  try {
    const response = await client.get('/async/title/1984');
    console.log('Response Status:', response.status);
    console.log('Books by Title:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Main execution function
async function runAllTests() {
  console.log('Starting Book Shop API Tests...');
  console.log('========================================');

  // General user tasks
  await task1_getBooks();
  await task2_getByISBN();
  await task3_getByAuthor();
  await task4_getByTitle();
  await task5_getReviews();

  // User registration and login
  await task6_registerUser();
  await task7_loginUser();

  // Registered user tasks
  await task8_addReview();
  await task9_deleteReview();

  // Async/Promise tasks
  await task10_asyncBooks();
  await task11_promiseISBN();
  await task12_promiseAuthor();
  await task13_asyncTitle();

  console.log('\n========================================');
  console.log('All tests completed!');
}

// Run tests
runAllTests().catch(error => console.error('Test error:', error));
