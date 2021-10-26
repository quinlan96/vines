import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Vines API Documentation',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    apis: [
        path.join(__dirname, '../routes/**/*.ts'),
        path.join(__dirname, '../routes/**/*.js'),
    ],
};

// eslint-disable-next-line
export default swaggerJSDoc(options);
