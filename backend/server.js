// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Routes
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,              
}));
app.use(cookieParser());
app.use(express.json());


// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));