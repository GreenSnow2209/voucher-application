import dotenv from 'dotenv';

dotenv.config();

export const testConfig = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  databaseName: process.env.DATABASE_NAME || 'voucher_app_test',
};
