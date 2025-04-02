const db = require('../config/db');
const { validationResult, body } = require('express-validator');

// Validation middleware
exports.validateProduct = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.getProducts = async (req, res) => {
  try {
    const products = await db('products').select('*');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data produk' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Nama dan harga produk harus diisi' });
    }

    // Validate price is a number and positive
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Harga produk harus berupa angka positif' });
    }

    // Validate name length and characters
    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: 'Nama produk harus antara 3-100 karakter' });
    }

    // Sanitize inputs
    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedPrice = parseFloat(price);

    await db('products').insert({ 
      name: sanitizedName, 
      price: sanitizedPrice 
    });
    
    res.status(201).json({ message: 'Produk berhasil ditambahkan' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan produk' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID produk tidak valid' });
    }

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: 'Nama dan harga produk harus diisi' });
    }

    // Validate price is a number and positive
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Harga produk harus berupa angka positif' });
    }

    // Validate name length and characters
    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ message: 'Nama produk harus antara 3-100 karakter' });
    }

    // Sanitize inputs
    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedPrice = parseFloat(price);

    const updated = await db('products')
      .where({ id: parseInt(id) })
      .update({ 
        name: sanitizedName, 
        price: sanitizedPrice 
      });

    if (updated === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json({ message: 'Produk berhasil diperbarui' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui produk' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'ID produk tidak valid' });
    }

    const deleted = await db('products')
      .where({ id: parseInt(id) })
      .del();

    if (deleted === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus produk' });
  }
};
