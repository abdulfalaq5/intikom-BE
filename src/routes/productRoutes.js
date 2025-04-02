const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body, param } = require('express-validator');

// Validation rules
const productValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama produk harus diisi')
    .isLength({ min: 3, max: 100 }).withMessage('Nama produk harus antara 3-100 karakter')
    .matches(/^[a-zA-Z0-9\s\-_]+$/).withMessage('Nama produk hanya boleh berisi huruf, angka, spasi, tanda hubung, dan garis bawah'),
  
  body('price')
    .notEmpty().withMessage('Harga produk harus diisi')
    .isFloat({ min: 0 }).withMessage('Harga produk harus berupa angka positif')
    .toFloat(),
];

const idValidationRule = [
  param('id')
    .notEmpty().withMessage('ID produk harus diisi')
    .isInt().withMessage('ID produk harus berupa angka')
    .toInt(),
];

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Mendapatkan semua produk
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar produk
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Menambahkan produk baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 */
router.post('/', 
  productValidationRules,
  productController.validateProduct,
  productController.addProduct
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mengupdate produk berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produk berhasil diperbarui
 */
router.put('/:id',
  idValidationRule,
  productValidationRules,
  productController.validateProduct,
  productController.updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Menghapus produk berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 */
router.delete('/:id',
  idValidationRule,
  productController.validateProduct,
  productController.deleteProduct
);

module.exports = router;
