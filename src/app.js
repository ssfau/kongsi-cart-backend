const express = require('express');
const { errorHandler } = require('./auth.middleware');
const app = express();

app.use(express.json());

// routes
app.use('/api/v1',    require('./routes/auth.routes'));
app.use('/api/v1',   require('./routes/buyer.routes'));
app.use('/api/v1', require('./routes/handler.routes'));
app.use('/api/v1',  require('./routes/shared.routes'));

app.use(errorHandler);

module.exports = app;