import { emailQueue } from './bullQueue';
import sendEmailJob from '../jobs/bull/email.job';

export function registerQueueProcessors(): void {
  emailQueue.process('sendEmail', sendEmailJob);
}
