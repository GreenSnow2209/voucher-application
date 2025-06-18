
import { connectDatabase } from './databse/db';
import { appConfig } from './config/app.config';
import {appCreate} from "./app";

const port = appConfig.port;

connectDatabase().then(() => {
  const app = appCreate();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
