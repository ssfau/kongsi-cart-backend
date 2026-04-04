import { AppError } from './utils.js';
import mongoose from 'mongoose';

// authentication
const demoAuth = (req, res, next) => {
  const role = req.headers['x-demo-role'];
  const userId = req.headers['x-demo-userid'];

  if (!role || !userId) {
    return next(new AppError('Missing demo auth headers', 401));
  }

  if (!['customer', 'handler'].includes(role)) {
    return next(new AppError('Invalid role', 401));
  }

  req.user = { id: userId, role };
  next();
};

// role guard
const roleGuard = (...allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user?.role)) {
    return next(new AppError('You do not have permission to do this', 403));
  }
  next();
};

// objectid validator mongodb

const validateObjectId = (req, res, next) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError('Invalid ID format', 400));
  }
  next();
};

// error handler
const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
  });
};

export { demoAuth, roleGuard, validateObjectId, errorHandler };