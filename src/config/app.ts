import express from "express";
import cors from "cors";
import routes from "../routes";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "../docs/swagger";

export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/api', routes);
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    return app;
}