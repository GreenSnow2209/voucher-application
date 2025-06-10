import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './docs/swagger';
import dotenv from 'dotenv';
import {connectDatabase} from "./databse/db";
import {createApp} from "./config/app";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDatabase().then(() => {
    const app = createApp();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
});