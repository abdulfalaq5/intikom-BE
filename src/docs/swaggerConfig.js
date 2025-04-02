const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API CRUD untuk produk',
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsDoc(options);
