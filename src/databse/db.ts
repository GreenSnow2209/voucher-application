import mongoose from 'mongoose';
import { appConfig } from '../config/app.config';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = appConfig.mongoURI;
    const databaseName = appConfig.databaseName;
    
    // Construct connection URL safely
    const connectionUrl = mongoUri.endsWith('/') 
      ? `${mongoUri}${databaseName}`
      : `${mongoUri}/${databaseName}`;

    const connectionOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false,
    };

    await mongoose.connect(connectionUrl, connectionOptions);
    
    // Set up connection event handlers
    mongoose.connection.on('error', (error) => {
      logger(`MongoDB connection error: ${error}`, 'error');
    });

    mongoose.connection.on('disconnected', () => {
      logger('MongoDB disconnected', 'warn');
    });

    mongoose.connection.on('reconnected', () => {
      logger('MongoDB reconnected', 'info');
    });

    logger(`Connected to MongoDB successfully! ${connectionUrl}`, 'info');
  } catch (error) {
    logger(`Failed to connect to MongoDB: ${error}`, 'error');
    throw error; 
  }
};
