import Redis from 'ioredis';
import { redisConfig } from '../config/redis.config';

let client: Redis | undefined;

export const getRedisClient = (): Redis => {
  if (!client) {
    client = new Redis({
      host: redisConfig.redisHost,
      port: Number(redisConfig.redisPort),
      password: redisConfig.redisPass,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    client.on('error', (err: Error) => {
      console.error('❌ Redis error:', err);
    });

    client.on('connect', () => {
      console.log('✅ Redis connected');
    });
  }

  return client;
};
