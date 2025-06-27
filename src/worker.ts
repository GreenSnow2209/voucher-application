import { registerQueueProcessors } from './queues/bullWorker';
import { databaseConnectJob } from './jobs/agenda/check-db.job';

const startWorker = async (): Promise<void> => {
  try {
    await registerQueueProcessors();
    await databaseConnectJob();
    console.log('✅ Worker is running...');
  } catch (error) {
    console.error('❌ Worker failed to start:', error);
    process.exit(1);
  }
};

startWorker();
