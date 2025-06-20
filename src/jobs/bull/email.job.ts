import { Job } from 'bull';
import nodemailer from 'nodemailer';
import { logger } from '../../utils/logger';
import { appConfig } from '../../config/app.config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: appConfig.smtpUser,
    pass: appConfig.smtpPass,
  },
});

export default async function (job: Job): Promise<void> {
  const { to, subject, text } = job.data;

  try {
    await transporter.sendMail({
      from: 'Voucher App',
      to,
      subject,
      text,
    });
    logger(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    logger(`Failed to send email: ${error}`, 'error');
    throw error;
  }
}
