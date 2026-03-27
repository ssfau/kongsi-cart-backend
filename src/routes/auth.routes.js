import express from 'express';

const router = express.Router();
const { demoAuth, roleGuard } = require('../middleware/auth');
const { catchAsync } = require('../utils');
const ctrl = require('../controllers/auth.controller'); 