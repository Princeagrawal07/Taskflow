import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health Check / Default Route
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'MERN To-Do List Backend API is running successfully',
    timestamp: new Date()
  });
});

// Database connection & Server initialization
const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start Server
    const server = app.listen(PORT, () => {
      console.log(`📡 Server listening on port ${PORT}...`);
    });

    // Handle process termination gracefully to stop memory server if active
    const handleShutdown = async () => {
      console.log('\n🛑 Shutdown signal received. Closing server and database connections...');
      server.close(async () => {
        await closeDB();
        console.log('✅ Server and database clean shutdown completed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);

  } catch (error) {
    console.error(`❌ Server startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
