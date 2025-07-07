const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'HogoHats API',
        version: '1.0.0',
        description: 'API documentation for HogoHats e-commerce platform',
        },
        servers: [
        {
            url: 'http://localhost:5050/api', // Update with your server URL
        },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
}

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;