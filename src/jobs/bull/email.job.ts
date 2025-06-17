import { Job } from 'bull';

export default async function (job: Job) {
  const { to, subject, text } = job.data;
}
