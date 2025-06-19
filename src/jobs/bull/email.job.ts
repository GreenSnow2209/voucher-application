import { Job } from 'bull';

export default async function (job: Job): Promise<void> {
  const { to, subject, text } = job.data;
}
