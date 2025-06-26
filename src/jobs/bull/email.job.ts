import { Job } from 'bull';
import nodemailer from 'nodemailer';
import { logger } from '../../utils/logger';
import { mailConfig } from '../../config/mail.config';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

const transporter = nodemailer.createTransport({
  host: mailConfig.smtpHost,
  port: mailConfig.smtpPort,
  secure: false,
  auth: {
    user: mailConfig.smtpUser,
    pass: mailConfig.smtpPass,
  },
});

const viewPath = path.resolve(__dirname, '../../views/templates');
transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: viewPath,
    defaultLayout: false,
  },
  viewPath,
  extName: '.hbs',
}));

export default async function (job: Job): Promise<void> {
  const { to, subject, text, template, context } = job.data;

  try {
    await transporter.sendMail({
      from: 'Voucher App <no-reply@voucherapp.com>',
      to,
      subject,
      ...(template ? { template, context } : { text }),
    });
    logger(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    logger(`Failed to send email: ${error}`, 'error');
    throw error;
  }
}
