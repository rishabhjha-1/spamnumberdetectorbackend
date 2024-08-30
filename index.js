// server.js

const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const spamRoutes = require('./routes/spamRoutes');
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', spamRoutes);
app.use('/', searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
