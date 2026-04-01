import express from 'express';
import cors from 'cors';
import { errorHandler } from './auth.middleware.js';
import authRoutes from './routes/auth.routes.js';
import buyerRoutes from './routes/buyer.routes.js';
import sharedRoutes from './routes/shared.routes.js';
import handlerRoutes from './routes/handler.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', buyerRoutes);
app.use('/api/v1', handlerRoutes);
app.use('/api/v1', sharedRoutes);

app.use(errorHandler);

export default app;