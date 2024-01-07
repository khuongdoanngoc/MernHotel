require('dotenv').config()

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoute')
const categoryRoutes = require('./routes/categoryRoute')

const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const connect = require('./configs/db')
connect();

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})