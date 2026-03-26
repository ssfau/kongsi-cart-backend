const express = require('express');
const { errorHandler } = require('./middleware/auth');
const app = express();

app.use(express.json());

// routes
// bla bla bla

app.use(errorHandler);

module.exports = app;