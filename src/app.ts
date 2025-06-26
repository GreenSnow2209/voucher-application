import express from 'express';
import cors from 'cors';
import routes from './routes';
import { Swagger } from './swagger';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

Swagger(app);

export default app;
