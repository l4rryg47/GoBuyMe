// server.js (Node.js backend)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});

// Track active support agents and users
const activeAgents = new Set();
const userSessions = new Map();

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Handle user connections
  socket.on('registerUser', (userId) => {
    socket.userId = userId;
    userSessions.set(userId, socket.id);
    console.log(`User ${userId} connected`);
  });

  // Handle support agent connections
  socket.on('registerAgent', (agentId) => {
    socket.agentId = agentId;
    activeAgents.add(agentId);
    console.log(`Support agent ${agentId} connected`);
  });

  // Handle incoming messages
  socket.on('userMessage', (message) => {
    console.log('Message from user:', message);
    
    // In a real app, store to database here
    // Then forward to available agent or queue
    
    // For demo, auto-respond
    const reply = {
      id: Date.now().toString(),
      text: 'Thanks for your message. An agent will respond shortly.',
      sender: 'support',
      time: new Date().toISOString()
    };
    
    socket.emit('supportMessage', reply);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    if (socket.agentId) {
      activeAgents.delete(socket.agentId);
      console.log(`Agent ${socket.agentId} disconnected`);
    }
    if (socket.userId) {
      userSessions.delete(socket.userId);
      console.log(`User ${socket.userId} disconnected`);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Support is live on ${PORT}`);
});