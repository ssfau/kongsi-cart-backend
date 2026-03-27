import 'dotenv/config'; // automatically loads .env
// or: import dotenv from 'dotenv'; dotenv.config();

const required = ['MONGO_URI', 'PORT'];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing env variable: ${key}`);
    process.exit(1);
  }
});