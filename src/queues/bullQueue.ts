import Queue from 'bull';
import { redisConfig } from '../config/redis';
import { join } from 'path';

export const emailQueue = new Queue('email-queue', {
  redis: redisConfig
});

emailQueue.process('sendEmail', join(__dirname, '../jobs/bull/email.job.ts'));
