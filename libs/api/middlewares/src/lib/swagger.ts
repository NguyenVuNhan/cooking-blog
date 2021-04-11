import { APIConfig } from '@cookingblog/api-interfaces';
import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

class Swagger {
  public static mount(express: Application, config: APIConfig): Application {
    const swaggerOptions: swaggerJSDoc.Options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Cooking Blog API',
          description: 'Cooking Blog API description',
          version: '0.1.0',
        },
        host: config.url,
        securityDefinitions: {
          BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
          },
        },
        scheme: ['http', 'https'],
      },
      apis: ['build/routes/api/*.js'],
    };
    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    express.use('/api-docs', serve, setup(swaggerDocs));

    return express;
  }
}

export default Swagger;
