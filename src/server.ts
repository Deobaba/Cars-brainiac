// import { ENVIRONMENT } from './config/env';
import app from './app';
import { createServer } from 'http';
import logger from './config/logger';
import { connectDB, disconnectDB } from './config/database';

const server = createServer(app);

// Function to handle graceful shutdown
const shutdownHandler = async (signal:string) => {
  logger.info(`Received ${signal}, shutting down gracefully...`);

  // Close server and remaining connections
  server.close(async () => {
    logger.info('HTTP server closed.');

    // Ensure MongoDB connection is properly closed
    await disconnectDB();
    logger.info('Database connection closed.');
    process.exit(0); // Graceful exit
  });

  // Force shutdown after 10 seconds if not completed
  setTimeout(() => {
    logger.error('Forcefully shutting down due to timeout.');
    process.exit(1); // Forced exit
  }, 10000);
};

// Function to start the server
const startServer = () => {
  server.listen(process.env.PORT, () => {
    logger.info(`🚀 Server running on port ${process.env.PORT}`);
  });
};

// Function to connect to the database and start the server
const connectDatabaseAndStartServer = async () => {
  try {
    await connectDB(); // Attempt to connect to the database
    logger.info('✅ Connected to the database');
    startServer(); // Start server if the database connection is successful
  } catch (error) {
    logger.error('❌ Failed to connect to the database', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Listen for termination signals
process.on('SIGINT', shutdownHandler);
process.on('SIGTERM', shutdownHandler);

// Try connecting to the database and start the server
connectDatabaseAndStartServer();
