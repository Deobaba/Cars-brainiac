import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import { ENVIRONMENT } from '../config/env';

const options: Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Car Brainiac API',
        version: '1.0.0',
        description: 'API documentation for Car Brainiact project',
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
      security: [{ bearerAuth: [] }],
      servers: [
        {
          url: ENVIRONMENT.SWAGGERLINK,
        },
      ],
    },
    apis: ['./src/route/*.ts'],
  };
  

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
