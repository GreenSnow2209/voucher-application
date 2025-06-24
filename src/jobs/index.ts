import { agenda } from '../config/agenda.config';
import { checkDBJob } from './check-db.job';
import { logger } from '../utils/logger';

export const databaseConnectJob = async (): Promise<void> => {
  agenda.define('check db connection', checkDBJob);

  await agenda.start();
  await agenda.every('1 minute', 'check db connection');

  logger('[Agenda] Scheduled job: check db connection every minute');
};
