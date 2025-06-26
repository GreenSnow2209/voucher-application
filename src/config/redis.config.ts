import dotenv from 'dotenv';

dotenv.config();

export const redisConfig = {
  redisHost: process.env.REDIS_HOST || '127.0.0.1',
  redisPort: Number(process.env.REDIS_POST) || 6379,
  redisPass: process.env.REDIS_PASS || '',
};
