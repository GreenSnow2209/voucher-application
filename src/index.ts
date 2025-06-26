import app from './app';
import { appConfig } from './config/app.config';
import { connectDatabase } from './databse/db';
import { databaseConnectJob } from './jobs/agenda/check-db.job';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    await databaseConnectJob();

    const port = appConfig.port;
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
};

startServer();
