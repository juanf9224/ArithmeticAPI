import { NodeEnv, config } from './config';
import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';
const definition: SwaggerDefinition  = {
    schemes: ['http', 'https'],
    info: {
        title: 'Loan Pro Rest API Docs',
        version: '1.0.0',        
    },
    explorer: true,
    failOnErrors: true,
};

const prodPaths = [
    'build/controllers/auth.controller.js',
    'build/controllers/operation.controller.js',
    'build/controllers/record.controller.js',
    'build/controllers/user.controller.js'
]

const devPaths = [
    './src/controllers/auth.controller.ts',
    './src/controllers/operation.controller.ts',
    './src/controllers/record.controller.ts',
    './src/controllers/user.controller.ts',
]

const options: Options = {
    openapi: '3.0.0',
    definition,
    // Paths to files containing OpenAPI definitions
    apis: config.env === NodeEnv.PRODUCTION ? prodPaths : devPaths,
};

export default swaggerJSDoc(options);