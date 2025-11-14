// Minimal test server to verify Node can bind to localhost
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'HTTP Server Working!', 
    time: new Date().toISOString(),
    pid: process.pid
  }));
});

const PORT = 5000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`✓ Test server is running on http://${HOST}:${PORT}`);
  console.log(`✓ Open this in Chrome: http://localhost:5000`);
  console.log(`✓ PID: ${process.pid}`);
});

server.on('error', (err) => {
  console.error('✗ Server error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error('  Port 5000 is already in use. Kill other processes: Get-Process node | Stop-Process -Force');
  }
});
