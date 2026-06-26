import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri || mongoUri.trim() === '') {
      console.log('⚠️ No MONGO_URI detected in .env. Initializing in-memory MongoDB fallback...');
      mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      console.log(`🚀 In-memory MongoDB running at: ${mongoUri}`);
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
      console.log('👋 In-memory MongoDB stopped.');
    }
  } catch (error) {
    console.error(`❌ Error closing MongoDB connection: ${error.message}`);
  }
};
