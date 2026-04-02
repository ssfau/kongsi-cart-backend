import app from '../src/app.js';
import connectDB from '../src/config/db.js';
import dns from 'dns';
import dotenv from 'dotenv';

// Safe locally; Vercel will ignore missing .env file.
dotenv.config();

// Fix for ISP DNS blocking MongoDB SRV lookups (kept from server.js)
dns.setServers(['8.8.8.8', '8.8.4.4']);

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

