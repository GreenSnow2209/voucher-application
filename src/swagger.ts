import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voucher API',
      version: '1.0.0',
      description: 'API documentation for the Voucher application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.ts'],
};

export function Swagger(app: Express): void {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));
}
