import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

const start = async () => {
  try {
    await mongoose.connect("mongodb+srv://ttson35997:n0aBka294WXh7Cw0@voucher-application.0r89wm0.mongodb.net/voucher-app");
    console.log("Connected to mongodb successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start().then(() => {
  app.use(express.json());
  app.use('/api', routes);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
});