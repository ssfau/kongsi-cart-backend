import express from 'express';
import cors from 'cors';
import { errorHandler } from './auth.middleware.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

export default app;