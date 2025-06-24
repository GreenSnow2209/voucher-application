import { Agenda } from 'agenda';
import { appConfig } from './app.config';

export const agenda = new Agenda({
  db: {
    address: appConfig.mongoURI,
    collection: appConfig.databaseName,
  },
});
