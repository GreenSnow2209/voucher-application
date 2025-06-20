import { emailQueue } from '../queues/bullQueue';
import sendEmailJob from '../jobs/bull/email.job';

emailQueue.process('sendEmail', sendEmailJob);

emailQueue.on('failed', (job, err) => {
  console.error(`Email Job ${job.id} failed:`, err);
});

emailQueue.on('completed', (job) => {
  console.log(`Email Job ${job.id} completed`);
});
