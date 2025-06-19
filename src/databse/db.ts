import mongoose from 'mongoose';
import { appConfig } from '../config/app.config';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = appConfig.mongoURI || '';
    const databaseName = appConfig.databaseName || 'voucher_app';
    await mongoose.connect(mongoUri + '/' + databaseName);
    logger('Connected to mongodb successfully! ' + mongoUri + '/' + databaseName, 'info');
  } catch (error) {
    logger(error, 'error');
    process.exit(1);
  }
};
