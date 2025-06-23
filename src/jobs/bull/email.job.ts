import { Job } from 'bull';
import nodemailer from 'nodemailer';
import { logger } from '../../utils/logger';
import { mailConfig } from '../../config/mail.config';

const transporter = nodemailer.createTransport({
  host: mailConfig.smtpHost,
  port: mailConfig.smtpPort,
  secure: false,
  auth: {
    user: mailConfig.smtpUser,
    pass: mailConfig.smtpPass,
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
