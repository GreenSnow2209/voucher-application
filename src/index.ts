import { appConfig } from './config/app.config';
import app from './app';

const port = appConfig.port;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
