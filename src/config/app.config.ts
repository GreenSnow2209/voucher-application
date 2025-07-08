import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET!,
  mongoURI: process.env.MONGO_URI!,
  databaseName: process.env.DATABASE_NAME || 'voucher_app',
};
