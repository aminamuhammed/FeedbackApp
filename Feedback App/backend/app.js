const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/connection'); // Ensure DB connection is successful

const courseRoutes = require('./routes/courseRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body


// Routes
app.use('/course', courseRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
