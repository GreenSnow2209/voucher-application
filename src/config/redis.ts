import { QueueOptions } from 'bull';

export const redisConfig: QueueOptions = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};
