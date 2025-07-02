import { emailQueue } from '../queues/bullQueue';

export const sendMail = async ({
  to,
  subject,
  text,
  template,
  context,
}: {
  to: string;
  subject: string;
  text?: string;
  template?: string;
  context?: Record<string, any>;
}): Promise<void> => {
  await emailQueue.add('sendEmail', {
    to,
    subject,
    text,
    template,
    context,
  });
};
