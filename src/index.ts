import app from './app';
import { appConfig } from './config/app.config';
import { connectDatabase } from './databse/db';
import { checkDatabaseHealth } from './jobs/agenda/check-db.job';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    await checkDatabaseHealth();
    
    const port = appConfig.port;
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
      logger(`🚀 Server is running at http://localhost:${port}`, 'info');
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger(`Received ${signal}. Starting graceful shutdown...`, 'info');
      server.close(() => {
        logger('Server closed', 'info');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger(`❌ Failed to start application: ${error}`, 'error');
    process.exit(1);
  }
};

startServer();
