import { Queue, QueueOptions } from 'bullmq';
import { getRedisClient } from '../utils/redis';

const queueOptions: QueueOptions = {
  connection: getRedisClient(),
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 50,
  },
}

export const emailQueue = new Queue('email', {
  ...queueOptions,
  prefix: 'voucher_app:email'
});
