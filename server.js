import app from './src/app.js';

const connectDB = require('./src/config/db');
require('./src/config/env');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});