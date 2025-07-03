import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  databaseName: process.env.DATABASE_NAME || 'voucher_app',
};
