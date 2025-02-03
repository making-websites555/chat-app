const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');  // Import path module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like index.html) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve the index.html file
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Receive a message from a client and broadcast it to everyone
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

