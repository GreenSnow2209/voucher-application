import { registerQueueProcessors } from './queues/bullWorker';

const startWorker = async (): Promise<void> => {
  const results = await Promise.allSettled([
    registerQueueProcessors(),
  ]);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`❌ Task ${index} failed:`, result.reason);
    }
  });

  console.log('✅ Worker started');
};

startWorker();
