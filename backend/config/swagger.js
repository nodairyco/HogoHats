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
        url: 'http://localhost:5050/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Image: {
          type: 'object',
          properties: {
            url: { type: 'string', example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' },
            public_id: { type: 'string', example: 'sample_id' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Stylish Fedora' },
            description: { type: 'string', example: 'A premium fedora hat.' },
            price: { type: 'number', example: 49.99 },
            category: { type: 'string', enum: ['men', 'women', 'kids', 'premium'] },
            images: {
              type: 'array',
              items: { $ref: '#/components/schemas/Image' },
            },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
