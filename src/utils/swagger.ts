import swaggerJsDoc, { Options } from 'swagger-jsdoc';

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
          url: 'http://localhost:4000',
        },
      ],
    },
    apis: ['./src/route/*.ts'],
  };
  

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
