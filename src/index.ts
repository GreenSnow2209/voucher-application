import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "";
    await mongoose.connect(mongoUri);
    console.log("Connected to mongodb successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start().then(() => {
  app.use(express.json());
  app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', routes);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
});