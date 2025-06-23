import mongoose from 'mongoose';
import { appConfig } from '../config/app.config';
import { logger } from '../utils/logger';
import { setupJobs } from '../jobs';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = appConfig.mongoURI || '';
    const databaseName = appConfig.databaseName || 'voucher_app';
    await mongoose.connect(mongoUri + '/' + databaseName).then(async () => {
      await setupJobs();
    });
    logger('Connected to mongodb successfully! ' + mongoUri + '/' + databaseName, 'info');
  } catch (error) {
    logger(error, 'error');
    process.exit(1);
  }
};
