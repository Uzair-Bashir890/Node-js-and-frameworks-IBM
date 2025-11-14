# Book Shop API - Hands-On Lab Complete Guide

## Project Overview
This is a Node.js Express-based Book Shop API with user authentication and book management features. The project demonstrates RESTful API design, JWT authentication, session management, and asynchronous programming with Promises and async/await.

## Project Structure
```
.
├── index.js                    # Main server file
├── package.json                # Dependencies and scripts
├── client.js                   # Node.js client for testing
├── router/
│   ├── general.js             # Public endpoints (Tasks 1-5, 10-13)
│   ├── auth_users.js          # Authentication endpoints (Tasks 6-9)
│   └── booksdb.js             # Book database
└── README.md                   # This file
```

## Setup Instructions

### 1. Install Dependencies
```powershell
npm install
```

This will install:
- `express` - Web framework
- `express-session` - Session management
- `jsonwebtoken` - JWT authentication
- `axios` - HTTP client for testing

### 2. Start the Server
```powershell
npm start
```
The server will run on `http://localhost:5000`

### 3. Run Tests (in another terminal)
```powershell
npm run client
```

---

## Task Breakdown & Implementation

### General Users (No Authentication Required)

#### **Task 1: Get the book list available in the shop** (2 Points)
**Endpoint:** `GET /`
- Lists all books in the database
- Method: Synchronous callback
- Response: All books as JSON

**Test:**
```bash
curl http://localhost:5000/
```

**Client Test:**
```javascript
await task1_getBooks();
```

---

#### **Task 2: Get the books based on ISBN** (2 Points)
**Endpoint:** `GET /isbn/:isbn`
- Returns a single book by ISBN
- Method: Synchronous callback
- Parameters: ISBN in URL path

**Test:**
```bash
curl http://localhost:5000/isbn/9783161484100
```

**Client Test:**
```javascript
await task2_getByISBN();
```

---

#### **Task 3: Get all books by Author** (2 Points)
**Endpoint:** `GET /author/:author`
- Returns all books by a specific author
- Method: Synchronous callback
- Parameters: Author name in URL path
- Case-insensitive matching

**Test:**
```bash
curl http://localhost:5000/author/F.%20Scott%20Fitzgerald
```

**Client Test:**
```javascript
await task3_getByAuthor();
```

---

#### **Task 4: Get all books based on Title** (2 Points)
**Endpoint:** `GET /title/:title`
- Returns all books with matching title
- Method: Synchronous callback
- Parameters: Title in URL path
- Case-insensitive matching

**Test:**
```bash
curl http://localhost:5000/title/The%20Great%20Gatsby
```

**Client Test:**
```javascript
await task4_getByTitle();
```

---

#### **Task 5: Get book Review** (2 Points)
**Endpoint:** `GET /review/:isbn`
- Returns all reviews for a book
- Method: Synchronous callback
- Parameters: ISBN in URL path

**Test:**
```bash
curl http://localhost:5000/review/9783161484100
```

**Client Test:**
```javascript
await task5_getReviews();
```

---

### Authentication Endpoints

#### **Task 6: Register New user** (3 Points)
**Endpoint:** `POST /customer/register`
- Registers a new user
- Method: Synchronous callback
- Body: `{ username, password }`
- Validates that username is unique
- Stores user in memory

**Test with curl:**
```bash
curl -X POST http://localhost:5000/customer/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

**Client Test:**
```javascript
await task6_registerUser();
```

---

#### **Task 7: Login as a Registered user** (3 Points)
**Endpoint:** `POST /customer/login`
- Authenticates user and returns JWT token
- Method: Synchronous callback
- Body: `{ username, password }`
- Returns JWT token stored in session
- Token expires in 1 hour

**Test with curl:**
```bash
curl -X POST http://localhost:5000/customer/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

**Client Test:**
```javascript
await task7_loginUser();
```

---

### Registered Users (Authentication Required)

#### **Task 8: Add/Modify a book review** (2 Points)
**Endpoint:** `PUT /customer/auth/review/:isbn`
- Protected endpoint (requires login)
- Adds new review or updates existing review by user
- Method: Synchronous callback with JWT verification
- Parameters: ISBN in URL path
- Body: `{ review, rating }` or Query: `?review=text`
- Username extracted from JWT token

**Test with curl (requires valid session):**
```bash
curl -X PUT http://localhost:5000/customer/auth/review/9783161484100 ^
  -H "Content-Type: application/json" ^
  -d "{\"review\":\"Great book!\",\"rating\":5}"
```

**Client Test:**
```javascript
await task8_addReview();
```

---

#### **Task 9: Delete book review added by that particular user** (2 Points)
**Endpoint:** `DELETE /customer/auth/review/:isbn`
- Protected endpoint (requires login)
- Deletes review by logged-in user for specific book
- Method: Synchronous callback with JWT verification
- Parameters: ISBN in URL path
- Username extracted from JWT token

**Test with curl (requires valid session):**
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/9783161484100
```

**Client Test:**
```javascript
await task9_deleteReview();
```

---

### Node.js Program Methods (Async/Promises with Axios)

#### **Task 10: Get all books – Using async callback function** (2 Points)
**Endpoint:** `GET /async/books`
- Returns all books
- **Implementation Method:** Promise-based (resolved with async callback)
- Demonstrates Promise.then() pattern
- Must use Axios in client implementation

**Test with curl:**
```bash
curl http://localhost:5000/async/books
```

**Client Test:**
```javascript
await task10_asyncBooks();  // Uses async/await
```

---

#### **Task 11: Search by ISBN – Using Promises** (2 Points)
**Endpoint:** `GET /async/isbn/:isbn`
- Returns single book by ISBN
- **Implementation Method:** Async/await (JavaScript promise syntax)
- Demonstrates async/await pattern
- Must use Axios in client implementation

**Test with curl:**
```bash
curl http://localhost:5000/async/isbn/9783161484100
```

**Client Test:**
```javascript
task11_promiseISBN();  // Uses Promise.then()
```

---

#### **Task 12: Search by Author** (2 Points)
**Endpoint:** `GET /async/author/:author`
- Returns books by author
- **Implementation Method:** Promise-based
- Demonstrates Promise with array filtering
- Must use Axios in client implementation

**Test with curl:**
```bash
curl http://localhost:5000/async/author/Harper%20Lee
```

**Client Test:**
```javascript
await task12_promiseAuthor();  // Uses Promise.then()
```

---

#### **Task 13: Search by Title** (2 Points)
**Endpoint:** `GET /async/title/:title`
- Returns books by title
- **Implementation Method:** Async/await
- Demonstrates async/await pattern
- Must use Axios in client implementation

**Test with curl:**
```bash
curl http://localhost:5000/async/title/1984
```

**Client Test:**
```javascript
await task13_asyncTitle();  // Uses async/await
```

---

#### **Task 14: Submission of Project GitHub Link** (2 Points)
- Initialize git repository
- Push project to GitHub
- Submit GitHub repository link

**Steps:**
```powershell
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Book Shop API with authentication and async methods"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/book-shop-api.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Testing & Screenshots

### For Peer Review - Screenshots Required for Each Task:

1. **Task 1-5 (General endpoints):** Show curl requests and JSON responses
2. **Task 6-7 (Registration/Login):** Show successful registration and login token
3. **Task 8-9 (Add/Delete reviews):** Show review added and deleted
4. **Task 10-13 (Async methods):** Show client.js output for each test
5. **Task 14:** Provide GitHub repository link

### Complete Testing Sequence:

```powershell
# Terminal 1: Start server
npm start

# Terminal 2: Run all tests
npm run client
```

---

## Expected Sample Data

The API comes with sample books:

| ISBN | Title | Author |
|------|-------|--------|
| 9783161484100 | The Great Gatsby | F. Scott Fitzgerald |
| 9783161484101 | To Kill a Mockingbird | Harper Lee |
| 9783161484102 | 1984 | George Orwell |
| 9783161484103 | Pride and Prejudice | Jane Austen |
| 9783161484104 | The Catcher in the Rye | J.D. Salinger |

---

## Error Handling

All endpoints include proper error handling:
- **400**: Bad Request (missing parameters)
- **401**: Unauthorized (not logged in for protected endpoints)
- **404**: Not Found (book/user doesn't exist)
- **500**: Server Error (unexpected error)

---

## Key Technologies Used

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| JWT (jsonwebtoken) | Authentication tokens |
| express-session | Session management |
| Axios | HTTP client |

---

## Notes for Implementation

1. **Session vs JWT**: The application uses both:
   - Session cookies for maintaining login state
   - JWT tokens for verifying protected requests

2. **Async Methods**: 
   - Task 10: Promise with `.then()`
   - Task 11: Async/await
   - Task 12: Promise with array filter
   - Task 13: Async/await

3. **Reviews Storage**: Reviews are stored in-memory under each book object, keyed by username

4. **User Data**: User credentials are stored in-memory (not persistent) for lab purposes

---

## Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 5000
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process -Force
```

### Dependencies Not Installed
```powershell
# Clear cache and reinstall
npm cache clean --force
npm install
```

### Module Not Found Error
```powershell
# Ensure you're in the correct directory
cd "c:\Users\bashi\OneDrive\Documents\Favourites\IBM Development\IBM software development\Node js, Express"
npm install
```

---

## Scoring Summary (30 Points Total)

- **General Users**: Tasks 1-5 = 10 points
- **Authentication**: Tasks 6-7 = 6 points
- **Registered Users**: Tasks 8-9 = 4 points
- **Async/Promises**: Tasks 10-13 = 8 points
- **GitHub**: Task 14 = 2 points

**Total: 30 Points**

---

## Next Steps

1. ✅ Set up project structure
2. ✅ Install dependencies
3. ✅ Start server and test all endpoints
4. ✅ Capture screenshots for each task
5. ✅ Initialize GitHub repository
6. ✅ Submit project link

Good luck with your peer review!
