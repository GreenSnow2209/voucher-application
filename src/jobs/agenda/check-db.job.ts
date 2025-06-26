import { agenda } from '../../config/agenda.config';
import { logger } from '../../utils/logger';
import { AGENDA_JOBS } from '../../utils/const';
import mongoose from 'mongoose';

export const databaseConnectJob = async (): Promise<void> => {
  agenda.define(AGENDA_JOBS.CHECK_MONGO_CONNECTION, { }, async () => {
    const state = mongoose.connection.readyState;
    if (state === 0) {
      logger('[Agenda] MongoDB state: DISCONNECTED 🚨');
      // send mail
    }
  });

  await agenda.start();
  await agenda.every(AGENDA_JOBS.CHECK_MONGO_CONNECTION_TIME, AGENDA_JOBS.CHECK_MONGO_CONNECTION);

  logger('[Agenda] Scheduled job: check db connection every minute');
};
