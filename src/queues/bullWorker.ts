import { Worker } from 'bullmq';
import { getRedisClient } from '../utils/redis';
import sendEmailJob from '../jobs/bull/email.job';

export async function registerQueueProcessors(): Promise<void> {
  new Worker('email', sendEmailJob, {
    connection: getRedisClient(),
    prefix: 'voucher_app:email',
  });

  console.log('✅ BullMQ Worker registered for queue "email"');
}
