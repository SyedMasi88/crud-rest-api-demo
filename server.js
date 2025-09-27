const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/players');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/packers';

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// routes
app.use('/api/players', playerRoutes);

// root test
app.get('/', (req, res) => {
  res.send('Node API is running');
});

// connect to Mongo and start server
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
