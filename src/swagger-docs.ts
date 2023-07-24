import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';

const definition: SwaggerDefinition  = {
    schemes: ['http', 'https'],
    info: {
        title: 'Loan Pro Rest API Docs',
        version: '1.0.0',        
    },
    explorer: true,
    failOnErrors: true,
  } 

const options: Options = {
    openapi: '3.0.0',
    definition,
    // Paths to files containing OpenAPI definitions
    apis: ['**/**/*.{ts|js}', '**/*.{js|ts}', './src/router/*.{js|ts}'],
};

export default swaggerJSDoc(options);