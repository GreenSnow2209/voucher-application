import Queue, { QueueOptions } from 'bull';
import { redisConfig } from '../config/redis.config';

export const emailQueue = new Queue('email', ({
  redis: {
    host: redisConfig.redisHost,
    port: redisConfig.redisPort,
  }
} as QueueOptions));
