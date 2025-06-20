import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost',
  databaseName: process.env.DATABASE_NAME || 'local,',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
};
