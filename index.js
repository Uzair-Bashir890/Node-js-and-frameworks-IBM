// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Session middleware for /customer routes
app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

// Authentication middleware for protected customer endpoints
app.use("/customer/auth/*", function auth(req, res, next) {
  try {
    // Check session for authorization object
    if (
      !req.session ||
      !req.session.authorization ||
      !req.session.authorization.accessToken
    ) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const token = req.session.authorization.accessToken;
    const JWT_SECRET = "access"; // must match the secret used in auth_users.js

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      // Attach user info to request for downstream use
      req.user = { username: payload.username };
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Health check endpoint (before routers so it's always reachable)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', pid: process.pid, uptime: process.uptime() });
});

// Mount routers
app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;
// Bind explicitly to localhost so the server is reachable via http://localhost:5000
const HOST = '127.0.0.1';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT} (pid=${process.pid})`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
});
