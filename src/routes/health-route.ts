import express from 'express';

const HealthRouter = express.Router();

// Health check endpoint
HealthRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default HealthRouter; 