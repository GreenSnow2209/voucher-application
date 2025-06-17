import dotenv from 'dotenv';
import { connectDatabase } from './databse/db';
import { appConfig } from './config/config';

dotenv.config();
const port = process.env.PORT || 3000;

connectDatabase().then(() => {
  const app = appConfig();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
