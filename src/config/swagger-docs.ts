import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';
const definition: SwaggerDefinition  = {
    schemes: ['http', 'https'],
    info: {
        title: 'Rest API for Swagger Documentation',
        version: '1.0.0',
        
      },
  } 

const options: Options = {
    openapi: '3.0.0',
    definition,
    // Paths to files containing OpenAPI definitions
    apis: ['../router', './dist/router'],
};

export default swaggerJSDoc(options);