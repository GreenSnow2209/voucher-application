import { agendaConfig } from '../../config/agenda.config';
import { logger } from '../../utils/logger';
import { AGENDA_JOBS } from '../../utils/const';
import mongoose from 'mongoose';
import { sendMail } from '../../utils/sendmail';
import { Agenda } from 'agenda';

const agenda = new Agenda({
  db: {
    address: agendaConfig.address,
    collection: agendaConfig.collection,
  }
})

export const databaseConnectJob = async (): Promise<void> => {
  agenda.define(AGENDA_JOBS.CHECK_MONGO_CONNECTION, {}, async () => {
    const state = mongoose.connection.readyState;
    if (state === 0) {
      logger('[Agenda] MongoDB state: DISCONNECTED 🚨');
      await sendMail({
        to: AGENDA_JOBS.MAIL_SEND_TO_FAILED,
        subject: '[Agenda Alert] MongoDB Disconnected',
        text: `⚠️ The MongoDB connection is currently down (state: ${state}). Please check the server.`,
      });
    }
  });

  await agenda.start();
  await agenda.every(AGENDA_JOBS.CHECK_MONGO_CONNECTION_TIME, AGENDA_JOBS.CHECK_MONGO_CONNECTION);

  logger('[Agenda] Scheduled job: check db connection every minute');
};
