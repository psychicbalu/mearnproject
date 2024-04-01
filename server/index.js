// index.js
const express = require('express');
const mongoose = require('mongoose');
const customMiddleware = require('./middleware/customMiddleware');
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();
const Router = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DATABASE;

// Middleware
app.use(express.json());
app.use(customMiddleware); // Using custom middleware from the middleware folder

// Routes
// app.use('/api/questions', questionRoutes);
app.use(Router);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server after MongoDB connection is established
connectDB().then(() => {
  const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  // Graceful shutdown
  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
