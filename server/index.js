const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected');

  // Simulate real-time data
  const interval = setInterval(() => {
    const metrics = ['visitors', 'revenue', 'conversions', 'bounceRate'];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    
    socket.emit('realtime_data', {
      type: 'metric_update',
      data: {
        metric: randomMetric,
        value: Math.random() * 1000,
        timestamp: new Date()
      },
      timestamp: new Date()
    });
  }, 3000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});