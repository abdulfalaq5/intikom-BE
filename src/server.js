require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swaggerConfig');

const app = express();

// Implementasi CORS untuk semua origin
app.use(cors());

// Middleware
app.use(express.json());

// Dokumentasi Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rute Produk
app.use('/products', productRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

const PORT = process.env.PORT || 9494;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
