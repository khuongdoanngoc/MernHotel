const express = require("express");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const connect = require('./model/db/connect.db')
connect();


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})