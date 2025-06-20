import express from 'express';
import cors from 'cors';
import routes from './routes';
import { Swagger } from './swagger';
import { connectDatabase } from './databse/db';
import { registerQueueProcessors } from './queues/bullWorker';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routes);

connectDatabase();
Swagger(app);
registerQueueProcessors();

export default app;
