// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerDocs = require('./config/swagger');

const app = express();

swaggerDocs(app);
// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,              
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));