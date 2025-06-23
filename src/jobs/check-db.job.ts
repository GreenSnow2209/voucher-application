import mongoose from 'mongoose';
import { Job } from 'agenda';
import { logger } from '../utils/logger';

export const checkDBJob = async (job: Job): Promise<void> => {
  try {
    const state = mongoose.connection.readyState;

    switch (state) {
      case 0:
        logger('[Agenda] MongoDB state: DISCONNECTED');
        break;
      case 1:
        logger('[Agenda] MongoDB state: CONNECTED ✅');
        break;
      case 2:
        logger('[Agenda] MongoDB state: CONNECTING...');
        break;
      case 3:
        logger('[Agenda] MongoDB state: DISCONNECTING...');
        break;
      default:
        logger('[Agenda] MongoDB state: UNKNOWN');
    }
  } catch (err) {
    logger(err, );
  }
};
