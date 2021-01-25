const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

/**
 * Connect database
 */
connectDB();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));

module.exports = app;