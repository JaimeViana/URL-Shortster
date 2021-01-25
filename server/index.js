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

/**
 * Define routes
 */
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: error.stack,
    });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));

module.exports = app;