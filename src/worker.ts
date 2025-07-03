import { registerQueueProcessors } from './queues/bullWorker';
import { databaseConnectJob } from './jobs/agenda/check-db.job';

const startWorker = async (): Promise<void> => {
  const results = await Promise.allSettled([
    registerQueueProcessors(),
    databaseConnectJob(),
  ]);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`❌ Task ${index} failed:`, result.reason);
    }
  });

  console.log('✅ Worker started');
};

startWorker();
