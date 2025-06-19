import mongoose from 'mongoose';
import { appConfig } from '../config/app.config';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = appConfig.mongoURI || '';
    const databaseName = appConfig.databaseName || 'voucher_app';
    await mongoose.connect(mongoUri + '/' + databaseName);
    console.log('Connected to mongodb successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
