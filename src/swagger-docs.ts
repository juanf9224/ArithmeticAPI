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
    apis: [`${__dirname}/src/router/*.{ts|js}`, `build/router/*.js`],
};

export default swaggerJSDoc(options);